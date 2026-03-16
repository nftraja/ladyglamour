const CACHE_NAME = "ladyglamour-v1";

const urlsToCache = [
"/",
"/index.html",
"/style.css",
"/app.js"
];

self.addEventListener("install", event => {

event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))
);

});

self.addEventListener("activate", event => {

event.waitUntil(
caches.keys().then(keys => {
return Promise.all(
keys.map(key => {
if(key !== CACHE_NAME){
return caches.delete(key);
}
})
);
})
);

});

self.addEventListener("fetch", event => {

if(event.request.mode === "navigate"){

event.respondWith(
fetch(event.request).catch(() => caches.match("/index.html"))
);

return;

}

event.respondWith(

caches.match(event.request)
.then(response => {
return response || fetch(event.request);
})

);

});