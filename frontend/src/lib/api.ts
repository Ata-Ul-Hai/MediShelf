"use client";

import type { PrescribedItem, ScanResult } from "@medishelf/shared";

// Backend base URL — set NEXT_PUBLIC_API_URL at build/deploy time (Amplify env var).
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export function online(): boolean {
  return typeof navigator !== "undefined" && navigator.onLine;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  if (!API_URL) throw new Error("backend URL not configured");
  const res = await fetch(API_URL + path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as T & { ok?: boolean; error?: string };
  if (!res.ok || json.ok === false) throw new Error(json.error ?? `HTTP ${res.status}`);
  return json;
}

export async function apiScan(imageDataUrl: string): Promise<ScanResult & { vision?: unknown }> {
  return post("/scan", { image: imageDataUrl });
}

export async function apiPrescription(imageDataUrl: string): Promise<{ medicines: PrescribedItem[] }> {
  return post("/prescription", { image: imageDataUrl });
}

export interface VoiceResult {
  audio?: string; // base64 mp3 from Polly
  fallback?: "local";
}

/** Polly voice via backend; caller falls back to speechSynthesis on error. */
export async function apiVoice(text: string, lang: "hi" | "en"): Promise<VoiceResult> {
  return post("/voice", { text, lang });
}

export async function apiSyncCabinet(householdId: string, items: unknown[]): Promise<void> {
  if (!API_URL || !online()) return;
  try {
    await post("/cabinet", { householdId, items });
  } catch {
    /* sync is best-effort; local IndexedDB is the source of truth */
  }
}

export async function apiGetCabinet<T>(householdId: string): Promise<T | null> {
  if (!API_URL || !online()) return null;
  try {
    const res = await fetch(`${API_URL}/cabinet?id=${encodeURIComponent(householdId)}`);
    const json = (await res.json()) as { item: T | null };
    return json.item ?? null;
  } catch {
    return null;
  }
}
