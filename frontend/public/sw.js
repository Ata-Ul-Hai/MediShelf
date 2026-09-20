// MediShelf service worker — app-shell cache so the PWA opens offline.
// Strategy: documents network-first (always fresh HTML when online, cache as
// offline fallback — avoids stale-HTML/mismatched-chunk issues), immutable
// /_next/static assets cache-first. Cabinet data lives in IndexedDB and the
// drug index is bundled in the JS chunks.
const CACHE = "medishelf-v4";
const SHELL = ["/", "/manifest.webmanifest", "/icon.svg"];

/** Cache the root document + every /_next/static asset it references (JS AND
 * CSS — without the CSS the offline shell renders unstyled), so the shell
 * hydrates fully even if the SW activated mid-page-load. */
async function warmCache(cache) {
  try {
    const res = await fetch("/", { cache: "no-cache" });
    if (!res.ok) return;
    await cache.put("/", res.clone());
    const html = await res.text();
    const assetUrls = [...new Set(html.match(/\/_next\/static\/[^"'\s)<>]+\.(js|css)/g) ?? [])];
    await Promise.allSettled(assetUrls.map((u) => cache.add(u)));
  } catch {
    /* offline during warm-up — the runtime cache-first handler fills the rest */
  }
}

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => caches.open(CACHE))
      .then(warmCache)
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;

  if (e.request.mode === "navigate" || e.request.destination === "document") {
    // network-first with offline fallback to the cached shell
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res.ok) caches.open(CACHE).then((c) => c.put(e.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(e.request).then((c) => c ?? caches.match("/")))
    );
    return;
  }

  // static assets: cache-first, background refresh
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request)
        .then((res) => {
          if (res.ok) caches.open(CACHE).then((c) => c.put(e.request, res.clone()));
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
