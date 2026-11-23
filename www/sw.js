const C = 'fieldscout-v2';   // bump to replace every cached file
const SHELL = ['./', 'index.html', 'styles.css', 'app.js', 'manifest.webmanifest', 'icon-512.png',
  'vendor/leaflet.js', 'vendor/leaflet.css', 'vendor/turf.min.js', 'vendor/togeojson.umd.js', 'vendor/jszip.min.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return; // map tiles are cached in IndexedDB by the app
  if (u.pathname.includes('/media/') || e.request.headers.has('range')) return; // video: streamed, not cached
  // Network first, revalidating with the server ('no-cache') so a new version shows up on the next
  // launch instead of a copy the browser kept for 10 minutes; the cache is only the offline fallback.
  const fresh = e.request.mode === 'navigate'
    ? new Request(e.request.url, { cache: 'no-cache', credentials: 'same-origin' })
    : new Request(e.request, { cache: 'no-cache' });
  e.respondWith(fetch(fresh).then(r => { if (r.ok) { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); } return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true })));
});
