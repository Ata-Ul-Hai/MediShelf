"use client";

import { useMemo, useRef, useState } from "react";
import { searchIndex } from "@medishelf/shared";
import type { DrugEntry, PrescriptionMatch, PrescribedItem } from "@medishelf/shared";
import { useStore } from "@/lib/store";
import { t } from "./i18n";
import { apiPrescription, apiScan, API_URL, online } from "@/lib/api";
import { listenOnce, micSupported } from "@/lib/speech";
import { matchPrescription } from "@medishelf/shared";

type Tab = "type" | "scan" | "rx";

/** Downscale camera photos so base64 payloads stay under ~1 MB. */
function fileToDataUrl(file: File, max = 1280): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        if (scale >= 1) return resolve(reader.result as string);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => resolve(reader.result as string);
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function AddSheet({ onClose }: { onClose: () => void }) {
  const { lang, addDrug, addRaw, items } = useStore();
  const [tab, setTab] = useState<Tab>("type");
  const [expiry, setExpiry] = useState("");

  const T = {
    title: t(lang, "Add medicine", "दवा जोड़ें"),
    type: t(lang, "Type / Speak", "लिखें / बोलें"),
    scan: t(lang, "Scan strip", "स्कैन"),
    rx: t(lang, "Prescription", "पर्चा"),
    typePh: t(lang, "e.g. Dolo, paracetamol, azith…", "जैसे डोलो, पैरासिटामोल…"),
    mic: t(lang, "Speak", "बोलें"),
    expiryPh: t(lang, "Printed expiry (optional)", "छपी एक्सपायरी (वैकल्पिक)"),
    add: t(lang, "Add to cabinet", "कैबिनेट में जोड़ें"),
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button aria-label="close" className="absolute inset-0 bg-black/40 fade-in" onClick={onClose} />
      <div className="relative sheet-enter bg-white rounded-t-3xl shadow-2xl max-h-[88vh] flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <h2 className="font-bold text-lg">{T.title}</h2>
          <button onClick={onClose} className="text-slate-400 text-2xl leading-none px-2">×</button>
        </div>
        <div className="flex gap-1 px-4 pb-2">
          {(["type", "scan", "rx"] as Tab[]).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`flex-1 rounded-xl px-2 py-2 text-sm font-medium ${
                tab === k ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              {k === "type" ? T.type : k === "scan" ? T.scan : T.rx}
            </button>
          ))}
        </div>
        <div className="overflow-y-auto px-4 pb-8 pt-1">
          {tab === "type" && <TypeTab expiry={expiry} setExpiry={setExpiry} labels={T} onDone={onClose} />}
          {tab === "scan" && <ScanTab expiry={expiry} setExpiry={setExpiry} labels={T} onDone={onClose} />}
          {tab === "rx" && <RxTab />}
        </div>
      </div>
    </div>
  );
}

// ─── Type / Speak (works fully offline against the bundled index) ─────────────

function TypeTab({
  expiry,
  setExpiry,
  labels,
  onDone,
}: {
  expiry: string;
  setExpiry: (v: string) => void;
  labels: { typePh: string; mic: string; expiryPh: string; add: string };
  onDone?: () => void;
}) {
  const { lang, addDrug } = useStore();
  const [q, setQ] = useState("");
  const [listening, setListening] = useState(false);
  const [picked, setPicked] = useState<DrugEntry | null>(null);
  const results = useMemo(() => (q.trim().length >= 2 ? searchIndex(q, 8) : []), [q]);

  const onMic = async () => {
    setListening(true);
    const text = await listenOnce(lang === "hi" ? "hi-IN" : "en-IN", () => setListening(false));
    if (text) {
      setQ(text);
      setPicked(null);
    }
  };

  if (picked) {
    return (
      <ConfirmAdd
        drug={picked}
        expiry={expiry}
        setExpiry={setExpiry}
        labels={labels}
        onBack={() => setPicked(null)}
        onAdded={onDone}
      />
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={labels.typePh}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-base outline-none focus:border-emerald-500"
        />
        {micSupported() && (
          <button
            onClick={onMic}
            className={`rounded-xl px-4 text-lg ${listening ? "bg-red-500 text-white animate-pulse" : "bg-emerald-600 text-white"}`}
            title={labels.mic}
          >
            🎙
          </button>
        )}
      </div>
      {listening && (
        <p className="mt-2 text-xs text-emerald-700">{t(lang, "Listening…", "सुन रहे हैं…")}</p>
      )}
      <ul className="mt-3 divide-y divide-slate-100">
        {results.map((d) => (
          <li key={d.id}>
            <button
              onClick={() => setPicked(d)}
              className="w-full text-left px-2 py-3 hover:bg-slate-50 rounded-lg"
            >
              <span className="font-semibold">{d.brand}</span>
              <span className="block text-xs text-slate-500">
                {d.salts.map((s) => `${s.name}${s.strengthMg ? ` ${s.strengthMg}mg` : s.strengthText ? ` ${s.strengthText}` : ""}`).join(" + ")}
                {d.company ? ` · ${d.company}` : ""}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConfirmAdd({
  drug,
  expiry,
  setExpiry,
  labels,
  onBack,
  onAdded,
}: {
  drug: DrugEntry;
  expiry: string;
  setExpiry: (v: string) => void;
  labels: { expiryPh: string; add: string };
  onBack: () => void;
  onAdded?: () => void;
}) {
  const { lang, addDrug } = useStore();
  return (
    <div>
      <button onClick={onBack} className="text-sm text-slate-500 mb-3">← {t(lang, "back", "वापस")}</button>
      <div className="rounded-2xl border border-slate-200 p-4">
        <p className="font-bold text-lg">{drug.brand}</p>
        <p className="text-sm text-slate-600">{drug.company}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {drug.salts.map((s, i) => (
            <span key={i} className="rounded-full bg-emerald-50 text-emerald-800 text-xs px-2.5 py-1 font-medium">
              {s.name} {s.strengthMg ? `${s.strengthMg} mg` : s.strengthText ?? ""}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm">{lang === "hi" ? drug.purpose_hi || drug.purpose_en : drug.purpose_en}</p>
      </div>
      <label className="block mt-4 text-sm font-medium text-slate-700">{labels.expiryPh}
        <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3" />
      </label>
      <button
        onClick={() => {
          addDrug(drug, expiry ? { printedExpiry: expiry } : {});
          setExpiry("");
          onAdded?.();
        }}
        className="mt-4 w-full rounded-xl bg-emerald-600 py-3.5 font-bold text-white shadow active:scale-[0.99]"
      >
        {labels.add}
      </button>
    </div>
  );
}

// ─── Scan (Textract + Bedrock via backend; needs network) ─────────────────────

function ScanTab({
  expiry,
  setExpiry,
  labels,
  onDone,
}: {
  expiry: string;
  setExpiry: (v: string) => void;
  labels: { expiryPh: string; add: string };
  onDone?: () => void;
}) {
  const { lang, addDrug, addRaw } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Array<{ id: string | null; brand: string; salts: string; purpose: string; confidence: number; evidence: string[]; raw: DrugEntry | null }>>([]);
  const [pickedRaw, setPickedRaw] = useState<DrugEntry | null>(null);

  const offlineMsg = t(
    lang,
    "Scanning needs internet. Offline? Use Type / Speak instead — it works without network.",
    "स्कैन के लिए इंटरनेट चाहिए। ऑफ़लाइन हैं? लिखें/बोलें टैब इस्तेमाल करें — बिना नेट चलता है।"
  );

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setErr(null);
    setCandidates([]);
    setImage(await fileToDataUrl(f));
  };

  const identify = async () => {
    if (!image) return;
    if (!API_URL || !online()) {
      setErr(offlineMsg);
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const res = await apiScan(image);
      setCandidates(
        res.candidates.map((c) => ({
          id: c.id,
          brand: c.brand,
          salts: c.salts.map((s) => `${s.name}${s.strengthMg ? ` ${s.strengthMg}mg` : s.strengthText ? ` ${s.strengthText}` : ""}`).join(" + "),
          purpose: lang === "hi" ? c.purpose_hi || c.purpose_en : c.purpose_en,
          confidence: c.confidence,
          evidence: c.evidence,
          raw: c.id ? (searchIndex(c.brand, 1)[0] ?? null) : null,
        }))
      );
      if (!res.candidates.length) setErr(t(lang, "Couldn't read the pack — try again with less glare, or type the name.", "पैक पढ़ नहीं पाए — चमक कम करके फिर कोशिश करें, या नाम लिखें।"));
    } catch (e) {
      setErr(t(lang, `Scan failed (${(e as Error).message}). Try Type / Speak.`, `स्कैन फेल (${(e as Error).message})। लिखें/बोलें आज़माएँ।`));
    } finally {
      setBusy(false);
    }
  };

  if (pickedRaw) {
    return <ConfirmAdd drug={pickedRaw} expiry={expiry} setExpiry={setExpiry} labels={labels} onBack={() => setPickedRaw(null)} onAdded={onDone} />;
  }

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      {!image ? (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50 py-10 text-center"
        >
          <span className="block text-4xl">📸</span>
          <span className="mt-2 block font-semibold text-emerald-800">
            {t(lang, "Photograph the strip", "स्ट्रिप की फ़ोटो लें")}
          </span>
          <span className="mt-1 block text-xs text-emerald-700">
            {t(lang, "Torn or half-covered packs are fine — we read every pocket.", "फटी/आधी छिपी स्ट्रिप भी चलेगी — हर पॉकेट पढ़ते हैं।")}
          </span>
        </button>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="captured strip" className="w-full max-h-56 object-contain rounded-2xl border border-slate-200" />
          <div className="mt-3 flex gap-2">
            <button onClick={() => fileRef.current?.click()} className="flex-1 rounded-xl bg-slate-100 py-3 font-medium">
              {t(lang, "Retake", "दोबारा")}
            </button>
            <button onClick={identify} disabled={busy} className="flex-1 rounded-xl bg-emerald-600 py-3 font-bold text-white disabled:opacity-50">
              {busy ? t(lang, "Reading…", "पढ़ रहे हैं…") : t(lang, "Identify", "पहचानें")}
            </button>
          </div>
        </>
      )}

      {err && <p className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">{err}</p>}

      {candidates.length > 0 && (
        <>
          <p className="mt-4 text-sm font-semibold text-slate-700">
            {t(lang, "Is it one of these? Tap to confirm", "इनमें से कौन सी है? दबाकर पुष्टि करें")}
          </p>
          <ul className="mt-2 space-y-2">
            {candidates.map((c, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    if (c.raw) setPickedRaw(c.raw);
                    else
                      addRaw({
                        id: crypto.randomUUID(),
                        drugId: null,
                        brand: c.brand,
                        form: "tablet",
                        salts: [],
                        classes: [],
                        purpose_en: c.purpose,
                        purpose_hi: c.purpose,
                        paoCategory: "none",
                      });
                    onDone?.();
                  }}
                  className="w-full text-left rounded-2xl border border-slate-200 p-3 hover:border-emerald-400"
                >
                  <span className="font-semibold">
                    {c.brand}{" "}
                    <span className="text-xs text-emerald-700 font-normal">{Math.round(c.confidence * 100)}% match</span>
                  </span>
                  <span className="block text-xs text-slate-500">{c.salts}</span>
                  {c.evidence.length > 0 && (
                    <span className="block mt-1 text-[10px] text-slate-400">“{c.evidence.slice(0, 2).join("”, “")}”</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

// ─── Prescription (Bedrock extraction + local deterministic matching) ────────

function RxTab() {
  const { lang, items } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [meds, setMeds] = useState<PrescribedItem[] | null>(null);
  const [matches, setMatches] = useState<PrescriptionMatch[] | null>(null);

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setErr(null);
    setMeds(null);
    setMatches(null);
    setImage(await fileToDataUrl(f));
  };

  const extract = async () => {
    if (!image) return;
    if (!API_URL || !online()) {
      setErr(t(lang, "Prescription reading needs internet.", "पर्चा पढ़ने के लिए इंटरनेट चाहिए।"));
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const res = await apiPrescription(image);
      setMeds(res.medicines);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const STATUS_STYLE: Record<PrescriptionMatch["status"], string> = {
    "owned-same-strength": "bg-emerald-50 border-emerald-300 text-emerald-900",
    "owned-different-strength": "bg-amber-50 border-amber-300 text-amber-900",
    "same-class-owned": "bg-amber-50 border-amber-300 text-amber-900",
    missing: "bg-slate-50 border-slate-300 text-slate-800",
  };
  const STATUS_ICON: Record<PrescriptionMatch["status"], string> = {
    "owned-same-strength": "✅",
    "owned-different-strength": "⚠️",
    "same-class-owned": "⚠️",
    missing: "🛒",
  };

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      {!image ? (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50 py-10 text-center"
        >
          <span className="block text-4xl">🩺</span>
          <span className="mt-2 block font-semibold text-sky-800">
            {t(lang, "Photograph the prescription", "पर्चे की फ़ोटो लें")}
          </span>
          <span className="mt-1 block text-xs text-sky-700">
            {t(lang, "We check it against your cabinet — no need to call anyone to double-check.", "हम आपकी कैबिनेट से मिलाते हैं — किसी को फ़ोन करके पूछने की ज़रूरत नहीं।")}
          </span>
        </button>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="prescription" className="w-full max-h-56 object-contain rounded-2xl border border-slate-200" />
          <div className="mt-3 flex gap-2">
            <button onClick={() => fileRef.current?.click()} className="flex-1 rounded-xl bg-slate-100 py-3 font-medium">
              {t(lang, "Retake", "दोबारा")}
            </button>
            <button onClick={extract} disabled={busy} className="flex-1 rounded-xl bg-sky-600 py-3 font-bold text-white disabled:opacity-50">
              {busy ? t(lang, "Reading…", "पढ़ रहे हैं…") : t(lang, "Read prescription", "पर्चा पढ़ें")}
            </button>
          </div>
        </>
      )}

      {err && <p className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">{err}</p>}

      {meds && !matches && (
        <>
          <p className="mt-4 text-sm font-semibold text-slate-700">
            {t(lang, "Medicines we read — edit any wrong salt, then match", "पढ़ी गई दवाइयाँ — ग़लत सॉल्ट ठीक करें, फिर मिलाएँ")}
          </p>
          <ul className="mt-2 space-y-2">
            {meds.map((m, i) => (
              <li key={i} className="rounded-2xl border border-slate-200 p-3">
                <p className="font-semibold">{m.rawText}</p>
                <input
                  value={m.salt ?? ""}
                  placeholder={t(lang, "salt (editable)", "सॉल्ट (संपादन योग्य)")}
                  onChange={(e) => setMeds(meds.map((x, j) => (j === i ? { ...x, salt: e.target.value } : x)))}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </li>
            ))}
          </ul>
          <button
            onClick={() => setMatches(matchPrescription(meds, items))}
            className="mt-4 w-full rounded-xl bg-sky-600 py-3.5 font-bold text-white"
          >
            {t(lang, "Match against my cabinet", "मेरी कैबिनेट से मिलाएँ")}
          </button>
        </>
      )}

      {matches && (
        <ul className="mt-4 space-y-2">
          {matches.map((m, i) => (
            <li key={i} className={`rounded-2xl border p-3 text-sm ${STATUS_STYLE[m.status]}`}>
              <p className="font-semibold">
                {STATUS_ICON[m.status]} {m.prescribed.rawText}
              </p>
              <p className="mt-0.5">{lang === "hi" ? m.message_hi : m.message_en}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
