"use client";

import Link from "next/link";
import {
  Pill,
  FlaskConical,
  Droplets,
  Bandage,
  Syringe,
  Wind,
  Package,
  Candy,
  CircleAlert,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useStore } from "@/lib/store";
import { t } from "./i18n";
import type { CabinetItem } from "@medishelf/shared";

const FORM_ICON: Record<string, LucideIcon> = {
  tablet: Pill,
  capsule: Pill,
  syrup: FlaskConical,
  suspension: FlaskConical,
  drops: Droplets,
  cream: Bandage,
  ointment: Bandage,
  gel: Bandage,
  injection: Syringe,
  inhaler: Wind,
  sachet: Package,
  lozenge: Candy,
};

const TONE: Record<"danger" | "warning" | "ok", { chip: string; ring: string }> = {
  danger: { chip: "bg-danger-soft text-danger", ring: "ring-1 ring-danger/35" },
  warning: { chip: "bg-warn-soft text-warn", ring: "ring-1 ring-warn/35" },
  ok: { chip: "bg-teal-soft text-teal", ring: "ring-1 ring-line" },
};

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

export default function ItemCard({ id }: { id: string }) {
  const { itemById, report, lang } = useStore();
  const item = itemById(id);
  if (!item) return null;
  const status = itemStatus(item, report);
  const Icon = FORM_ICON[item.form] ?? Pill;
  const tone = TONE[status];

  return (
    <Link
      href={`/item?id=${item.id}`}
      className={`block rounded-[20px] bg-white p-3.5 shadow-[0_1px_2px_rgba(34,32,28,0.05)] transition hover:shadow-[0_6px_20px_rgba(34,32,28,0.09)] ${tone.ring}`}
    >
      <div className={`grid h-9 w-9 place-items-center rounded-[12px] ${tone.chip}`}>
        <Icon size={18} strokeWidth={2} />
      </div>
      <p className="mt-2.5 text-[13.5px] font-bold leading-tight tracking-tight">{item.brand}</p>
      <p className="mt-1 text-[10.5px] font-medium leading-snug text-mist line-clamp-2">
        {item.salts
          .map((s) => `${s.name}${s.strengthText ? ` ${s.strengthText}` : s.strengthMg ? ` ${s.strengthMg}mg` : ""}`)
          .join(" + ")}
      </p>
      <p className="mt-1.5 text-[10.5px] leading-snug text-ink/65 line-clamp-2">
        {lang === "hi" ? item.purpose_hi || item.purpose_en : item.purpose_en}
      </p>
      {item.openedOn && (
        <p className="mt-1.5 flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wide text-warn">
          <CircleAlert size={10} strokeWidth={2.4} />
          {t(lang, "opened", "खोली")} {item.openedOn}
        </p>
      )}
    </Link>
  );
}
