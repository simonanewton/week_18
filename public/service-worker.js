const FILES_TO_CACHE = [
	"/",
	"/index.html",
	"/assets/css/styles.css",
	"/dist/icon_96x96.png",
	"/dist/icon_128x128.png",
	"/dist/icon_192x192.png",
	"/dist/icon_256x256.png",
	"/dist/icon_384x384.png",
	"/dist/icon_512x512.png",
	"/dist/index.bundle.js",
	"/dist/manifest.json"
];

const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(PRECACHE)
			.then(cache => cache.addAll(FILES_TO_CACHE))
			.then(self.skipWaiting())
	);
});

self.addEventListener("activate", event => {
	const currentCaches = [PRECACHE, RUNTIME];
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
		}).then(cachesToDelete => {
			return Promise.all(cachesToDelete.map(cacheToDelete => {
				return caches.delete(cacheToDelete);
			}));
		}).then(() => self.clients.claim())
	);
});

self.addEventListener("fetch", event => {
	if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			caches.match(event.request).then(cachedResponse => {
				if (cachedResponse) {
					return cachedResponse;
				}

				return caches.open(RUNTIME).then(cache => {
					return fetch(event.request).then(response => {
						return cache.put(event.request, response.clone()).then(() => {
							return response;
						});
					});
				});
			})
		);
	}
});
