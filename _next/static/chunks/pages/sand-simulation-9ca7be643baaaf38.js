(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[13],{4747:function(t,n,s){"use strict";s.r(n),s.d(n,{default:function(){return d}});var i=s(7294);function e(t,n){(null==n||n>t.length)&&(n=t.length);for(var s=0,i=new Array(n);s<n;s++)i[s]=t[s];return i}function o(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,n){if(t){if("string"===typeof t)return e(t,n);var s=Object.prototype.toString.call(t).slice(8,-1);return"Object"===s&&t.constructor&&(s=t.constructor.name),"Map"===s||"Set"===s?Array.from(t):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?e(t,n):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var a=s(2777),r=s(2262),h=s(9499),c=function(){function t(n){var s=this;(0,a.Z)(this,t),(0,h.Z)(this,"canvasId",void 0),(0,h.Z)(this,"canvas",void 0),(0,h.Z)(this,"cc",void 0),(0,h.Z)(this,"pixelWidth",void 0),(0,h.Z)(this,"pixelHeight",void 0),(0,h.Z)(this,"rows",20),(0,h.Z)(this,"cols",20),(0,h.Z)(this,"sandbox",void 0),(0,h.Z)(this,"onMouseDown",(function(t){var n=s.canvas.getBoundingClientRect(),i=t.clientX-n.left,e=t.clientY-n.top,o=Math.floor(e/s.cols),a=Math.floor(i/s.rows)+1;s.setAsSand(o,a)})),this.canvasId=n,this.canvas=document.getElementById(n),this.cc=this.canvas.getContext("2d"),this.pixelWidth=this.canvas.width/this.cols,this.pixelHeight=this.canvas.height/this.rows,this.sandbox=[];for(var i=0;i<this.rows;i++){var e=new Array(this.cols).fill(0);this.sandbox.push(o(e))}this.sandbox[0][1]=1,this.sandbox[1][1]=1,this.sandbox[2][1]=1,this.sandbox[3][1]=1,this.sandbox[4][1]=1,this.sandbox[5][1]=1,this.sandbox[6][1]=1,this.sandbox[7][1]=1,this.sandbox[8][1]=1,this.sandbox[9][1]=1,this.sandbox[10][1]=1,this.sandbox[11][1]=1,this.sandbox[12][1]=1,this.sandbox[13][1]=1,this.sandbox[14][1]=1,this.sandbox[15][1]=1,this.sandbox[16][1]=1}return(0,r.Z)(t,[{key:"drawPixel",value:function(t,n,s){0===t?this.cc.fillStyle="white":1===t&&(this.cc.fillStyle="brown"),this.cc.fillRect(n*this.pixelWidth,s*this.pixelHeight,this.pixelWidth,this.pixelHeight)}},{key:"setAsSand",value:function(t,n){this.sandbox[t][n]=1}},{key:"addEventListeners",value:function(){this.canvas.addEventListener("mousedown",this.onMouseDown)}},{key:"removeEventListeners",value:function(){this.canvas.removeEventListener("mousedown",this.onMouseDown)}},{key:"render",value:function(){for(var t=0;t<this.sandbox.length;t++)for(var n=0;n<this.sandbox[t].length;n++)this.drawPixel(this.sandbox[t][n],n,t)}},{key:"step",value:function(){for(var t=this.sandbox.length-1;t>=0;t--)for(var n=0;n<this.sandbox[t].length;n++)if(0!==this.sandbox[t][n])if(t!==this.sandbox.length-1)1===this.sandbox[t][n]&&(0===this.sandbox[t+1][n]?(this.sandbox[t][n]=0,this.sandbox[t+1][n]=1):0===this.sandbox[t+1][n+1]?(this.sandbox[t][n]=0,this.sandbox[t+1][n+1]=1):0===this.sandbox[t+1][n-1]&&(this.sandbox[t][n]=0,this.sandbox[t+1][n-1]=1));else if(0===n||n===this.sandbox[t].length-1)continue}}]),t}(),u=s(5893);function d(){var t=(0,i.useRef)(0);return(0,i.useEffect)((function(){var n=new c("myCanvas");n.addEventListeners();var s=0;return requestAnimationFrame((function i(e){var o=Math.floor(e/100);s!==o&&(n.step(),n.render(),s=o),t.current=requestAnimationFrame(i)})),function(){n.removeEventListeners(),cancelAnimationFrame(t.current)}}),[]),(0,u.jsx)("div",{className:"flex h-screen justify-center place-items-center bg-black",children:(0,u.jsx)("canvas",{id:"myCanvas",className:"h-96 w-96"})})}},454:function(t,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/sand-simulation",function(){return s(4747)}])},2777:function(t,n,s){"use strict";function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}s.d(n,{Z:function(){return i}})},2262:function(t,n,s){"use strict";function i(t,n){for(var s=0;s<n.length;s++){var i=n[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function e(t,n,s){return n&&i(t.prototype,n),s&&i(t,s),t}s.d(n,{Z:function(){return e}})}},function(t){t.O(0,[774,888,179],(function(){return n=454,t(t.s=n);var n}));var n=t.O();_N_E=n}]);