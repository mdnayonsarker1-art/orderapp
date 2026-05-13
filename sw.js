const cacheName = 'sharif-pharma-v5'; // ভার্সন আপডেট করা হয়েছে
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
  './logo.png', // আপনার সংশোধন অনুযায়ী লোগো যুক্ত করা হয়েছে
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

// ইনস্টল ইভেন্ট: সব অ্যাসেট ক্যাশ করা
self.addEventListener('install', e => {
  self.skipWaiting(); // নতুন সার্ভিস ওয়ার্কারকে সাথে সাথে একটিভ হতে সাহায্য করবে
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching shell assets');
      return cache.addAll(assets);
    })
  );
});

// এক্টিভেট ইভেন্ট: পুরনো ক্যাশ ডিলিট করা
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// ফেচ ইভেন্ট: ক্যাশ ফার্স্ট স্ট্রেটেজি
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      // যদি ক্যাশে থাকে তবে ক্যাশ থেকে দেবে, নয়তো নেটওয়ার্ক থেকে আনবে
      return cacheRes || fetch(e.request).then(fetchRes => {
        return caches.open(cacheName).then(cache => {
          // নতুন কোনো রিকোয়েস্ট হলে তা ভবিষ্যতে ব্যবহারের জন্য ক্যাশ করে রাখা (অপশনাল)
          if (e.request.url.startsWith('http')) {
            cache.put(e.request.url, fetchRes.clone());
          }
          return fetchRes;
        });
      });
    }).catch(() => {
      // যদি অফলাইনে থাকে এবং ক্যাশে ফাইলটি না থাকে
      if (e.request.url.indexOf('.html') > -1) {
        return caches.match('./index.html');
      }
    })
  );
});
