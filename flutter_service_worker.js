'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "fc7ceee456af37cbe9a21d40011f1a14",
"assets/assets/avatar/hao.png": "b3fbd3f4c351200f546f75395a6ba8b2",
"assets/assets/avatar/liu.png": "8b1fb444731e9ff41885f0fb40041902",
"assets/assets/avatar/yuki.png": "96bd5efc72aacb64f566947885e8a89b",
"assets/assets/avatar/zelin.png": "ae56bc09882e6014db30267414dc42d5",
"assets/assets/fonts/youj/FZYouHJW_501L.TTF": "6903ee624a7d387f1219383259bd8e15",
"assets/assets/fonts/youj/FZYouHJW_502L.TTF": "66b166c6486f73261e706bdb4190a88a",
"assets/assets/fonts/youj/FZYouHJW_504L.TTF": "87c5369135ad897638950c3dbf01f79c",
"assets/assets/fonts/youj/FZYouHJW_506L.TTF": "dbc9074c313c5cf0545d3e39806ef85d",
"assets/assets/fonts/youj/FZYouHJW_508R.TTF": "8d565b5e3feb6ab5539020eb54507686",
"assets/assets/fonts/youj/FZYouHJW_509R.TTF": "5feccd17c16a5450d51a3d05af958a65",
"assets/assets/fonts/youj/FZYouHJW_510M.TTF": "e211b6954d481f727c792963b2518434",
"assets/assets/fonts/youj/FZYouHJW_512B.TTF": "62d6ead6c720bbb1ae6af0311c233a73",
"assets/assets/fonts/youj/FZYouHJW_513B.TTF": "ab33ff154fd481c4ff7787db1238247b",
"assets/assets/images/avatar_default.png": "6d7a8d509be59100ec749b9ea8ab81e7",
"assets/assets/images/coffee_paperclips_pencil_angled_bw_w1080.jpg": "9f499cf53bb008afe9f6bd89deba9c52",
"assets/assets/images/faceMassager.png": "4648802abb005800997409ff6fb1ff66",
"assets/assets/images/iphone_cactus_tea_overhead_bw_w1080.jpg": "319249e756f3a470d45841baea9d1132",
"assets/assets/images/joy_note_coffee_eyeglasses_overhead_bw_w1080.jpg": "f014b7b75e442ae187976761117acc17",
"assets/assets/images/lightbulb.png": "2d94a128983a1610a0761ea7d02bb88c",
"assets/assets/images/milestones.png": "29d4229ebf387efe4fdbeefa54ec4938",
"assets/assets/images/mugs_side_bw_w1080.jpg": "7ac1959d3b134bbcef006780161606f7",
"assets/assets/images/paper_flower_overhead_bw_w1080.jpg": "1bed4aefd73a600a585112a77c250a6c",
"assets/assets/images/poll.jpg": "0368393eb692aceeb0d3751e2e8e6bb7",
"assets/assets/images/rn-v2.24.jpg": "86a6765f4d38fe712c9d6fe688b747df",
"assets/assets/images/rnb-v0.1.gif": "c1bb8e4627e146acd0add6506d4051cf",
"assets/assets/images/typewriter_overhead_bw_w1080.jpg": "39e8f60e5bb2b90a5d801dd4617e7927",
"assets/assets/images/vrpp.png": "861c974b81a369ea2a19b6b85e2a53fe",
"assets/assets/images/women.jpg": "70a8247e2083a7ee660095a2eb63f90f",
"assets/assets/videos/rnb-v0.1.mp4": "31559047cce63a96509bd5bdd5b3e436",
"assets/FontManifest.json": "73ab4320fbfc6d4ac5cdd40815213e42",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "b0bf1779052806b67044d94b28736c97",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"favicon.ico": "39392d0fec0e512123e5b4d6f4f07397",
"icons/Icon-192.png": "0a3927e05a11576010290fd981613b71",
"icons/Icon-512.png": "66771ef4c05c6118a6be90b18062242e",
"index.html": "f6117e8b59a93251c574bea588596a4e",
"/": "f6117e8b59a93251c574bea588596a4e",
"main.dart.js": "498871e88aa1eac081e70b115d2e7fa1",
"manifest.json": "f435a8a194c8db905e2a2efcb0e179c2",
"Minimal-Favicon.png": "53ef064700223dbe2e8e9cb49ad7d814",
"version.json": "724bc1b26bb9745d2c0dfe631f5c348e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
