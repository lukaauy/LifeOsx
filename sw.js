const V='lifeos-v2',L='https://cdnjs.cloudflare.com/ajax/libs/lucide/0.383.0/umd/lucide.min.js';
const F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(async c=>{await c.addAll(F);try{await c.put(L,await fetch(L,{mode:'no-cors'}))}catch(_){}}).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(h=>{const n=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque'))caches.open(V).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>h||caches.match('index.html'));return h||n}))});
