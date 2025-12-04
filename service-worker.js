// Disable cache for HTML/JS (avoid camera block)
self.addEventListener("fetch", e => {
  const req = e.request;

  if (req.destination === "document" || req.destination === "script") {
    e.respondWith(fetch(req));
    return;
  }

  // cache icons only
  e.respondWith(
    caches.open("qr-cache").then(cache =>
      cache.match(req).then(res => res || fetch(req).then(f => {
        cache.put(req, f.clone());
        return f;
      }))
    )
  );
});
