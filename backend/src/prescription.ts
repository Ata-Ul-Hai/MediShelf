import { json, readBody, imageFromDataUrl, bedrockVisionPrompt, extractJson } from "./common";
import type { PrescribedItem } from "../../shared/src/types";

interface RxBody {
  image?: string; // data URL of the prescription
}

const RX_PROMPT = `You are reading a doctor's prescription from India (may be handwritten). List every MEDICINE prescribed (ignore advice text, dosing schedules like "1-0-1", tests, and diagnoses).
For each medicine reply: the text as written, the generic salt if you can infer it (e.g. "Crocin" -> "paracetamol", "Augmentin" -> "amoxicillin"), and strength in mg if visible.
Reply ONLY with JSON: {"medicines": [{"rawText": string, "salt": string|null, "strengthMg": number|null}]}
If you cannot read a name confidently, still include it with salt:null.`;

export const handler = async (event: {
  body?: string | null;
  isBase64Encoded?: boolean;
}): Promise<{ statusCode: number; headers: Record<string, string>; body: string }> => {
  try {
    const body = JSON.parse(readBody(event).toString("utf8")) as RxBody;
    if (!body.image) return json(400, { ok: false, error: "image (data URL) required" });

    const img = imageFromDataUrl(body.image);
    const text = await bedrockVisionPrompt(img, RX_PROMPT, 1500);
    const parsed = extractJson<{ medicines: Array<{ rawText: string; salt: string | null; strengthMg: number | null }> }>(text);

    const medicines: PrescribedItem[] = (parsed?.medicines ?? []).map((m) => ({
      rawText: m.rawText ?? "",
      salt: m.salt ?? null,
      strengthMg: m.strengthMg ?? undefined,
    }));

    return json(200, { ok: true, medicines, modelText: text.slice(0, 500) });
  } catch (e) {
    console.error(e);
    return json(500, { ok: false, error: (e as Error).message });
  }
};
