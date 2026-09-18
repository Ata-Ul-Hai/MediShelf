import type { Lang } from "@/lib/store";

/** Inline i18n: t("en", "Fever", "बुखार") — Hindi shown when lang === "hi". */
export function t(lang: Lang, en: string, hi: string): string {
  return lang === "hi" ? hi : en;
}
