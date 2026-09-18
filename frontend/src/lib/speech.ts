"use client";

// Mic input via Web Speech API (works on Chrome/Edge/Android; graceful fallback elsewhere)
// and local TTS fallback when Polly/backend is unavailable.

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getRecognition(): SpeechRecognitionLike | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.interimResults = false;
  rec.continuous = false;
  return rec;
}

export function micSupported(): boolean {
  return getRecognition() !== null;
}

/** Listen once; resolves with the transcript (or null if unsupported/cancelled). */
export function listenOnce(lang = "en-IN", onEnd?: () => void): Promise<string | null> {
  const rec = getRecognition();
  if (!rec) return Promise.resolve(null);
  rec.lang = lang;
  return new Promise((resolve) => {
    let done = false;
    const finish = (val: string | null) => {
      if (done) return;
      done = true;
      onEnd?.();
      resolve(val);
    };
    rec.onresult = (e) => {
      const text = Array.from({ length: e.results.length })
        .map((_, i) => e.results[i][0]?.transcript ?? "")
        .join(" ")
        .trim();
      finish(text || null);
    };
    rec.onerror = () => finish(null);
    rec.onend = () => finish(null);
    try {
      rec.start();
    } catch {
      finish(null);
    }
  });
}

/** Local TTS fallback — speaks Hindi on most platforms via hi-IN voice. */
export function speakLocal(text: string, lang: "hi" | "en"): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "hi" ? "hi-IN" : "en-IN";
  u.rate = 0.95;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
  return true;
}

let cachedAudio: HTMLAudioElement | null = null;
function audioEl(): HTMLAudioElement {
  if (!cachedAudio) cachedAudio = new Audio();
  return cachedAudio;
}
export function stopAudio() {
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
  cachedAudio?.pause();
}

/** Polly first (AWS story), local TTS fallback when offline. */
export async function speak(
  text: string,
  lang: "hi" | "en",
  fetchVoice: (t: string, l: "hi" | "en") => Promise<{ audio?: string }>
): Promise<"polly" | "local" | "failed"> {
  stopAudio();
  try {
    const { audio } = await fetchVoice(text, lang);
    if (audio) {
      const el = audioEl();
      el.src = `data:audio/mp3;base64,${audio}`;
      await el.play();
      return "polly";
    }
  } catch {
    /* offline or backend down */
  }
  return speakLocal(text, lang) ? "local" : "failed";
}
