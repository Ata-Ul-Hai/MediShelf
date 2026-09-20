"use client";

import { useEffect } from "react";

export default function SwRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      // updateViaCache: bypass HTTP cache for the SW script itself (static
      // hosting can't set Cache-Control headers like the old next.config did)
      navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).catch(() => {
        /* PWA installability is best-effort */
      });
    }
  }, []);
  return null;
}
