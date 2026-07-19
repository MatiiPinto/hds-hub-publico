// ════════════════════════════════════════════════════════════════════════════
// sw.js — Service worker del HUB público HDS (GitHub Pages).
//
// Estrategia: stale-while-revalidate para GET del mismo origen — sirve al tiro
// lo cacheado (segunda visita instantánea, incluso sin señal) y refresca la
// copia en segundo plano; el próximo ingreso ya trae lo nuevo. Tras un deploy,
// la primera visita puede mostrar datos del deploy anterior: se actualiza solo.
//
// Para invalidar TODO el caché de los visitantes: subir la versión de CACHE.
// ════════════════════════════════════════════════════════════════════════════
const CACHE = 'hds-hub-publico-v1';

self.addEventListener('install', e => { self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const hit = await cache.match(req);
      const net = fetch(req).then(res => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
