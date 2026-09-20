"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Volume2, Trash2, CalendarDays, Timer, BookMarked, ArrowRightLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import AppHeader from "@/components/AppHeader";
import { t } from "@/components/i18n";
import { speak } from "@/lib/speech";
import { apiVoice } from "@/lib/api";
import { PAO_RULES } from "@medishelf/shared";

export default function ItemPage() {
  return (
    <Suspense fallback={null}>
      <ItemDetail />
    </Suspense>
  );
}

function ItemDetail() {
  const id = useSearchParams().get("id") ?? "";
  const { itemById, report, lang, updateItem, removeItem } = useStore();
  const item = itemById(id);

  if (!item) {
    return (
      <main className="p-6">
        <Link href="/" className="font-bold text-teal">
          ← {t(lang, "Cabinet", "कैबिनेट")}
        </Link>
        <p className="mt-4 text-mist">not found</p>
      </main>
    );
  }

  const rule = PAO_RULES[item.paoCategory];

  const flags = report.expiryFlags.filter((f) => f.itemId === item.id);
  const inStacks = report.stacks.filter((s) => s.brands.includes(item.brand));

  const playPurpose = () => {
    const text =
      lang === "hi"
        ? `${item.brand}। ${item.purpose_hi || item.purpose_en}। इसमें ${item.salts.map((s) => s.name).join(", ")} है।`
        : `${item.brand}. ${item.purpose_en}. Contains ${item.salts.map((s) => s.name).join(", ")}.`;
    void speak(text, lang, apiVoice);
  };

  return (
    <main className="mx-auto w-full max-w-lg flex-1 pb-16">
      <AppHeader variant="back" title={item.brand}>
        <button
          onClick={() => {
            removeItem(item.id);
            location.href = "/";
          }}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-danger"
          aria-label={t(lang, "Remove", "हटाएँ")}
        >
          <Trash2 size={16} strokeWidth={2.1} />
        </button>
      </AppHeader>

      <div className="px-4 pt-4">
        {/* identity card */}
        <section className="rise rounded-[20px] bg-white p-5 shadow-[0_1px_2px_rgba(34,32,28,0.05)] ring-1 ring-line">
          <div className="flex flex-wrap gap-1.5">
            {item.salts.map((s, i) => (
              <span key={i} className="rounded-full bg-teal-soft px-2.5 py-1 text-[10.5px] font-extrabold text-teal">
                {s.name} {s.strengthMg ? `${s.strengthMg} mg` : s.strengthText ?? ""}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[13.5px] font-semibold leading-relaxed text-ink/85">
            {lang === "hi" ? item.purpose_hi || item.purpose_en : item.purpose_en}
          </p>
          <button
            onClick={playPurpose}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-teal px-4 py-2.5 text-[12px] font-extrabold text-white shadow-[0_6px_16px_rgba(14,94,84,0.3)] transition active:scale-95"
          >
            <Volume2 size={14} strokeWidth={2.3} />
            {t(lang, "Play in " + (lang === "hi" ? "Hindi" : "English"), "हिंदी में सुनें")}
          </button>
        </section>

        {/* warnings */}
        {(flags.length > 0 || inStacks.length > 0) && (
          <section className="mt-3.5 space-y-2.5">
            {inStacks.map((s, i) => (
              <div
                key={`s${i}`}
                className={`rise rounded-[20px] p-4 text-white ${
                  s.severity === "danger" ? "bg-danger" : "bg-warn text-ink"
                }`}
              >
                <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] opacity-90">
                  <ArrowRightLeft size={13} strokeWidth={2.4} />
                  {t(lang, `Same salt as: ${s.brands.filter((b) => b !== item.brand).join(", ")}`, `वही सॉल्ट: ${s.brands.filter((b) => b !== item.brand).join(", ")}`)}
                </p>
                {s.combinedDoseMg && (
                  <p className="mt-1.5 text-[12.5px] font-semibold">
                    {t(
                      lang,
                      `Combined per-dose: ${s.combinedDoseMg} mg${s.maxDailyMg ? ` · daily cap ${s.maxDailyMg} mg` : ""}`,
                      `एक-एक खुराक: ${s.combinedDoseMg} मिग्रा${s.maxDailyMg ? ` · दैनिक सीमा ${s.maxDailyMg} मिग्रा` : ""}`
                    )}
                  </p>
                )}
              </div>
            ))}
            {flags.map((f, i) => {
              const tone =
                f.severity === "danger"
                  ? "bg-danger text-white"
                  : f.severity === "warning"
                    ? "bg-warn-soft text-warn ring-1 ring-warn/30"
                    : "bg-teal-soft text-teal";
              return (
                <div key={`f${i}`} className={`rise rounded-[20px] p-4 ${tone}`}>
                  <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] opacity-90">
                    <Timer size={13} strokeWidth={2.4} />
                    {f.kind === "pao" ? t(lang, "After-opening clock", "खोलने की घड़ी") : t(lang, "Printed expiry", "छपी तारीख़")}
                  </p>
                  <p className="mt-1.5 text-[12.5px] font-semibold leading-snug">
                    {lang === "hi" ? f.message_hi : f.message_en}
                  </p>
                </div>
              );
            })}
          </section>
        )}

        {/* dates */}
        <section className="mt-3.5 space-y-3 rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(34,32,28,0.05)] ring-1 ring-line">
          <label className="block text-[11px] font-extrabold uppercase tracking-[0.1em] text-mist">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} strokeWidth={2.3} />
              {t(lang, "Printed expiry on pack", "पैक पर छपी तारीख़")}
            </span>
            <input
              type="date"
              value={item.printedExpiry ?? ""}
              onChange={(e) => updateItem({ ...item, printedExpiry: e.target.value || undefined })}
              className="mt-1.5 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-[13px] font-bold text-ink"
            />
          </label>

          <div className="rounded-2xl bg-warn-soft p-3.5 ring-1 ring-warn/25">
            <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-warn">
              <Timer size={13} strokeWidth={2.4} />
              {t(lang, "Opened on", "खोली गई")}
              {rule && rule.days ? (
                <span className="font-bold normal-case tracking-normal">
                  — {t(lang, `discard ${rule.days} days after opening`, `खोलने के ${rule.days} दिन बाद फेंकें`)}
                </span>
              ) : null}
            </p>
            <div className="mt-2 flex gap-2">
              <input
                type="date"
                value={item.openedOn ?? ""}
                onChange={(e) => updateItem({ ...item, openedOn: e.target.value || undefined })}
                className="flex-1 rounded-xl border border-warn/40 bg-white px-3 py-2 text-[13px] font-bold text-ink"
              />
              {!item.openedOn && (
                <button
                  onClick={() => updateItem({ ...item, openedOn: new Date().toISOString().slice(0, 10) })}
                  className="rounded-xl bg-warn px-4 py-2 text-[12px] font-extrabold text-white transition active:scale-95"
                >
                  {t(lang, "Opened today", "आज खोली")}
                </button>
              )}
            </div>
            {rule?.source && (
              <p className="mt-2 flex items-start gap-1 text-[9.5px] font-semibold text-warn/80">
                <BookMarked size={11} className="mt-px shrink-0" strokeWidth={2.2} />
                {t(lang, "Source: ", "स्रोत: ")}
                {rule.source.split(" ; ")[0]}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
