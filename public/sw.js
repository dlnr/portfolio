if(!self.define){let e,c={};const i=(i,s)=>(i=new URL(i+".js",s).href,c[i]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=c,document.head.appendChild(e)}else e=i,importScripts(i),c()})).then((()=>{let e=c[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(c[n])return;let o={};const d=e=>i(e,n),f={module:{uri:n},exports:o,require:d};c[n]=Promise.all(s.map((e=>f[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-8bc485fe"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"chat.svg",revision:"455cc1c7c87d2745af8417ad0b97af30"},{url:"DLNR.svg",revision:"24dea03b0f076dd09e8ef015d68b94bb"},{url:"fallback.js",revision:"4eb674e79b1b12623996198d064f036c"},{url:"favicon.svg",revision:"a98ea8ac099ac27fc91ed6317fc20845"},{url:"icon.png",revision:"af5d4e61c4ef245d0573be26e2fed17f"},{url:"index.html",revision:"44917c3d56123496ba1955257026f9db"},{url:"index.js",revision:"59e05a96efd53ba034107379fed875b3"},{url:"main.css",revision:"2f6b450cb93bc3a5413522dd27eec5c8"},{url:"scetch.html",revision:"2267c77ccab47e157c051f69a1a9c1bc"},{url:"scetch.js",revision:"6222846a110abcf4e56ce031c05983b7"}],{}),e.registerRoute(/\.(?:webp)$/,new e.CacheFirst({cacheName:"dlnr_media",plugins:[new e.ExpirationPlugin({maxEntries:20})]}),"GET")}));
//# sourceMappingURL=sw.js.map
