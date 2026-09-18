import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { json, readBody } from "./common";

const polly = new PollyClient({});

interface VoiceBody {
  text?: string;
  lang?: "hi" | "en";
}

// Aditi: Hindi+Indian-English voice; fallback to Joanna for en if needed.
const VOICES = { hi: "Aditi", en: "Aditi" } as const;

export const handler = async (event: {
  body?: string | null;
  isBase64Encoded?: boolean;
}): Promise<{ statusCode: number; headers: Record<string, string>; body: string }> => {
  try {
    const body = JSON.parse(readBody(event).toString("utf8")) as VoiceBody;
    if (!body.text) return json(400, { ok: false, error: "text required" });
    const lang = body.lang === "en" ? "en-IN" : "hi-IN";

    const res = await polly.send(
      new SynthesizeSpeechCommand({
        Text: body.text.slice(0, 600),
        TextType: "text",
        OutputFormat: "mp3",
        VoiceId: VOICES[body.lang ?? "hi"],
        LanguageCode: lang,
        Engine: "standard",
      })
    );

    const bytes = await res.AudioStream?.transformToByteArray();
    if (!bytes) return json(500, { ok: false, error: "polly returned no audio" });

    return json(200, { ok: true, audio: Buffer.from(bytes).toString("base64"), format: "mp3" });
  } catch (e) {
    console.error(e);
    return json(500, { ok: false, error: (e as Error).message });
  }
};
