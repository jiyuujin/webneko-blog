importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/1594064b9c60521217b4.js",
    "revision": "f57c7ec6d04b540fb73b0d85e8b8a4a1"
  },
  {
    "url": "/_nuxt/17b111697c3495705512.js",
    "revision": "301ab2bfb62f58d22ddae8a0841a9ffc"
  },
  {
    "url": "/_nuxt/43b50b3fe77875ebe626.js",
    "revision": "40ef563f98d90d38bd7b180ab797817b"
  },
  {
    "url": "/_nuxt/443def79be360d2285da.js",
    "revision": "e3dfd82c2b160315f274ecfe6ba3af4f"
  },
  {
    "url": "/_nuxt/5b9098fd2e7177696dd9.js",
    "revision": "b99fe63d740309aaf34f3231850177de"
  },
  {
    "url": "/_nuxt/681da6330559749dfbec.js",
    "revision": "43c44039e640c997124979c3aec8b8d1"
  },
  {
    "url": "/_nuxt/6c3d7b53ac63126a240e.js",
    "revision": "9843cb210dce9c3f24697f33811484f3"
  },
  {
    "url": "/_nuxt/7178e0f0e9a92bf4cbc0.js",
    "revision": "91173ae55a4354b7fecff61bfbf53853"
  },
  {
    "url": "/_nuxt/742a99d9453f9fc66645.js",
    "revision": "95370efeb99c3eb53eb4cc6d1246e1e2"
  },
  {
    "url": "/_nuxt/7587b9ee248724e6c5fb.js",
    "revision": "92ecf4290dc222eaac34e15a18ed7dd4"
  },
  {
    "url": "/_nuxt/7808d7b0a3e2c12c065e.js",
    "revision": "2e47a9e096a9c422dc9bcd524f9397c1"
  },
  {
    "url": "/_nuxt/7987cf12c07dccdf5d4d.js",
    "revision": "731aa6c5ce4b0427c88694a5a47df1e6"
  },
  {
    "url": "/_nuxt/8e55890b5470f6abeecc.js",
    "revision": "14528711a72f028aff01a42b1c33c7c7"
  },
  {
    "url": "/_nuxt/8eb711f5a46426e441cc.js",
    "revision": "f8f7c9689fc7bf99c79abe8ac3f3d2c9"
  },
  {
    "url": "/_nuxt/8f42c22fd811aa4ba8a7.js",
    "revision": "4afef044d66a44fbc3196dd42da3b164"
  },
  {
    "url": "/_nuxt/9e194dd7c8e697173267.js",
    "revision": "cea25b99e6196d6d62f2c819e635a83f"
  },
  {
    "url": "/_nuxt/a65e4a2553eb0201a8bc.js",
    "revision": "478462cb8e6dd1f4404f979f7f8253c2"
  },
  {
    "url": "/_nuxt/aad5128c74712b6a6fa7.js",
    "revision": "146f08c8028e3788524ce6eafd82c4dc"
  },
  {
    "url": "/_nuxt/aca7f2f4f03a8eb30760.js",
    "revision": "be8fd72108914572b63b9daf35d02826"
  },
  {
    "url": "/_nuxt/afb2f920486ae14194d8.js",
    "revision": "8057b9becde1c4cbc831e21002ec0917"
  },
  {
    "url": "/_nuxt/bdaa0eff6f9964835666.js",
    "revision": "979abe3cc3631e08c283db1a47f410ea"
  },
  {
    "url": "/_nuxt/bf9f4728cfc1dd0bb119.js",
    "revision": "533aa16003fc9d7666b077b2b4f4cd4b"
  },
  {
    "url": "/_nuxt/c6f72c4681734b5986ee.js",
    "revision": "f5198d39a48122cd6f27f495d1f5ea0f"
  },
  {
    "url": "/_nuxt/c71b7837c1261add0891.js",
    "revision": "32f62f5b94b15ee146fab0879d6ab2cc"
  },
  {
    "url": "/_nuxt/ca5c41a043804266a85c.js",
    "revision": "c2a8b629cd5789b458fe38b81d24b7f8"
  },
  {
    "url": "/_nuxt/d8126880d11653f65f1e.js",
    "revision": "4299b54830a498b697ce60be7f331575"
  },
  {
    "url": "/_nuxt/e317c291cbce8b3ff625.js",
    "revision": "c8ce8d5a566c734f755ea9bfd35b2c63"
  },
  {
    "url": "/_nuxt/ec5d28a2a64567a8a80a.js",
    "revision": "7962345323dffb4390f4b842caca3fa1"
  },
  {
    "url": "/_nuxt/ed0df12a06ac4dc7b915.js",
    "revision": "eb4c30e00aaae157a5311211e2e90d23"
  },
  {
    "url": "/_nuxt/fb5ac61ad96e874ba0b6.js",
    "revision": "04e2bee2a96e110c857bc4134f9da4c4"
  },
  {
    "url": "/_nuxt/fde7d2218da7fb0258b9.js",
    "revision": "e512150037d61f10abc7938523f90cbf"
  }
], {
  "cacheId": "webneko-blog-ver2",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
