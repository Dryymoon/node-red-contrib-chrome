module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=28)}({0:function(e,t){let r;e.exports={get RED(){return r},set RED(e){r=e}}},1:function(e,t,r){"use strict";var n=r(0);class o{constructor(e){n.RED.nodes.createNode(this,e)}}r.d(t,"a",function(){return o})},28:function(e,t,r){e.exports=function(e){r(0).RED=e;var t=r(29);t=t.default||t,e.nodes.registerType("c9050ce3-f09e-4de8-9586-046a0a77d571",t),console.log("REGISTER - c9050ce3-f09e-4de8-9586-046a0a77d571")}},29:function(e,t,r){"use strict";r.r(t),r.d(t,"default",function(){return u});var n=r(1);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class u extends n.a{constructor(e){super(e),this.on("input",async t=>{try{const{$$pageGetter:r}=t,{selector:n,value:u,waitUntil:c,timeout:i}=e;await r().waitForSelector(n,{timeout:3e4}),"selected"===c?await r().select(n,u):(r().select(n,u).catch(()=>null),await r().waitForNavigation({waitUntil:c,timeout:1e3*i})),this.send(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){o(e,t,r[t])})}return e}({},t))}catch(e){this.error(`Can't select, ${e.toString()}`,t)}})}}}});
//# sourceMappingURL=c9050ce3-f09e-4de8-9586-046a0a77d571.js.map