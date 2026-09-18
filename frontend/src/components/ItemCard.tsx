"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { t } from "./i18n";
import { itemStatus } from "./SafetyBanner";

const RING: Record<"danger" | "warning" | "ok", string> = {
  danger: "ring-2 ring-red-400",
  warning: "ring-2 ring-amber-300",
  ok: "ring-1 ring-slate-200",
};

const DOT: Record<"danger" | "warning" | "ok", string> = {
  danger: "bg-red-500",
  warning: "bg-amber-400",
  ok: "bg-emerald-500",
};

const FORM_ICON: Record<string, string> = {
  tablet: "💊", capsule: "💊", syrup: "🧴", suspension: "🧴", drops: "💧",
  cream: "🧴", ointment: "🧴", gel: "🧴", injection: "💉", inhaler: "🫁",
  sachet: "📦", lozenge: "🍬",
};

export default function ItemCard({ id }: { id: string }) {
  const { itemById, report, lang } = useStore();
  const item = itemById(id);
  if (!item) return null;
  const status = itemStatus(item, report);

  return (
    <Link
      href={`/item/${item.id}`}
      className={`block rounded-2xl bg-white p-3 shadow-sm hover:shadow-md transition ${RING[status]}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl leading-none">{FORM_ICON[item.form] ?? "💊"}</span>
        <span className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${DOT[status]}`} />
      </div>
      <p className="mt-2 font-semibold text-sm leading-tight">{item.brand}</p>
      <p className="mt-0.5 text-[11px] text-slate-500 leading-tight line-clamp-2">
        {item.salts
          .map((s) => `${s.name}${s.strengthText ? ` ${s.strengthText}` : s.strengthMg ? ` ${s.strengthMg}mg` : ""}`)
          .join(" + ")}
      </p>
      <p className="mt-1 text-[11px] text-slate-600 leading-tight line-clamp-2">
        {lang === "hi" ? item.purpose_hi || item.purpose_en : item.purpose_en}
      </p>
      {item.openedOn && (
        <p className="mt-1 text-[10px] font-medium text-amber-600">
          {t(lang, "opened", "खोली")}: {item.openedOn}
        </p>
      )}
    </Link>
  );
}
