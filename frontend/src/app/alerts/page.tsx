"use client";

import Link from "next/link";
import { TriangleAlert, CalendarX2, CalendarClock, ShieldCheck, ChevronRight, Layers } from "lucide-react";
import { useStore } from "@/lib/store";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { t } from "@/components/i18n";

export default function AlertsPage() {
  const { report, items, lang } = useStore();
  const { stacks, expiryFlags } = report;

  const sortKey = { danger: 0, warning: 1, info: 2 } as const;
  const flags = [...expiryFlags].sort((a, b) => sortKey[a.severity] - sortKey[b.severity]);
  const clean = items.length > 0 && stacks.length === 0 && flags.length === 0;

  const SEV_STYLE = {
    danger: { box: "bg-danger-soft text-danger", text: "text-danger" },
    warning: { box: "bg-warn-soft text-warn", text: "text-warn" },
    info: { box: "bg-teal-soft text-teal", text: "text-teal" },
  } as const;

  return (
    <main className="mx-auto w-full max-w-lg flex-1 pb-32">
      <AppHeader variant="back" title={t(lang, "Safety alerts", "सुरक्षा चेतावनियाँ")} />

      {clean && (
        <div className="rise px-4 pt-10 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-[28px] bg-teal-soft text-teal">
            <ShieldCheck size={36} strokeWidth={1.8} />
          </div>
          <h2 className="mt-4 text-lg font-extrabold tracking-tight">
            {t(lang, "All clear", "सब ठीक है")}
          </h2>
          <p className="mx-auto mt-1.5 max-w-[280px] text-[12.5px] font-medium leading-relaxed text-mist">
            {t(
              lang,
              "No duplicate salts, nothing expired, all after-opening clocks within limits.",
              "कोई डुप्लीकेट सॉल्ट नहीं, कुछ भी एक्सपायर नहीं, सभी टाइमर सीमा में।"
            )}
          </p>
        </div>
      )}

      {items.length === 0 && (
        <p className="px-6 pt-10 text-center text-[12.5px] font-medium text-mist">
          {t(lang, "Add medicines to see safety alerts here.", "सुरक्षा चेतावनियों के लिए दवाइयाँ जोड़ें।")}
        </p>
      )}

      {stacks.length > 0 && (
        <section className="px-4 pt-4">
          <h3 className="flex items-center gap-1.5 px-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-mist">
            <Layers size={12} strokeWidth={2.4} />
            {t(lang, "Duplicate salt risks", "डुप्लीकेट सॉल्ट जोखिम")}
          </h3>
          <ul className="mt-2 space-y-2.5">
            {stacks.map((s, i) => (
              <li key={i} className="rise">
                <Link
                  href={`/stack?salt=${encodeURIComponent(s.salt)}`}
                  className={`block rounded-[20px] p-4 text-white shadow-sm ${
                    s.severity === "danger" ? "bg-danger" : "bg-warn"
                  }`}
                >
                  <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] opacity-90">
                    <TriangleAlert size={13} strokeWidth={2.4} />
                    <span className="capitalize">{s.salt}</span>
                  </p>
                  <p className="mt-1 text-[13.5px] font-extrabold leading-snug tracking-tight">
                    {s.brands.join(" + ")}
                  </p>
                  {s.combinedDoseMg && (
                    <p className="mt-1 text-[12px] font-medium opacity-95">
                      {t(
                        lang,
                        `One dose of each = ${s.combinedDoseMg} mg${s.maxDailyMg ? ` · cap ${s.maxDailyMg} mg` : ""}`,
                        `एक-एक खुराक = ${s.combinedDoseMg} मिग्रा${s.maxDailyMg ? ` · सीमा ${s.maxDailyMg} मिग्रा` : ""}`
                      )}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {flags.length > 0 && (
        <section className="px-4 pt-5">
          <h3 className="flex items-center gap-1.5 px-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-mist">
            <CalendarClock size={12} strokeWidth={2.4} />
            {t(lang, "Dates & after-opening clocks", "तारीख़ें और खोलने की घड़ियाँ")}
          </h3>
          <ul className="mt-2 overflow-hidden rounded-[20px] bg-white shadow-[0_1px_2px_rgba(34,32,28,0.05)] ring-1 ring-line">
            {flags.map((f, i) => {
              const sev = SEV_STYLE[f.severity];
              const Icon = f.kind === "pao" ? CalendarClock : CalendarX2;
              return (
                <li key={i} className={`flex items-start gap-3 p-3.5 ${i > 0 ? "border-t border-line" : ""}`}>
                  <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[10px] ${sev.box}`}>
                    <Icon size={16} strokeWidth={2.1} />
                  </span>
                  <p className="flex-1 text-[12px] font-semibold leading-snug text-ink/85">
                    {lang === "hi" ? f.message_hi : f.message_en}
                  </p>
                  <ChevronRight size={14} className="mt-2 shrink-0 text-mist/60" />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <BottomNav />
    </main>
  );
}
