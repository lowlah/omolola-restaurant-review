const cacheName = 'v1';
/*const cacheAllFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];*/

// calls Install event
self.addEventListener("install", e => {
    //console.log('service worker installed');

   /* e.waitUntil(
        caches
          .open(cacheName)
          .then(cache => {
            console.log('Service worker caching files');
            cache.addAll(cacheAllFiles);
          })
          .then(() => self.skipWaiting())
    );*/
});

// calls Activate event
self.addEventListener("activate", e => {
    //console.log('service worker activated');
    // removes unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
              cacheNames.map(cache => {
                  if (cache !== cacheName) {
                       console.log("Service Worker: Clearing Old Cache");
                       return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// calls fetch event
self.addEventListener("fetch", e => {
    //console.log("Service Worker: Fetching");
    e.respondWith (
      fetch(e.request)
        .then(res => {
          const resClone = res.clone();
          caches.open(cacheName).then(cache => {
              cache.put(e.request, resClone);
            });
          return res;
        })
        .catch(err =>
          caches.match(e.request).then(res => res)
        )
    );
});