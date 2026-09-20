"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
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
    <main className="mx-auto w-full max-w-lg px-4 pt-4 pb-16">
      <Link href="/" className="text-emerald-700 font-semibold">
        ← {t(lang, "Cabinet", "कैबिनेट")}
      </Link>

      <div className={`mt-4 rounded-2xl p-5 ${stack?.severity === "danger" ? "bg-red-600 text-white" : "bg-amber-500 text-white"}`}>
        <p className="text-xs font-bold uppercase tracking-wide opacity-90">
          {t(lang, "Duplicate salt", "एक ही सॉल्ट")}
        </p>
        <h1 className="mt-1 text-2xl font-black capitalize">{key}</h1>
        {stack?.combinedDoseMg && (
          <p className="mt-2 text-sm">
            {t(
              lang,
              `One dose of each product = ${stack.combinedDoseMg} mg${limit?.maxDailyMg ? ` · adult daily cap ${limit.maxDailyMg} mg` : ""}`,
              `हर दवा की एक खुराक = ${stack.combinedDoseMg} मिग्रा${limit?.maxDailyMg ? ` · वयस्क दैनिक सीमा ${limit.maxDailyMg} मिग्रा` : ""}`
            )}
          </p>
        )}
        {limit && (
          <p className="mt-2 text-sm opacity-95">{lang === "hi" ? limit.note_hi : limit.note_en}</p>
        )}
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-700">
        {t(lang, "Products in your cabinet with this salt", "आपकी कैबिनेट में यह सॉल्ट रखने वाली दवाइयाँ")}
      </p>
      <ul className="mt-2 space-y-2">
        {members.map((m) => (
          <li key={m.id}>
            <Link href={`/item?id=${m.id}`} className="block rounded-2xl bg-white border border-slate-200 p-4">
              <p className="font-bold">{m.brand}</p>
              <p className="text-xs text-slate-500">
                {m.salts
                  .filter((s) => normalizeSalt(s.name) === key)
                  .map((s) => `${s.name} ${s.strengthMg ? `${s.strengthMg} mg` : s.strengthText ?? ""}`)
                  .join(", ")}
              </p>
              <p className="mt-1 text-xs text-slate-600">{lang === "hi" ? m.purpose_hi || m.purpose_en : m.purpose_en}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
