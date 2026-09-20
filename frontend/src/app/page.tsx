"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import SafetyBanner from "@/components/SafetyBanner";
import ItemCard from "@/components/ItemCard";
import AddSheet from "@/components/AddSheet";
import { t } from "@/components/i18n";
import { drugById, itemFromDrug } from "@medishelf/shared";
import { dbPut } from "@/lib/db";
import { online } from "@/lib/api";

const DEMO_IDS: Array<[string, Partial<Record<string, string>>]> = [
  ["dolo-650", {}],
  ["cheston-cold", {}],
  ["combiflam", {}],
  ["refresh-tears", { openedOn: daysAgo(40) }],
  ["azithral-syrup", { openedOn: daysAgo(12) }],
  ["pan-40", { printedExpiry: daysFromNow(20) }],
];

function daysAgo(n: number) {
  return new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
}
function daysFromNow(n: number) {
  return new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);
}

export default function Home() {
  const { ready, items, lang, setLang, addMany } = useStore();
  const [sheet, setSheet] = useState(false);

  const seedDemo = () => {
    const batch = DEMO_IDS.flatMap(([id, ov]) => {
      const drug = drugById(id);
      return drug ? [itemFromDrug(drug, ov as never)] : [];
    });
    for (const item of batch) void dbPut(item);
    addMany(batch);
  };

  return (
    <main className="mx-auto w-full max-w-lg flex-1 pb-28">
      <header className="sticky top-0 z-40 bg-emerald-700 text-white px-4 pt-5 pb-4 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-tight">
              Medi<span className="text-emerald-200">Shelf</span>
            </h1>
            <p className="text-[11px] text-emerald-100 mt-0.5">
              {t(lang, "Your medicine cabinet, understood", "आपकी दवाओं की कैबिनेट, समझी हुई")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* mount-gated: navigator.onLine isn't available during SSR, and a
                suppressHydrationWarning chip would keep the server's stale text */}
            {ready && (
              <span
                className={`text-[10px] font-semibold rounded-full px-2 py-1 ${
                  online() ? "bg-emerald-500/40" : "bg-amber-400 text-amber-950"
                }`}
              >
                {online() ? t(lang, "ONLINE", "ऑनलाइन") : t(lang, "OFFLINE OK", "ऑफ़लाइन चलेगा")}
              </span>
            )}
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold"
            >
              {lang === "en" ? "हिंदी" : "EN"}
            </button>
          </div>
        </div>
      </header>

      <SafetyBanner />

      {ready && items.length === 0 && (
        <div className="px-4 mt-6 text-center">
          <span className="text-5xl">💊</span>
          <h2 className="mt-3 font-bold text-lg">{t(lang, "Your cabinet is empty", "आपकी कैबिनेट खाली है")}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {t(
              lang,
              "Scan a strip, type a name, or load a demo cabinet to see the safety engine in action.",
              "स्ट्रिप स्कैन करें, नाम लिखें, या डेमो कैबिनेट लोड करें।"
            )}
          </p>
          <button
            onClick={seedDemo}
            className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
          >
            {t(lang, "Load demo cabinet", "डेमो कैबिनेट लोड करें")}
          </button>
        </div>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 px-4 pt-4">
          {items.map((i) => (
            <ItemCard key={i.id} id={i.id} />
          ))}
        </div>
      )}

      <p className="px-6 pt-8 text-[10px] leading-relaxed text-slate-400">
        {t(
          lang,
          "MediShelf is informational — not medical advice. Always follow the printed label and ask a pharmacist. After-opening rules cite AAO/CDC and label guidance; the printed label always wins.",
          "MediShelf केवल जानकारी के लिए है — चिकित्सकीय सलाह नहीं। हमेशा लेबल और केमिस्ट की मानें। खोलने की अवधि के नियम AAO/CDC और लेबल पर आधारित हैं; लेबल की बात ही अंतिम है।"
        )}
      </p>

      <button
        onClick={() => setSheet(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 rounded-full bg-emerald-600 px-6 py-4 font-bold text-white shadow-xl shadow-emerald-600/30 active:scale-95"
      >
        + {t(lang, "Add medicine", "दवा जोड़ें")}
      </button>

      {sheet && <AddSheet onClose={() => setSheet(false)} />}
    </main>
  );
}
