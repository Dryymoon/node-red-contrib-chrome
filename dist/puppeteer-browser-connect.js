module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=12)}([function(e,t){let r;e.exports={get RED(){return r},set RED(e){r=e}}},function(e,t,r){"use strict";r.d(t,"a",function(){return o});var n=r(0);class o{constructor(e){n.RED.nodes.createNode(this,e)}}},function(e,t){e.exports=require("source-map-support")},function(e,t){e.exports=require("puppeteer-extra")},function(e,t,r){"use strict";r(6);var n=r(3),o=r.n(n),u=r(5),c=r.n(u);o.a.use(c()()),t.a=o.a},function(e,t){e.exports=require("puppeteer-extra-plugin-stealth")},function(e,t){e.exports=require("puppeteer")},function(e,t){e.exports=require("url")},,function(e,t){e.exports=require("util")},function(e,t){e.exports=require("dns")},function(e,t){e.exports=require("net")},function(e,t,r){r(2).install(),e.exports=function(e){r(0).RED=e;var t=r(13);t=t.default||t,e.nodes.registerType("puppeteer-browser-connect",t),console.log("REGISTER - puppeteer-browser-connect")}},function(e,t,r){"use strict";r.r(t),r.d(t,"default",function(){return f});var n=r(9),o=r(10),u=r(7),c=r.n(u),i=r(11),s=r(4),a=r(1);function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class f extends a.a{constructor(e){super(e),this.on("input",async t=>{try{let{browserURL:r}=e;const{slowMo:u}=e,{protocol:a,hostname:f,port:l}=c.a.parse(r);if(!Object(i.isIP)(f)){const e=await Object(n.promisify)(o.resolve)(f);r=c.a.format({protocol:a,hostname:e,port:l})}const b=await s.a.connect({browserURL:r,slowMo:u});this.send(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){p(e,t,r[t])})}return e}({},t,{$browser:()=>b,$browserContext:()=>b}))}catch(e){this.error(`Can't connect to browser, ${e.toString()}`,t)}})}}}]);
//# sourceMappingURL=puppeteer-browser-connect.js.map