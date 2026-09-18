import {
  json,
  readBody,
  imageFromDataUrl,
  textractLines,
  bedrockVisionPrompt,
  extractJson,
  candidatesFromText,
  s3,
} from "./common";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { ScanResult } from "../../shared/src/types";

interface ScanBody {
  image?: string; // data URL
  text?: string; // fallback: user-typed OCR text (offline-degraded mode)
}

const VISION_PROMPT = `You are looking at a photograph of a medicine pack (strip, bottle or tube) sold in India, possibly torn or partially visible.
Read EVERYTHING visible: brand name (may be cut off), composition line (e.g. "Paracetamol IP 650 mg" or "Azithromycin Dihydrate Eq. to Anhydrous 200 mg"), company name, pack form (tablet/syrup/drops/cream/inhaler), batch/expiry text.
Reply ONLY with JSON:
{"brand": string|null, "company": string|null, "form": "tablet"|"capsule"|"syrup"|"suspension"|"drops"|"cream"|"ointment"|"gel"|"injection"|"inhaler"|"sachet"|"lozenge"|null,
 "salts": [{"name": string, "strengthMg": number|null}], "printedExpiry": "YYYY-MM or YYYY-MM-DD"|null,
 "visibleFragments": [string]}
Rules: salt names lowercase and generic (e.g. "paracetamol", not "Dolo"). Include EVERY salt on the composition line. strengthMg numeric or null. If nothing readable, return brand:null and empty fragments.`;

export const handler = async (event: {
  body?: string | null;
  isBase64Encoded?: boolean;
}): Promise<{ statusCode: number; headers: Record<string, string>; body: string }> => {
  try {
    let body: ScanBody;
    try {
      const raw = readBody(event).toString("utf8");
      body = JSON.parse(raw) as ScanBody;
    } catch {
      return json(400, { ok: false, error: "invalid JSON body" });
    }

    // Offline-degraded mode: client already has OCR/user text, only needs fuzzy ranking
    if (!body.image && body.text) {
      const frags = body.text.split(/\n|,/).map((s) => s.trim()).filter(Boolean);
      return json(200, {
        ok: true,
        engine: "local-fuzzy",
        candidates: candidatesFromText(frags),
      } satisfies ScanResult);
    }

    if (!body.image) return json(400, { ok: false, error: "image (data URL) or text required" });

    const img = imageFromDataUrl(body.image);

    // 1) Textract — cheap deterministic OCR pass
    let lines: string[] = [];
    try {
      lines = await textractLines(img.bytes);
    } catch (e) {
      console.error("textract failed", e);
    }

    // audit copy in S3 (best-effort)
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `scans/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`,
          Body: img.bytes,
          ContentType: `image/${img.format}`,
        })
      );
    } catch (e) {
      console.error("s3 put failed", e);
    }

    // 2) Bedrock vision — reads partial/torn text Textract can't structure
    let vision: {
      brand: string | null;
      company?: string | null;
      form?: string | null;
      salts?: Array<{ name: string; strengthMg: number | null }>;
      printedExpiry?: string | null;
      visibleFragments?: string[];
    } | null = null;
    let engine: ScanResult["engine"] = lines.length ? "textract" : "local-fuzzy";
    try {
      const text = await bedrockVisionPrompt(img, VISION_PROMPT);
      vision = extractJson<NonNullable<typeof vision>>(text);
      if (vision) engine = "bedrock-vision";
    } catch (e) {
      console.error("bedrock failed, falling back to textract+fuzzy", e);
    }

    // 3) Compose candidate fragments from every signal
    const frags = new Set<string>(lines.slice(0, 30));
    if (vision?.brand) frags.add(vision.brand);
    for (const s of vision?.salts ?? []) {
      frags.add(s.strengthMg ? `${s.name} ${s.strengthMg}` : s.name);
    }
    if (vision?.brand && vision.salts?.length) {
      frags.add(`${vision.brand} ${vision.salts.map((s) => s.name).join(" ")}`);
    }

    const candidates = candidatesFromText([...frags]);

    return json(200, {
      ok: true,
      engine,
      rawText: lines.join("\n").slice(0, 2000) || undefined,
      vision,
      candidates,
    });
  } catch (e) {
    console.error(e);
    return json(500, { ok: false, error: (e as Error).message });
  }
};
