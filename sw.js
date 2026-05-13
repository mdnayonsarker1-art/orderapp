const cacheName = 'sharif-pharma-v7'; // ভার্সন পরিবর্তন করা হয়েছে
const assets = [
  './',
  'index.html',
  'settings.html',
  'store.html',
  'history.html',
  'order.html',
  'style.css',
  'config.js',
  'manifest.json',
  'logo.png', // নিশ্চিত করুন এই নামে ইমেজ ফাইলটি আপনার ফোল্ডারে আছে
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

// ইনস্টল ইভেন্ট
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// একটিভেট ইভেন্ট: পুরনো ক্যাশ মুছে ফেলা
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// ফেচ ইভেন্ট: অফলাইনে ফাইল সরবরাহ করা
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    }).catch(() => {
      if (e.request.url.includes('.html')) {
        return caches.match('index.html');
      }
    })
  );
});
