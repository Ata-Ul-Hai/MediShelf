"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, ShieldCheck, Plus } from "lucide-react";
import { useStore } from "@/lib/store";
import AddSheet from "./AddSheet";
import { t } from "./i18n";

/**
 * Floating pill navigation: Cabinet · Add (raised) · Alerts.
 * Rendered on top-level pages only — detail pages use back headers.
 */
export default function BottomNav() {
  const { report, lang } = useStore();
  const pathname = usePathname();
  const [sheet, setSheet] = useState(false);

  const dangerCount =
    report.stacks.filter((s) => s.severity === "danger").length +
    report.expiryFlags.filter((f) => f.severity === "danger").length;

  const tab = (active: boolean) =>
    `flex flex-col items-center gap-0.5 py-2 text-[10px] font-bold tracking-wide transition-colors ${
      active ? "text-teal" : "text-mist hover:text-ink"
    }`;

  return (
    <>
      <nav className="fixed bottom-4 inset-x-4 z-40 grid grid-cols-3 items-center h-[62px] rounded-[24px] border border-line bg-white/95 shadow-[0_10px_34px_rgba(34,32,28,0.16)] backdrop-blur px-2">
        <Link href="/" className={tab(pathname === "/")}>
          <House size={20} strokeWidth={2.1} />
          {t(lang, "CABINET", "कैबिनेट")}
        </Link>

        <button
          onClick={() => setSheet(true)}
          aria-label={t(lang, "Add medicine", "दवा जोड़ें")}
          className="mx-auto -mt-9 grid h-[58px] w-[58px] place-items-center rounded-full bg-gradient-to-b from-teal to-teal-deep text-white shadow-[0_10px_24px_rgba(14,94,84,0.45)] ring-4 ring-paper transition-transform active:scale-95"
        >
          <Plus size={27} strokeWidth={2.6} />
        </button>

        <Link href="/alerts" className={`${tab(pathname === "/alerts")} relative`}>
          <span className="relative">
            <ShieldCheck size={20} strokeWidth={2.1} />
            {dangerCount > 0 && (
              <span className="absolute -top-1.5 -right-2 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[9px] font-extrabold text-white">
                {dangerCount}
              </span>
            )}
          </span>
          {t(lang, "SAFETY", "सुरक्षा")}
        </Link>
      </nav>

      {sheet && <AddSheet onClose={() => setSheet(false)} />}
    </>
  );
}
