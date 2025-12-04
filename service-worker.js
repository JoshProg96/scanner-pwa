self.addEventListener("install", (event) => {
    // Skip waiting agar SW langsung aktif
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    // bersihkan SW lama
    event.waitUntil(clients.claim());
});

// NO FETCH HANDLER → tidak intercept kamera
// sangat penting agar kamera TIDAK terkena cache PWA
