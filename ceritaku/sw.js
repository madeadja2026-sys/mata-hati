const CACHE='ceritaku-studio-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('ceritaku-studio-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;event.respondWith(caches.match(req).then(cached=>{if(cached)return cached;return fetch(req).then(response=>{if(response&&response.ok&&req.url.startsWith(self.registration.scope)){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy))}return response}).catch(()=>caches.match('./index.html'))}))});
