(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[410],{3533:function(e,n,i){"use strict";i.d(n,{W:function(){return s}});var t=i(2777),o=i(2262),s=function(){function e(){(0,t.Z)(this,e)}return(0,o.Z)(e,null,[{key:"removeCanvas",value:function(){var e=document.getElementById("myThreeJsCanvas");e.parentNode.removeChild(e)}},{key:"maybeCreateCanvas",value:function(){var e=document.getElementById("myThreeJsCanvas");e||((e=document.createElement("canvas")).id="myThreeJsCanvas",document.body.appendChild(e))}}]),e}()},3019:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return l}});var t=i(7294),o=i(3533),s=i(2777),r=i(2262),a=i(9499),u=i(9477),d=i(9365),h=i(5079),c=function(){function e(n){var i=this;(0,s.Z)(this,e),(0,a.Z)(this,"canvasId",void 0),(0,a.Z)(this,"fov",void 0),(0,a.Z)(this,"nearPlane",void 0),(0,a.Z)(this,"farPlane",void 0),(0,a.Z)(this,"uniforms",void 0),(0,a.Z)(this,"onWindowResize",void 0),(0,a.Z)(this,"onMouseMove",void 0),(0,a.Z)(this,"canvas",void 0),(0,a.Z)(this,"scene",void 0),(0,a.Z)(this,"camera",void 0),(0,a.Z)(this,"renderer",void 0),(0,a.Z)(this,"clock",void 0),(0,a.Z)(this,"stats",void 0),(0,a.Z)(this,"controls",void 0),(0,a.Z)(this,"ambientLight",void 0),(0,a.Z)(this,"directionalLight",void 0),this.fov=45,this.nearPlane=1,this.farPlane=1e3,this.canvasId=n,this.uniforms={u_time:{type:"f",value:0},u_resolution:new u.xWb(new u.FM8(window.innerWidth,window.innerHeight)),u_mouse:new u.xWb(new u.FM8(0,0))},this.scene=new u.xsS,this.camera=new u.iKG,this.camera.position.z=10,this.canvas=document.getElementById(this.canvasId),this.renderer=new u.CP7({canvas:this.canvas,antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),this.clock=new u.SUY,this.controls=new d.z(this.camera,this.renderer.domElement),this.stats=(0,h.Z)(),document.body.appendChild(this.stats.dom),this.ambientLight=new u.Mig(16777215,.5),this.ambientLight.castShadow=!0,this.scene.add(this.ambientLight),this.directionalLight=new u.Ox3(16777215,1),this.directionalLight.position.set(0,4,10),this.scene.add(this.directionalLight),this.onWindowResize=function(){console.log("resize"),i.camera.updateProjectionMatrix(),i.uniforms.u_resolution.value.x=window.innerWidth,i.uniforms.u_resolution.value.y=window.innerHeight,i.renderer.setSize(window.innerWidth,window.innerHeight)},this.onMouseMove=function(e){console.log("on mouse move"),i.uniforms.u_mouse.value.x=e.pageX/window.innerWidth,i.uniforms.u_mouse.value.y=e.pageY/window.innerHeight},window.addEventListener("resize",this.onWindowResize),window.addEventListener("mousemove",this.onMouseMove)}return(0,r.Z)(e,[{key:"destroy",value:function(){for(;this.scene.children.length>0;)this.scene.remove(this.scene.children[0]);this.scene.removeFromParent(),this.camera.removeFromParent(),document.body.removeChild(this.stats.dom),window.removeEventListener("resize",this.onWindowResize),window.removeEventListener("mousemove",this.onMouseMove)}},{key:"update",value:function(){this.render(),this.stats.update()}},{key:"render",value:function(){this.uniforms.u_time.value+=this.clock.getDelta(),this.renderer.render(this.scene,this.camera)}}]),e}(),v=function e(n){(0,s.Z)(this,e),(0,a.Z)(this,"gg",void 0),(0,a.Z)(this,"uniforms",void 0),this.uniforms=n,this.gg=new u.ZAu;var i=new u.BKK(1.9,1.9),t=new u.jyz({uniforms:n,vertexShader:"\n      uniform float u_time;\n      uniform vec2 u_mouse;\n      uniform vec2 u_resolution;\n\n      void main() {\n        gl_Position = projectionMatrix\n          * modelViewMatrix\n          * vec4(position.x, position.y, position.z, 1.0);\n      }\n      ",fragmentShader:"\n      uniform float u_time;\n      uniform vec2 u_mouse;\n      uniform vec2 u_resolution;\n\n      void main() {\n          vec2 uv = gl_FragCoord.xy / u_resolution;\n\n          if (u_mouse.x < uv.x + 0.01 && u_mouse.x > uv.x - 0.01) {\n            gl_FragColor = vec4(1, 0, 0, 0.9);\n          } else if (u_mouse.y < uv.y + 0.01 && u_mouse.y > uv.y - 0.01) {\n            gl_FragColor = vec4(1, 0, 0, 0.9);\n          } else {\n            gl_FragColor = vec4(1. * uv.x, abs(sin(u_time)), 0, 0.9);\n          }\n      }\n      "}),o=new u.Kj0(i,t);this.gg.add(o)},m=i(5893);function l(){var e=(0,t.useRef)(0);return(0,t.useEffect)((function(){o.W.maybeCreateCanvas();var n=new c("myThreeJsCanvas"),i=new v(n.uniforms);n.scene.add(i.gg);return requestAnimationFrame((function i(t){n.update(),e.current=window.requestAnimationFrame(i)})),function(){console.log("on component unmount"),n.destroy(),window.cancelAnimationFrame(e.current),o.W.removeCanvas()}})),(0,m.jsx)("div",{children:(0,m.jsx)("canvas",{id:"myThreeJsCanvas"})})}},8010:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/shader-sandbox",function(){return i(3019)}])}},function(e){e.O(0,[737,543,774,888,179],(function(){return n=8010,e(e.s=n);var n}));var n=e.O();_N_E=n}]);