"use client";

import Link from "next/link";
import { useMemo } from "react";
import { TriangleAlert, Volume2, ChevronRight, CalendarX2 } from "lucide-react";
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
    <div className="px-4 pt-3 space-y-2.5">
      <div className="flex items-center justify-between text-[11px] font-semibold text-mist">
        <span>{summary}</span>
        <button onClick={speakSummary} className="flex items-center gap-1 text-teal font-bold hover:opacity-80">
          <Volume2 size={14} strokeWidth={2.3} />
          {t(lang, "Listen", "सुनें")}
        </button>
      </div>

      {top && (
        <Link
          href={`/stack?salt=${encodeURIComponent(top.salt)}`}
          className={`relative block overflow-hidden rounded-[20px] p-4 text-white shadow-[0_8px_22px_rgba(178,58,49,0.28)] ${
            top.severity === "danger" ? "bg-danger danger-pulse" : "bg-warn"
          }`}
        >
          {/* subtle waves inside the alert card */}
          <svg aria-hidden viewBox="0 0 390 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-14 w-full opacity-[0.14]">
            <path d="M0 60 C 70 90, 130 30, 200 55 C 270 80, 320 95, 390 65 L 390 120 L 0 120 Z" fill="white" />
            <path d="M0 90 C 80 115, 150 70, 230 90 C 300 108, 340 112, 390 95 L 390 120 L 0 120 Z" fill="white" />
          </svg>
          <div className="relative">
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] opacity-90">
              <TriangleAlert size={13} strokeWidth={2.4} />
              {t(lang, "Duplicate salt danger", "एक ही सॉल्ट — ख़तरा")}
            </p>
            <p className="mt-1.5 text-[15px] font-extrabold leading-snug tracking-tight">
              {top.brands.join(" + ")} — {top.salt}
            </p>
            <p className="mt-1 text-[12.5px] font-medium opacity-95">
              {top.combinedDoseMg
                ? t(
                    lang,
                    `One dose of each = ${top.combinedDoseMg} mg${top.maxDailyMg ? ` (daily cap ${top.maxDailyMg} mg)` : ""}`,
                    `एक-एक खुराक = ${top.combinedDoseMg} मिग्रा${top.maxDailyMg ? ` (दैनिक सीमा ${top.maxDailyMg} मिग्रा)` : ""}`
                  )
                : t(lang, "Both contain this salt — do not double up.", "दोनों में यह सॉल्ट है — साथ न लें।")}
            </p>
          </div>
        </Link>
      )}

      {dangers.flags.length > 0 && (
        <div className="rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(34,32,28,0.05)] ring-1 ring-danger/20">
          <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-danger">
            <CalendarX2 size={13} strokeWidth={2.4} />
            {t(lang, "Expired / discard now", "समाप्त / अभी फेंकें")}
          </p>
          <ul className="mt-1.5 space-y-1 text-[12.5px] font-medium leading-snug text-ink/85">
            {dangers.flags.slice(0, 3).map((f, i) => (
              <li key={i}>• {lang === "hi" ? f.message_hi : f.message_en}</li>
            ))}
          </ul>
        </div>
      )}

      {(stacks.length > 0 || expiryFlags.length > 0) && (
        <Link href="/alerts" className="flex items-center justify-center gap-0.5 py-1 text-[11px] font-bold text-teal hover:opacity-80">
          {t(lang, "See all safety alerts", "सभी सुरक्षा चेतावनियाँ देखें")}
          <ChevronRight size={13} strokeWidth={2.5} />
        </Link>
      )}
    </div>
  );
}
