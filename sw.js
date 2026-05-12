const cacheName = 'sharif-pharma-v2';
const assets = [
  './',
  './index.html',
  './settings.html',
  './store.html',
  './history.html',
  './style.css',
  './config.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// ইনস্টল করার সময় ফাইলগুলো ক্যাশে জমা করা
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// অফলাইনে কাজ করার জন্য ফেচিং লজিক
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      // যদি ক্যাশে ফাইল থাকে তবে ক্যাশ থেকেই দিবে, নাহলে ইন্টারনেট থেকে লোড করবে
      return response || fetch(e.request);
    })
  );
});

// পুরনো ক্যাশ ডিলিট করা
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)));
    })
  );
});
