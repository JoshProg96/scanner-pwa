// SAFE SERVICE WORKER FOR QR SCANNER
const CACHE_NAME = "scanner-cache-v1";
const ASSETS = [
  "/scanner-pwa/icon-192.png",
  "/scanner-pwa/icon-512.png",
  "/scanner-pwa/manifest.json"
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// ONLINE-FIRST for HTML + JS (IMPORTANT!!!)
self.addEventListener("fetch", event => {
  const req = event.request;

  // NEVER cache HTML or JS → required for camera permission
  if (req.destination === "document" || req.destination === "script") {
    event.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
    return;
  }

  // Icons / manifest → cache-first
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});
