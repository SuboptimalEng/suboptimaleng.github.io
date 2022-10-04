import * as THREE from 'three';

export class ShaderSandbox {
  gg: THREE.Group;
  uniforms: any;

  constructor(uniforms: any, fragmentShader: string) {
    this.uniforms = uniforms;
    this.gg = new THREE.Group();

    const geometry = new THREE.PlaneBufferGeometry(2, 2);

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
      fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);

    this.gg.add(mesh);
  }
}
