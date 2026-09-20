"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { t } from "@/components/i18n";
import { itemStatus } from "@/components/SafetyBanner";
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
        <Link href="/" className="text-emerald-700 font-semibold">← home</Link>
        <p className="mt-4 text-slate-500">not found</p>
      </main>
    );
  }

  const status = itemStatus(item, report);
  const rule = PAO_RULES[item.paoCategory];
  const statusColor =
    status === "danger" ? "bg-red-50 border-red-300" : status === "warning" ? "bg-amber-50 border-amber-300" : "bg-emerald-50 border-emerald-300";

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
    <main className="mx-auto w-full max-w-lg px-4 pt-4 pb-16">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-emerald-700 font-semibold">
          ← {t(lang, "Cabinet", "कैबिनेट")}
        </Link>
        <button
          onClick={() => {
            removeItem(item.id);
            location.href = "/";
          }}
          className="text-red-600 text-sm font-medium"
        >
          {t(lang, "Remove", "हटाएँ")}
        </button>
      </div>

      <div className={`mt-4 rounded-2xl border-2 p-5 ${statusColor}`}>
        <h1 className="text-2xl font-black">{item.brand}</h1>
        {item.company && <p className="text-sm text-slate-500">{item.company}</p>}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.salts.map((s, i) => (
            <span key={i} className="rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-800 border border-slate-200">
              {s.name} {s.strengthMg ? `${s.strengthMg} mg` : s.strengthText ?? ""}
            </span>
          ))}
        </div>
        <p className="mt-3 text-slate-800">{lang === "hi" ? item.purpose_hi || item.purpose_en : item.purpose_en}</p>
        <button
          onClick={playPurpose}
          className="mt-3 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white"
        >
          🔊 {t(lang, "Play in " + (lang === "hi" ? "Hindi" : "English"), "🔊 हिंदी में सुनें")}
        </button>
      </div>

      {(flags.length > 0 || inStacks.length > 0) && (
        <section className="mt-4 space-y-2">
          {inStacks.map((s, i) => (
            <div key={`s${i}`} className={`rounded-2xl p-4 text-sm ${s.severity === "danger" ? "bg-red-600 text-white" : "bg-amber-100 text-amber-950"}`}>
              <p className="font-bold">
                ⚠ {t(lang, `Same salt as: ${s.brands.filter((b) => b !== item.brand).join(", ")}`, `वही सॉल्ट: ${s.brands.filter((b) => b !== item.brand).join(", ")}`)}
              </p>
              {s.combinedDoseMg && (
                <p className="mt-1">
                  {t(lang, `Combined per-dose: ${s.combinedDoseMg} mg${s.maxDailyMg ? ` · daily cap ${s.maxDailyMg} mg` : ""}`, `एक-एक खुराक: ${s.combinedDoseMg} मिग्रा${s.maxDailyMg ? ` · दैनिक सीमा ${s.maxDailyMg} मिग्रा` : ""}`)}
                </p>
              )}
            </div>
          ))}
          {flags.map((f, i) => (
            <div key={`f${i}`} className={`rounded-2xl p-4 text-sm ${f.severity === "danger" ? "bg-red-600 text-white" : f.severity === "warning" ? "bg-amber-100 text-amber-950" : "bg-slate-100 text-slate-800"}`}>
              <p className="font-bold">
                {f.kind === "pao" ? t(lang, "After-opening clock", "खोलने की घड़ी") : t(lang, "Printed expiry", "छपी तारीख़")}
              </p>
              <p className="mt-1">{lang === "hi" ? f.message_hi : f.message_en}</p>
            </div>
          ))}
        </section>
      )}

      <section className="mt-4 rounded-2xl bg-white border border-slate-200 p-4 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          {t(lang, "Printed expiry on pack", "पैक पर छपी तारीख़")}
          <input
            type="date"
            value={item.printedExpiry ?? ""}
            onChange={(e) => updateItem({ ...item, printedExpiry: e.target.value || undefined })}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5"
          />
        </label>

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
          <p className="text-sm font-semibold text-amber-900">
            {t(lang, "Opened on", "खोली गई")}
            {rule && rule.days ? (
              <span className="ml-1 font-normal">
                ({t(lang, `discard ${rule.days} days after opening`, `खोलने के ${rule.days} दिन बाद फेंकें`)})
              </span>
            ) : null}
          </p>
          <div className="mt-2 flex gap-2">
            <input
              type="date"
              value={item.openedOn ?? ""}
              onChange={(e) => updateItem({ ...item, openedOn: e.target.value || undefined })}
              className="flex-1 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm"
            />
            {!item.openedOn && (
              <button
                onClick={() =>
                  updateItem({ ...item, openedOn: new Date().toISOString().slice(0, 10) })
                }
                className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-white"
              >
                {t(lang, "Opened today", "आज खोली")}
              </button>
            )}
          </div>
          {rule?.source && (
            <p className="mt-2 text-[10px] text-amber-700">
              {t(lang, "Source: ", "स्रोत: ")}
              {rule.source.split(" ; ")[0]}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
