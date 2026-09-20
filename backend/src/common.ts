import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { TextractClient, DetectDocumentTextCommand } from "@aws-sdk/client-textract";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
import { DRUG_INDEX, PAO_RULES, fuzzyRank, drugById, cabinetReport } from "../../shared/src/index";
import type { ScanCandidate } from "../../shared/src/types";

export const bedrock = new BedrockRuntimeClient({});
export const textract = new TextractClient({});
export const s3 = new S3Client({});
export const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const MODEL_ID = process.env.BEDROCK_MODEL_ID ?? "amazon.nova-lite-v1:0";

export function json(status: number, body: unknown) {
  return { statusCode: status, headers: { "content-type": "application/json" }, body: JSON.stringify(body) };
}

export function readBody(event: { body?: string | null; isBase64Encoded?: boolean }): Buffer {
  if (!event.body) throw new Error("empty body");
  return event.isBase64Encoded ? Buffer.from(event.body, "base64") : Buffer.from(event.body);
}

export function parseJsonBody<T>(event: { body?: string | null }): T {
  if (!event.body) throw new Error("empty body");
  return JSON.parse(event.body) as T;
}

export function imageFromDataUrl(dataUrl: string): { bytes: Buffer; format: "png" | "jpeg" } {
  const m = /^data:image\/(png|jpe?g);base64,(.+)$/.exec(dataUrl.trim());
  if (!m) throw new Error("expected a base64 png/jpeg data URL");
  return { bytes: Buffer.from(m[2], "base64"), format: m[1] === "png" ? "png" : "jpeg" };
}

export async function textractLines(bytes: Buffer): Promise<string[]> {
  const res = await textract.send(
    new DetectDocumentTextCommand({ Document: { Bytes: bytes } })
  );
  return (res.Blocks ?? [])
    .filter((b) => b.BlockType === "LINE")
    .map((b) => b.Text ?? "")
    .filter(Boolean);
}

/** Converse with a Bedrock multimodal model; returns text. Throws on access/throttle errors. */
export async function bedrockVisionPrompt(
  image: { bytes: Buffer; format: "png" | "jpeg" },
  prompt: string,
  maxTokens = 1200
): Promise<string> {
  const res = await bedrock.send(
    new ConverseCommand({
      modelId: MODEL_ID,
      messages: [
        {
          role: "user",
          content: [
            { image: { format: image.format, source: { bytes: image.bytes } } },
            { text: prompt },
          ],
        },
      ],
      inferenceConfig: { temperature: 0, maxTokens },
    })
  );
  return (res.output?.message?.content ?? [])
    .map((c) => ("text" in c ? c.text : ""))
    .join("\n")
    .trim();
}

/** Models sometimes wrap JSON in fences — extract the first JSON object/array. */
export function extractJson<T>(text: string): T | null {
  const cleaned = text.replace(/```json|```/g, "");
  for (const re of [/\{[\s\S]*\}/, /\[[\s\S]*\]/]) {
    const m = cleaned.match(re);
    if (m) {
      try {
        return JSON.parse(m[0]) as T;
      } catch {
        /* keep trying */
      }
    }
  }
  return null;
}

/** Rank index candidates from whatever text OCR/vision recovered. */
export function candidatesFromText(fragments: string[]): ScanCandidate[] {
  const targets = DRUG_INDEX.map((d) => ({
    id: d.id,
    brand: d.brand,
    salts: d.salts.map((s) => s.name).join(" "),
  }));
  const byId = new Map<string, ScanCandidate>();
  for (const frag of fragments) {
    for (const hit of fuzzyRank(frag, targets, 3)) {
      const drug = drugById(hit.id);
      if (!drug) continue;
      const existing = byId.get(hit.id);
      if (existing) {
        existing.confidence = Math.max(existing.confidence, hit.score);
        existing.evidence.push(frag);
      } else {
        byId.set(hit.id, {
          ...drug,
          confidence: hit.score,
          evidence: [frag],
        });
      }
    }
  }
  return [...byId.values()].sort((a, b) => b.confidence - a.confidence).slice(0, 3);
}

export { DRUG_INDEX, PAO_RULES, cabinetReport };
