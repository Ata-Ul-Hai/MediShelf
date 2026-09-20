"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TriangleAlert, ChevronRight } from "lucide-react";
import { useStore } from "@/lib/store";
import AppHeader from "@/components/AppHeader";
import { t } from "@/components/i18n";
import { normalizeSalt, limitFor } from "@medishelf/shared";

export default function StackPage() {
  return (
    <Suspense fallback={null}>
      <StackDetail />
    </Suspense>
  );
}

function StackDetail() {
  const salt = useSearchParams().get("salt") ?? "";
  const { items, report, lang } = useStore();
  const decoded = decodeURIComponent(salt);
  const key = normalizeSalt(decoded);
  const stack = report.stacks.find((s) => s.salt === key);
  const members = items.filter((i) => i.salts.some((s) => normalizeSalt(s.name) === key));
  const limit = limitFor(key);

  return (
    <main className="mx-auto w-full max-w-lg flex-1 pb-16">
      <AppHeader variant="back" title={t(lang, "Salt detail", "सॉल्ट विवरण")} />

      <div className="px-4 pt-4">
        <div
          className={`relative overflow-hidden rounded-[20px] p-5 text-white shadow-sm ${
            stack?.severity === "danger" ? "bg-danger" : "bg-warn"
          }`}
        >
          <svg aria-hidden viewBox="0 0 390 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-14 w-full opacity-[0.14]">
            <path d="M0 60 C 70 90, 130 30, 200 55 C 270 80, 320 95, 390 65 L 390 120 L 0 120 Z" fill="white" />
            <path d="M0 90 C 80 115, 150 70, 230 90 C 300 108, 340 112, 390 95 L 390 120 L 0 120 Z" fill="white" />
          </svg>
          <div className="relative">
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] opacity-90">
              <TriangleAlert size={13} strokeWidth={2.4} />
              {t(lang, "Duplicate salt", "एक ही सॉल्ट")}
            </p>
            <h1 className="mt-1 text-[26px] font-extrabold capitalize leading-tight tracking-tight">{key}</h1>
            {stack?.combinedDoseMg && (
              <p className="mt-2 text-[12.5px] font-semibold">
                {t(
                  lang,
                  `One dose of each product = ${stack.combinedDoseMg} mg${limit?.maxDailyMg ? ` · adult daily cap ${limit.maxDailyMg} mg` : ""}`,
                  `हर दवा की एक खुराक = ${stack.combinedDoseMg} मिग्रा${limit?.maxDailyMg ? ` · वयस्क दैनिक सीमा ${limit.maxDailyMg} मिग्रा` : ""}`
                )}
              </p>
            )}
            {limit && <p className="mt-2 text-[12px] font-medium opacity-95">{lang === "hi" ? limit.note_hi : limit.note_en}</p>}
          </div>
        </div>

        <p className="mt-5 px-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-mist">
          {t(lang, "In your cabinet with this salt", "आपकी कैबिनेट में यह सॉल्ट")}
        </p>
        <ul className="mt-2 space-y-2.5">
          {members.map((m) => (
            <li key={m.id} className="rise">
              <Link
                href={`/item?id=${m.id}`}
                className="flex items-center gap-3 rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(34,32,28,0.05)] ring-1 ring-line"
              >
                <div className="flex-1">
                  <p className="text-[13.5px] font-extrabold tracking-tight">{m.brand}</p>
                  <p className="mt-0.5 text-[10.5px] font-medium text-mist">
                    {m.salts
                      .filter((s) => normalizeSalt(s.name) === key)
                      .map((s) => `${s.name} ${s.strengthMg ? `${s.strengthMg} mg` : s.strengthText ?? ""}`)
                      .join(", ")}
                  </p>
                  <p className="mt-1 text-[10.5px] leading-snug text-ink/65">
                    {lang === "hi" ? m.purpose_hi || m.purpose_en : m.purpose_en}
                  </p>
                </div>
                <ChevronRight size={16} className="text-mist/60" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
