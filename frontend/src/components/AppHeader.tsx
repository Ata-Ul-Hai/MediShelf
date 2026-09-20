"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import Wave from "./Wave";

/**
 * Wavy page header. `home` variant carries the brand + status chip + language
 * toggle; `back` variant is the detail-page header.
 */
export default function AppHeader({
  variant,
  title,
  subtitle,
  children,
}: {
  variant: "home" | "back" | "plain";
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  if (variant === "back") {
    return (
      <header className="bg-teal-deep text-white">
        <div className="flex items-center gap-1 px-3 pt-4 pb-3">
          <Link
            href="/"
            aria-label="back"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <span className="ml-1 text-sm font-bold tracking-wide">{title}</span>
          {children && <div className="ml-auto">{children}</div>}
        </div>
        <Wave />
      </header>
    );
  }

  return (
    <header className="relative overflow-hidden bg-teal-deep text-white">
      {/* drifting blobs for the wavy, organic feel */}
      <div aria-hidden className="pointer-events-none absolute -top-16 -left-14 h-48 w-48 rounded-full bg-white/[0.07] blob" />
      <div aria-hidden className="pointer-events-none absolute -top-8 right-[-3rem] h-44 w-44 rounded-full bg-white/[0.05] blob" style={{ animationDelay: "-3s" }} />
      <div aria-hidden className="pointer-events-none absolute top-24 left-1/3 h-24 w-24 rounded-full bg-white/[0.04] blob" style={{ animationDelay: "-1.5s" }} />

      <div className="relative flex items-center justify-between px-5 pt-6 pb-3">
        <div>
          {subtitle ? (
            <>
              <h1 className="text-[26px] font-extrabold leading-none tracking-tight">{title}</h1>
              <p className="mt-1.5 text-[11px] font-medium text-white/70">{subtitle}</p>
            </>
          ) : (
            <h1 className="text-[26px] font-extrabold leading-none tracking-tight">{title}</h1>
          )}
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
      <Wave />
    </header>
  );
}
