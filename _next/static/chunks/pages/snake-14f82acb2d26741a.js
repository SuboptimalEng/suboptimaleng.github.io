(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[765],{3533:function(i,e,t){"use strict";t.d(e,{W:function(){return s}});var n=t(2777),o=t(2262),s=function(){function i(){(0,n.Z)(this,i)}return(0,o.Z)(i,null,[{key:"removeCanvas",value:function(){var i=document.getElementById("myThreeJsCanvas");i.parentNode.removeChild(i)}},{key:"maybeCreateCanvas",value:function(){var i=document.getElementById("myThreeJsCanvas");i||((i=document.createElement("canvas")).id="myThreeJsCanvas",document.body.appendChild(i))}}]),i}()},8007:function(i,e,t){"use strict";t.r(e),t.d(e,{default:function(){return f}});var n=t(7294),o=t(3533),s=t(2777),a=t(2262),r=t(9499),d=t(9477),h=function(){function i(){(0,s.Z)(this,i),(0,r.Z)(this,"gg",void 0),(0,r.Z)(this,"clock",void 0),(0,r.Z)(this,"uniforms",void 0),(0,r.Z)(this,"boardSize",void 0),(0,r.Z)(this,"boardPositions",void 0),(0,r.Z)(this,"portalPairs",void 0),(0,r.Z)(this,"portalPairPositions",void 0),this.clock=new d.SUY,this.uniforms={u_time:{type:"f",value:0}},this.gg=new d.ZAu,this.boardSize=15,this.boardPositions=[];for(var e=-1*Math.floor(this.boardSize/2),t=Math.floor(this.boardSize/2),n=e;n<=t;n++)for(var o=e;o<=t;o++)this.boardPositions.push({x:n,y:o,z:-1});this._initializeBoard(),this.portalPairs=1,this.portalPairPositions=[[{x:-4,y:-4,z:0},{x:4,y:4,z:0}]],this._initializePortalPairs()}return(0,a.Z)(i,[{key:"_initializePortalPairs",value:function(){var i=this;this.portalPairPositions.forEach((function(e){var t=e[0],n=e[1];i._createIndividualPortal(t),i._createIndividualPortal(n)}))}},{key:"_createIndividualPortal",value:function(i){var e=new d.DvJ(1,1,1),t=new d.jyz({uniforms:this.uniforms,vertexShader:"#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec3 pos;\n\nvoid main() {\n    vUv = uv;\n    pos = position;\n    gl_Position = projectionMatrix\n      * modelViewMatrix\n      * vec4(position.x, position.y, position.z, 1.0);\n}",fragmentShader:"#define GLSLIFY 1\nuniform float u_time;\n\nvarying vec2 vUv;\nvarying vec3 pos;\n\nfloat circle(float radius, vec2 uv) {\n    float value = distance(vec2(\n            uv.x,\n            // uv.x + 0.025*cos((10.*uv.y + u_time)*4.),\n            uv.y + 0.025*sin((10.*uv.x + u_time)*4.)\n        ), vec2(0.5));\n    return 1. - step(radius, value);\n}\n\nfloat circle2(float radius, vec2 uv) {\n    float value = distance(vec2(\n            // uv.x,\n            uv.x + 0.025*cos((5.*uv.y + u_time)*4.),\n            uv.y + 0.025*sin((5.*uv.x + u_time)*2.)\n        ), vec2(0.5));\n    return step(radius, value);\n}\n\nvoid main() {\n    // vec2 uv = gl_FragCoord.xy/u_resolution;\n    float alpha = 0.9;\n    vec3 white = vec3(1.0);\n    vec3 black = vec3(0.0);\n    vec3 red = vec3(1.0, 0.0, 0.0);\n    vec3 color = white;\n    float radius = 0.45;\n    color = mix(color, red, 1. - circle(radius, vUv));\n    color = mix(color, black, 1. - circle2(radius - 0.05, vUv));\n    if (pos.z > .49 || pos.z < -0.49) {\n      gl_FragColor = vec4(red, alpha);\n    } else {\n      gl_FragColor = vec4(color, alpha);\n    }\n}\n"}),n=new d.Kj0(e,t);n.position.x=i.x,n.position.y=i.y,n.position.z=i.z,this.gg.add(n)}},{key:"update",value:function(i){this.uniforms.u_time.value=i/1e3}},{key:"_initializeBoard",value:function(){var i=this;this.boardPositions.forEach((function(e){i._createIndividualBoardPart(e)}))}},{key:"_createIndividualBoardPart",value:function(i){var e=new d.DvJ(1,1,1),t=new d.xoR({color:17408}),n=new d.Kj0(e,t);n.position.x=i.x,n.position.y=i.y,n.position.z=i.z,this.gg.add(n)}}]),i}(),c=t(6194),v=function(){function i(e,t){(0,s.Z)(this,i),(0,r.Z)(this,"gg",void 0),(0,r.Z)(this,"clock",void 0),(0,r.Z)(this,"timestep",void 0),(0,r.Z)(this,"isMoving",void 0),(0,r.Z)(this,"bodyPositions",void 0),(0,r.Z)(this,"speed",1),(0,r.Z)(this,"xSpeed",0),(0,r.Z)(this,"ySpeed",0),(0,r.Z)(this,"portalPairs",void 0),(0,r.Z)(this,"portalPairPositions",void 0),this.portalPairs=e,this.portalPairPositions=t,this.gg=new d.ZAu,this.clock=new d.SUY,this.clock.start(),this.bodyPositions=[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:1,y:1,z:0},{x:1,y:2,z:0},{x:1,y:3,z:0},{x:1,y:4,z:0},{x:1,y:5,z:0},{x:1,y:6,z:0}],this.timestep=100,this.isMoving=!1,this._initializeSnake()}return(0,a.Z)(i,[{key:"_initializeSnake",value:function(){var i=this;this.bodyPositions.forEach((function(e){i._createIndividualSnakePart(e)}))}},{key:"_createIndividualSnakePart",value:function(i){var e=new d.DvJ(1,1,1),t=new d.RSm,n=new d.Kj0(e,t);n.position.x=i.x,n.position.y=i.y,this.gg.add(n)}},{key:"render",value:function(){for(var i=0;i<this.bodyPositions.length;i++){var e=this.bodyPositions[i],t=e.x,n=e.y,o=e.z;this.gg.children[i].position.set(t,n,o)}}},{key:"update",value:function(i){var e=this;if(c.Vx(i),this.isMoving&&(this.render(),!(this.clock.getElapsedTime()<.5))){this.clock.start();for(var t=function(i,e){var t=Math.pow(i.x-e.x,2),n=Math.pow(i.y-e.y,2),o=Math.sqrt(t+n);return o},n=function(i){var n={x:e.bodyPositions[i].x,y:e.bodyPositions[i].y,z:e.bodyPositions[i].z},o=void 0;if(0===i){o={x:e.bodyPositions[0].x+e.xSpeed,y:e.bodyPositions[0].y+e.ySpeed,z:e.bodyPositions[0].z};var s=e.portalPairPositions[0][0],a=e.portalPairPositions[0][1];console.log(s,s,o),t(o,s)<.1?(o.x=a.x+e.xSpeed,o.y=a.y+e.ySpeed):t(o,a)<.1&&(o.x=s.x+e.xSpeed,o.y=s.y+e.ySpeed)}else o={x:e.bodyPositions[i-1].x,y:e.bodyPositions[i-1].y,z:e.bodyPositions[i-1].z};new c.kX(n).to(o,500).easing(c.oY.Cubic.InOut).onUpdate((function(){e.bodyPositions[i].x=n.x,e.bodyPositions[i].y=n.y,e.bodyPositions[i].z=n.z})).start()},o=0;o<this.bodyPositions.length;o++)n(o)}}},{key:"handleMovement",value:function(i){["w","a","s","d"].includes(i.key)?this.isMoving=!0:this.isMoving=!1,"w"===i.key?(this.xSpeed=0,this.ySpeed=this.speed):"a"===i.key?(this.xSpeed=-this.speed,this.ySpeed=0):"s"===i.key?(this.xSpeed=0,this.ySpeed=-this.speed):"d"===i.key&&(this.xSpeed=this.speed,this.ySpeed=0)}}]),i}(),u=t(9365),l=t(5079),y=function(){function i(e){var t=this;(0,s.Z)(this,i),(0,r.Z)(this,"canvasId",void 0),(0,r.Z)(this,"fov",void 0),(0,r.Z)(this,"nearPlane",void 0),(0,r.Z)(this,"farPlane",void 0),(0,r.Z)(this,"canvas",void 0),(0,r.Z)(this,"onWindowResize",void 0),(0,r.Z)(this,"scene",void 0),(0,r.Z)(this,"camera",void 0),(0,r.Z)(this,"renderer",void 0),(0,r.Z)(this,"clock",void 0),(0,r.Z)(this,"stats",void 0),(0,r.Z)(this,"controls",void 0),(0,r.Z)(this,"ambientLight",void 0),(0,r.Z)(this,"directionalLight",void 0),this.fov=45,this.nearPlane=1,this.farPlane=1e3,this.canvasId=e,this.scene=new d.xsS,this.camera=new d.cPb(this.fov,window.innerWidth/window.innerHeight,this.nearPlane,this.farPlane),this.camera.position.z=24,this.camera.position.y=-8,this.canvas=document.getElementById(this.canvasId),this.renderer=new d.CP7({canvas:this.canvas,antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),this.clock=new d.SUY,this.controls=new u.z(this.camera,this.renderer.domElement),this.stats=(0,l.Z)(),document.body.appendChild(this.stats.dom),this.ambientLight=new d.Mig(16777215,.5),this.ambientLight.castShadow=!0,this.scene.add(this.ambientLight),this.directionalLight=new d.Ox3(16777215,1),this.directionalLight.position.set(0,32,64),this.scene.add(this.directionalLight),this.onWindowResize=function(){console.log("resize"),t.camera.aspect=window.innerWidth/window.innerHeight,t.camera.updateProjectionMatrix(),t.renderer.setSize(window.innerWidth,window.innerHeight)},window.addEventListener("resize",this.onWindowResize,!1)}return(0,a.Z)(i,[{key:"destroy",value:function(){for(;this.scene.children.length>0;)this.scene.remove(this.scene.children[0]);this.scene.removeFromParent(),this.camera.removeFromParent(),document.body.removeChild(this.stats.dom),window.removeEventListener("resize",this.onWindowResize)}},{key:"update",value:function(){this.render(),this.stats.update(),this.controls.update()}},{key:"render",value:function(){this.renderer.render(this.scene,this.camera)}}]),i}(),p=t(5893);var f=function(){var i=(0,n.useRef)(0);return(0,n.useEffect)((function(){o.W.maybeCreateCanvas();var e=new y("myThreeJsCanvas"),t=new h;e.scene.add(t.gg);var n=new v(t.portalPairs,t.portalPairPositions);e.scene.add(n.gg);return requestAnimationFrame((function o(s){e.update(),t.update(s),n.update(s),i.current=window.requestAnimationFrame(o)})),window.addEventListener("keydown",(function(i){return n.handleMovement(i)})),function(){console.log("on component unmount"),e.destroy(),window.cancelAnimationFrame(i.current),o.W.removeCanvas()}})),(0,p.jsx)("div",{children:(0,p.jsx)("canvas",{id:"myThreeJsCanvas"})})}},3103:function(i,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/snake",function(){return t(8007)}])}},function(i){i.O(0,[737,273,774,888,179],(function(){return e=3103,i(i.s=e);var e}));var e=i.O();_N_E=e}]);