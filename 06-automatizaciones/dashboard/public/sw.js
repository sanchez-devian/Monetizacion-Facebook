const CACHE_NAME = 'monetizafb-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Never intercept Auth0 or API routes
  if (url.pathname.startsWith('/auth') || url.pathname.startsWith('/api')) {
    return;
  }
  event.respondWith(fetch(event.request));
});
