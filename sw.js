const cacheName = 'sharif-pharma-v3';
const assets = [
  './',
  './index.html',
  './settings.html',
  './store.html',
  './history.html',
  './order.html',
  './style.css',
  './config.js',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// ফাইলগুলো ফোনে সেভ করা
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

// অফলাইনে ফাইলগুলো পরিবেশন করা
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

// পুরনো ফাইল মুছে ফেলা
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== cacheName).map(key => caches.delete(key))
    ))
  );
});
