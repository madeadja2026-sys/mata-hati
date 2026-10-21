const CACHE='mata-hati-v10-light';
const CORE=['./','./index.html','./manifest.webmanifest','./cms-config.js','./icon-192.png','./icon-512.png','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mata-hati-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const r=e.request;if(r.mode==='navigate'){e.respondWith(fetch(r).then(v=>{if(v.ok)caches.open(CACHE).then(c=>c.put('./index.html',v.clone())).catch(()=>{});return v}).catch(()=>caches.match('./index.html')));return}e.respondWith(caches.match(r).then(v=>v||fetch(r).then(n=>{if(n.ok)caches.open(CACHE).then(c=>c.put(r,n.clone())).catch(()=>{});return n}).catch(()=>caches.match('./index.html'))))});
