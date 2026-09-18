"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { t } from "./i18n";
import { speak } from "@/lib/speech";
import { apiVoice } from "@/lib/api";
import type { CabinetItem } from "@medishelf/shared";

/** Red/amber/green per item: danger flags + danger stacks dominate. */
export function itemStatus(
  item: CabinetItem,
  report: ReturnType<typeof useStore>["report"]
): "danger" | "warning" | "ok" {
  let s: "danger" | "warning" | "ok" = "ok";
  for (const f of report.expiryFlags) {
    if (f.itemId !== item.id) continue;
    if (f.severity === "danger") return "danger";
    if (f.severity === "warning") s = "warning";
  }
  for (const st of report.stacks) {
    if (!st.brands.includes(item.brand)) continue;
    if (st.severity === "danger") return "danger";
    if (st.severity === "warning") s = "warning";
  }
  return s;
}

export default function SafetyBanner() {
  const { report, lang, items } = useStore();
  const { stacks, expiryFlags } = report;

  const dangers = useMemo(
    () => ({
      stacks: stacks.filter((s) => s.severity === "danger"),
      flags: expiryFlags.filter((f) => f.severity === "danger"),
    }),
    [stacks, expiryFlags]
  );

  if (!items.length) return null;

  const summary =
    lang === "hi"
      ? `${items.length} दवाइयाँ · ${stacks.length} सॉल्ट-जोखिम · ${expiryFlags.length} तारीख़ चेतावनी`
      : `${items.length} medicines · ${stacks.length} salt risk${stacks.length === 1 ? "" : "s"} · ${expiryFlags.length} date warning${expiryFlags.length === 1 ? "" : "s"}`;

  const top = dangers.stacks[0] ?? null;

  const speakSummary = () => {
    if (top) {
      const text =
        lang === "hi"
          ? `चेतावनी। ${top.brands.join(" और ")} में एक ही सॉल्ट है: ${top.salt}। एक साथ न लें।`
          : `Warning. ${top.brands.join(" and ")} contain the same salt: ${top.salt}. Do not take them together.`;
      void speak(text, lang, apiVoice);
    }
  };

  return (
    <div className="px-4 pt-3 space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{summary}</span>
        <button onClick={speakSummary} className="flex items-center gap-1 text-emerald-700 font-medium">
          🔊 {t(lang, "Listen", "सुनें")}
        </button>
      </div>

      {top && (
        <Link
          href={`/stack/${encodeURIComponent(top.salt)}`}
          className={`block rounded-2xl p-4 text-white shadow-md danger-pulse ${
            top.severity === "danger" ? "bg-red-600" : "bg-amber-500"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide opacity-90">
            {t(lang, "⚠ Duplicate salt danger", "⚠ एक ही सॉल्ट — ख़तरा")}
          </p>
          <p className="mt-1 font-bold leading-snug">
            {top.brands.join(" + ")} — {top.salt}
          </p>
          <p className="mt-1 text-sm opacity-95">
            {top.combinedDoseMg
              ? t(
                  lang,
                  `One dose of each = ${top.combinedDoseMg} mg${top.maxDailyMg ? ` (daily cap ${top.maxDailyMg} mg)` : ""}`,
                  `एक-एक खुराक = ${top.combinedDoseMg} मिग्रा${top.maxDailyMg ? ` (दैनिक सीमा ${top.maxDailyMg} मिग्रा)` : ""}`
                )
              : t(lang, "Both contain this salt — do not double up.", "दोनों में यह सॉल्ट है — साथ न लें।")}
          </p>
        </Link>
      )}

      {dangers.flags.length > 0 && (
        <div className="rounded-2xl bg-white border border-red-200 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
            {t(lang, "Expired / discard now", "समाप्त / अभी फेंकें")}
          </p>
          <ul className="mt-1 space-y-1 text-sm text-slate-800">
            {dangers.flags.slice(0, 3).map((f, i) => (
              <li key={i}>• {lang === "hi" ? f.message_hi : f.message_en}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
