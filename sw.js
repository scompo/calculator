/* global caches, self, fetch */

const CURRENT_VERSION = 'v0.0.5'

console.log('current version:', CURRENT_VERSION)

self.addEventListener('install', e => {
  console.log('installing...')
  e.waitUntil(caches.open(CURRENT_VERSION)
    .then(cache => {
      return cache.addAll([
        '/calculator/',
        '/calculator/index.html',
        '/calculator/style.css',
        '/calculator/main.js',
        '/calculator/icon.png',
        '/calculator/modules/calculator.js'
      ])
    })
  )
})

self.addEventListener('activate', e => {
  console.log('activating...')
  e.waitUntil(
    caches.keys().then(keyList => {
      console.log('keys', keyList)
      return Promise.all(keyList.map(key => {
        if (CURRENT_VERSION !== key) {
          console.log('deleting cache:', key)
          return caches.delete(key)
        } else {
          return Promise.resolve()
        }
      }))
    })
  )
})

self.addEventListener('fetch', e => {
  console.log('fetch:', e.request.url)
  e.respondWith(caches.match(e.request).then(response => {
    return response || fetch(e.request)
  }))
})
