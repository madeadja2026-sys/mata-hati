const CACHE='mata-hati-v8-1';
const CORE=['./','./index.html','./manifest.webmanifest','./cms-config.js','./icon-192.png','./icon-512.png','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const request=event.request;
 event.respondWith(
  caches.match(request).then(cached=>{
   if(cached)return cached;
   return fetch(request).then(response=>{
    if(response && response.ok){
     const copy=response.clone();
     caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});
    }
    return response;
   }).catch(()=>caches.match('./index.html'));
  })
 );
});
