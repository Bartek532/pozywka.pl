if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>a(e,i),d={module:{uri:i},exports:r,require:t};s[i]=Promise.all(c.map((e=>d[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts("fallback-JjImZUX0q9GBsL-1W_t2k.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/JjImZUX0q9GBsL-1W_t2k/_buildManifest.js",revision:"b3b2836c44362d1734d57c8f9d1cf808"},{url:"/_next/static/JjImZUX0q9GBsL-1W_t2k/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/185.cbe2e3cfccac936e.js",revision:"cbe2e3cfccac936e"},{url:"/_next/static/chunks/188-584f450f540600bc.js",revision:"584f450f540600bc"},{url:"/_next/static/chunks/194.de4ea75dd4766fb6.js",revision:"de4ea75dd4766fb6"},{url:"/_next/static/chunks/233.c7a39c7240a33235.js",revision:"c7a39c7240a33235"},{url:"/_next/static/chunks/274-3e0e42aa08451cd8.js",revision:"3e0e42aa08451cd8"},{url:"/_next/static/chunks/389-4f3d4e56a0c54872.js",revision:"4f3d4e56a0c54872"},{url:"/_next/static/chunks/464.fdbf320af77bce8e.js",revision:"fdbf320af77bce8e"},{url:"/_next/static/chunks/495.c759304a9afa8666.js",revision:"c759304a9afa8666"},{url:"/_next/static/chunks/516.d37ed292553434cb.js",revision:"d37ed292553434cb"},{url:"/_next/static/chunks/517.38f1ad5e93b64a52.js",revision:"38f1ad5e93b64a52"},{url:"/_next/static/chunks/525.67296751d1f49a9f.js",revision:"67296751d1f49a9f"},{url:"/_next/static/chunks/529-c57206316dc92316.js",revision:"c57206316dc92316"},{url:"/_next/static/chunks/531-7da8ba4ef31fa65e.js",revision:"7da8ba4ef31fa65e"},{url:"/_next/static/chunks/554.ff956dd12efde644.js",revision:"ff956dd12efde644"},{url:"/_next/static/chunks/557.18fd19c5417e9bbe.js",revision:"18fd19c5417e9bbe"},{url:"/_next/static/chunks/653.fc8891f5c417a5b4.js",revision:"fc8891f5c417a5b4"},{url:"/_next/static/chunks/675-fef60e83a42c8d83.js",revision:"fef60e83a42c8d83"},{url:"/_next/static/chunks/972-1e215c743c787302.js",revision:"1e215c743c787302"},{url:"/_next/static/chunks/98.1b912290dfdaa231.js",revision:"1b912290dfdaa231"},{url:"/_next/static/chunks/framework-4556c45dd113b893.js",revision:"4556c45dd113b893"},{url:"/_next/static/chunks/main-d2adeff4771f81fd.js",revision:"d2adeff4771f81fd"},{url:"/_next/static/chunks/pages/%5Bcategory%5D-9ebfc2b8f50ad349.js",revision:"9ebfc2b8f50ad349"},{url:"/_next/static/chunks/pages/%5Bcategory%5D/%5Bslug%5D-bc92a07bb2c7b04b.js",revision:"bc92a07bb2c7b04b"},{url:"/_next/static/chunks/pages/404-74c31aefb9d9d44e.js",revision:"74c31aefb9d9d44e"},{url:"/_next/static/chunks/pages/_app-3dd616f5c61e9446.js",revision:"3dd616f5c61e9446"},{url:"/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js",revision:"a4ba2246ff8fb532"},{url:"/_next/static/chunks/pages/_offline-e4c589eb2a916da5.js",revision:"e4c589eb2a916da5"},{url:"/_next/static/chunks/pages/index-c22c7b1825503ccc.js",revision:"c22c7b1825503ccc"},{url:"/_next/static/chunks/pages/o-mnie-9f9c2b866c36dd83.js",revision:"9f9c2b866c36dd83"},{url:"/_next/static/chunks/pages/polityka-prywatnosci-117572824712bf03.js",revision:"117572824712bf03"},{url:"/_next/static/chunks/pages/szukaj-1ba939c79da86093.js",revision:"1ba939c79da86093"},{url:"/_next/static/chunks/pages/wspolpraca-eff2018fd0607fe9.js",revision:"eff2018fd0607fe9"},{url:"/_next/static/chunks/polyfills-0d1b80a048d4787e.js",revision:"40ccea369337cec877151c906f22814d"},{url:"/_next/static/chunks/webpack-81fd84a252ed016e.js",revision:"81fd84a252ed016e"},{url:"/_next/static/css/0bd86dd93479f096.css",revision:"0bd86dd93479f096"},{url:"/_next/static/css/0f150fbb3a6064dc.css",revision:"0f150fbb3a6064dc"},{url:"/_next/static/css/43ea32412647524c.css",revision:"43ea32412647524c"},{url:"/_next/static/css/7c229261a48e02d1.css",revision:"7c229261a48e02d1"},{url:"/_next/static/css/8041d58314a1110c.css",revision:"8041d58314a1110c"},{url:"/_next/static/css/863263ca4ae4d27f.css",revision:"863263ca4ae4d27f"},{url:"/_next/static/css/9743396a0f9613de.css",revision:"9743396a0f9613de"},{url:"/_next/static/css/c0f6de299e7dadc7.css",revision:"c0f6de299e7dadc7"},{url:"/_next/static/css/c4adb3924236ff4b.css",revision:"c4adb3924236ff4b"},{url:"/_next/static/media/Inconsolata-Bold.9f61c7b5.ttf",revision:"9f61c7b5"},{url:"/_next/static/media/Inconsolata-Regular.6bed7a95.ttf",revision:"6bed7a95"},{url:"/_next/static/media/Inconsolata-SemiBold.79c0385a.ttf",revision:"79c0385a"},{url:"/_next/static/media/Jost-Bold.94a5df62.ttf",revision:"94a5df62"},{url:"/_next/static/media/Jost-Regular.6b813050.ttf",revision:"6b813050"},{url:"/_next/static/media/Jost-SemiBold.84dc5e49.ttf",revision:"84dc5e49"},{url:"/_next/static/media/revicons.652e7269.eot",revision:"652e7269"},{url:"/_next/static/media/revicons.b96bdb22.ttf",revision:"b96bdb22"},{url:"/_next/static/media/revicons.ff59b316.woff",revision:"ff59b316"},{url:"/_offline",revision:"JjImZUX0q9GBsL-1W_t2k"},{url:"/android-icon-144x144.png",revision:"ca4453be75765fb2caba9de5c7bb46e9"},{url:"/android-icon-192x192.png",revision:"70c955584d89b3fce9615bf2a700e76c"},{url:"/android-icon-36x36.png",revision:"9ddab22ebb124b0da415af760618b122"},{url:"/android-icon-48x48.png",revision:"432b3781ebe246a3c5e41449ce900c58"},{url:"/android-icon-512x512.png",revision:"0b13196d2272a79f95c5a6c025a40b1a"},{url:"/android-icon-72x72.png",revision:"3a757610880076c7333d3bcfa9d4b23b"},{url:"/android-icon-96x96.png",revision:"1895850cca89f06fdae6c8c6af175cbc"},{url:"/apple-icon-114x114.png",revision:"07947a90c18769515f8d877eaf38332e"},{url:"/apple-icon-120x120.png",revision:"270600050618e1a74cca970e26b4e9b4"},{url:"/apple-icon-144x144.png",revision:"ca4453be75765fb2caba9de5c7bb46e9"},{url:"/apple-icon-152x152.png",revision:"627b0fa8438d0e2a80d8ec859635a576"},{url:"/apple-icon-180x180.png",revision:"2dc1ed37ef4da21c2f81033ac7b33284"},{url:"/apple-icon-57x57.png",revision:"d4aff71a41f4159ff14733dcf4f4da00"},{url:"/apple-icon-60x60.png",revision:"997474ee33c04ae05ac98d206405c85c"},{url:"/apple-icon-72x72.png",revision:"3a757610880076c7333d3bcfa9d4b23b"},{url:"/apple-icon-76x76.png",revision:"7adc008f03104d89f5ca84b33011be99"},{url:"/apple-icon-precomposed.png",revision:"d6aac96122a84929b43b455d08310ad1"},{url:"/apple-icon.png",revision:"d6aac96122a84929b43b455d08310ad1"},{url:"/browserconfig.xml",revision:"653d077300a12f09a69caeea7a8947f8"},{url:"/favicon-16x16.png",revision:"fa2c1c917bd929bfef290f4b75bb5846"},{url:"/favicon-32x32.png",revision:"19bc4e685fb9175f18880ef87b585289"},{url:"/favicon-96x96.png",revision:"1895850cca89f06fdae6c8c6af175cbc"},{url:"/favicon.ico",revision:"cdfc0a280a61faadfa84f67360833fd0"},{url:"/fonts/Inconsolata-Bold.ttf",revision:"70429d84480817e18392f15a9bd7f7ee"},{url:"/fonts/Inconsolata-Regular.ttf",revision:"39cba59a48ffa6eea39a5d5f9ec63df6"},{url:"/fonts/Inconsolata-SemiBold.ttf",revision:"67d275b4059c2e7958f5025b381697b3"},{url:"/fonts/Jost-Bold.ttf",revision:"c95be4b0fee1d5cb9654a79c062ac306"},{url:"/fonts/Jost-Regular.ttf",revision:"435c89e6bd0ccb074eed8bd3e655d6a5"},{url:"/fonts/Jost-SemiBold.ttf",revision:"d5a291dd16dbe334f56a12ad53b6a058"},{url:"/logo_lg.png",revision:"4b7f358a75983acbaa93d113b463fcbc"},{url:"/manifest.json",revision:"722cbd6ccc711de7c7a4df80a8ef5245"},{url:"/matusz.jpg",revision:"5d8d140391c32a8b54f7c319388c34b4"},{url:"/ms-icon-144x144.png",revision:"ca4453be75765fb2caba9de5c7bb46e9"},{url:"/ms-icon-150x150.png",revision:"cb0082df65762d90aa16f44ea036f7f2"},{url:"/ms-icon-310x310.png",revision:"3e614f3d80ec9a269a48424d075ddb81"},{url:"/ms-icon-70x70.png",revision:"578d15da99aff5c0fbbd5a2f7ed2add4"},{url:"/robots.txt",revision:"2e7fca2f8c4decc0c8784eb75ce0a7ab"},{url:"/sounds/coffee.mp3",revision:"b9aa0a0db5493dcadd1279b28f3a74c8"},{url:"/sounds/drop.mp3",revision:"682dde70cde7da1db827d7a2ad22741c"},{url:"/sounds/like.mp3",revision:"856f937bf6a7c6194790cf24273b578e"},{url:"/svg/arrow-small.svg",revision:"b287201b0227597f3afec8289eae8ba7"},{url:"/svg/arrow.svg",revision:"761dea3bb564ff72fcbd96406181de6e"},{url:"/svg/avocado.svg",revision:"40ae36ee1bb01414bf754e70d3746e47"},{url:"/svg/cakes.svg",revision:"2b4ce58b175df081a894c905cde1654b"},{url:"/svg/cakesSmall.svg",revision:"5a8e918c881e54572fd445cba1ba44ed"},{url:"/svg/close.svg",revision:"f2603ed3af18d070598facc79cc0d1ea"},{url:"/svg/cookies.svg",revision:"48e19023a5fabc5cf678ee39603c1539"},{url:"/svg/fb.svg",revision:"14f537a7af9f8c565c9e575f1746177a"},{url:"/svg/hamburger.svg",revision:"57f50baa72d786a499327647da174314"},{url:"/svg/hot-dog.svg",revision:"762eef386690fd9442d865cbd5a02c07"},{url:"/svg/ig.svg",revision:"a1d0a629928745c3cf792cd06620da13"},{url:"/svg/logo-small.svg",revision:"d6a2c9ad6d0d75ed843d0d223d9ec89e"},{url:"/svg/logo.svg",revision:"b4d06c6c83e8a5b1c8892a1c80bee9c4"},{url:"/svg/not-found.svg",revision:"ea7baa2a0480b1f9adff5e2fd1648602"},{url:"/svg/search.svg",revision:"707d46dd3a054b88faa4c93ddd08a133"},{url:"/svg/spotify.svg",revision:"5838b54aa88d6c7e58143bcfd78dfccd"},{url:"/svg/yt.svg",revision:"b87feaf0dc37b9bf8449af97ba2eb4d8"},{url:"/svg/zmn.png",revision:"65c7ef8b5906e60e020131f7cb7e0b40"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
