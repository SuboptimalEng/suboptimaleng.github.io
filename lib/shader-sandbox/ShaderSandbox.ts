import * as THREE from 'three';

export class ShaderSandbox {
  gg: THREE.Group;
  uniforms: any;

  constructor(uniforms: any) {
    this.uniforms = uniforms;
    this.gg = new THREE.Group();

    const geometry = new THREE.PlaneBufferGeometry(1, 1);

    const material = new THREE.ShaderMaterial({
      // wireframe: true,
      uniforms: uniforms,
      vertexShader: `
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;

      void main() {
        gl_Position = projectionMatrix
          * modelViewMatrix
          * vec4(position.x, position.y, position.z, 1.0);
      }
      `,

      fragmentShader: `
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;

      void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution;

          if (u_mouse.x < uv.x + 0.01 && u_mouse.x > uv.x - 0.01) {
            gl_FragColor = vec4(1, 0, 0, 0.9);
          } else if (1. - u_mouse.y < uv.y + 0.01 && 1. - u_mouse.y > uv.y - 0.01) {
            gl_FragColor = vec4(1, 0, 0, 0.9);
          } else {
            gl_FragColor = vec4(1. * uv.x, abs(sin(u_time)), 0, 0.9);
          }
      }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);

    this.gg.add(mesh);
  }
}
