"use client";

import { Pill, Globe, Wifi, WifiOff, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import SafetyBanner from "@/components/SafetyBanner";
import ItemCard from "@/components/ItemCard";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
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

  const seedDemo = () => {
    const batch = DEMO_IDS.flatMap(([id, ov]) => {
      const drug = drugById(id);
      return drug ? [itemFromDrug(drug, ov as never)] : [];
    });
    for (const item of batch) void dbPut(item);
    addMany(batch);
  };

  return (
    <main className="mx-auto w-full max-w-lg flex-1 pb-32">
      <AppHeader
        variant="home"
        title={
          <>
            Medi<span className="text-teal-soft">Shelf</span>
          </>
        }
        subtitle={t(lang, "Your medicine cabinet, understood", "आपकी दवाओं की कैबिनेट, समझी हुई")}
      >
        {/* mount-gated: navigator.onLine isn't available during SSR */}
        {ready && (
          <span
            className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[9.5px] font-extrabold tracking-wide ${
              online() ? "bg-white/12 text-white/90" : "bg-warn-soft text-warn"
            }`}
          >
            {online() ? <Wifi size={11} strokeWidth={2.4} /> : <WifiOff size={11} strokeWidth={2.4} />}
            {online() ? t(lang, "ONLINE", "ऑनलाइन") : t(lang, "OFFLINE OK", "ऑफ़लाइन चलेगा")}
          </span>
        )}
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="flex items-center gap-1 rounded-full bg-white/12 px-3 py-1.5 text-[11px] font-extrabold text-white hover:bg-white/20"
        >
          <Globe size={12} strokeWidth={2.4} />
          {lang === "en" ? "हिंदी" : "EN"}
        </button>
      </AppHeader>

      <SafetyBanner />

      {ready && items.length === 0 && (
        <div className="rise px-4 mt-8 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-[28px] bg-teal-soft text-teal">
            <Pill size={36} strokeWidth={1.8} />
          </div>
          <h2 className="mt-4 text-lg font-extrabold tracking-tight">
            {t(lang, "Your cabinet is empty", "आपकी कैबिनेट खाली है")}
          </h2>
          <p className="mx-auto mt-1.5 max-w-[280px] text-[12.5px] font-medium leading-relaxed text-mist">
            {t(
              lang,
              "Scan a strip, type a name, or load a demo cabinet to see the safety engine in action.",
              "स्ट्रिप स्कैन करें, नाम लिखें, या डेमो कैबिनेट लोड करें।"
            )}
          </p>
          <button
            onClick={seedDemo}
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-teal px-5 py-3 text-[13px] font-extrabold text-white shadow-[0_8px_20px_rgba(14,94,84,0.35)] transition active:scale-95"
          >
            <Sparkles size={15} strokeWidth={2.3} />
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

      <p className="px-7 pt-9 text-[9.5px] font-medium leading-relaxed text-mist/70">
        {t(
          lang,
          "MediShelf is informational — not medical advice. Always follow the printed label and ask a pharmacist. After-opening rules cite AAO/CDC and label guidance; the printed label always wins.",
          "MediShelf केवल जानकारी के लिए है — चिकित्सकीय सलाह नहीं। हमेशा लेबल और केमिस्ट की मानें। खोलने की अवधि के नियम AAO/CDC और लेबल पर आधारित हैं; लेबल की बात ही अंतिम है।"
        )}
      </p>

      <BottomNav />
    </main>
  );
}
