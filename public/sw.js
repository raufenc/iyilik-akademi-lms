const CACHE_NAME = 'iyilik-akademi-v3'
const BASE = '/iyilikakademi/'

// Install: skip waiting immediately
self.addEventListener('install', () => {
  self.skipWaiting()
})

// Activate: delete ALL old caches, claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  )
})

// Fetch: network-first for everything (cache as fallback only)
self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // Skip external requests
  if (!url.pathname.startsWith(BASE) && url.origin === self.location.origin) return
  if (url.origin !== self.location.origin) return

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses for offline fallback
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone)
          })
        }
        return response
      })
      .catch(() => {
        // Offline: try cache
        return caches.match(request).then((cached) => {
          if (cached) return cached
          if (request.mode === 'navigate') {
            return caches.match(BASE + 'index.html')
          }
          return new Response('Offline', { status: 503 })
        })
      })
  )
})
