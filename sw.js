var version = '1.1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(version).then(function(cache) {
//       return cache.addAll([
//         '/sw-test/',
//         '/sw-test/index.html',
//         '/sw-test/style.css',
//         '/sw-test/app.js',
//         '/sw-test/image-list.js',
//         '/sw-test/star-wars-logo.jpg',
//         '/sw-test/gallery/',
//         '/sw-test/gallery/bountyHunters.jpg',
//         '/sw-test/gallery/myLittleVader.jpg',
//         '/sw-test/gallery/snowTroopers.jpg'
//       ]);
      return;
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+event.request.url);
      return r || fetch(event.request).then(function(response) {
          return caches.open(version).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+event.request.url);
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if(version.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
