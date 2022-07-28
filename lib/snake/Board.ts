import * as THREE from 'three';
import vertexShader from './shaders/portal_vs.glsl';
import fragmentShader from './shaders/portal_fs.glsl';

interface IPosition {
  x: number;
  y: number;
  z: number;
}

class Board {
  gg: THREE.Group;
  clock: THREE.Clock;

  uniforms: any;
  boardSize: number;
  boardPositions: Array<IPosition>;

  portalPairs: number;
  portalPairPositions: Array<[IPosition, IPosition]>;

  constructor() {
    // set up uniforms
    this.clock = new THREE.Clock();
    this.uniforms = {
      u_time: {
        type: 'f',
        value: 0,
      },
    };

    this.gg = new THREE.Group();

    // set up board positions
    this.boardSize = 15;
    this.boardPositions = [];
    let startIndex = -1 * Math.floor(this.boardSize / 2);
    let endIndex = Math.floor(this.boardSize / 2);
    for (let row = startIndex; row <= endIndex; row++) {
      for (let col = startIndex; col <= endIndex; col++) {
        this.boardPositions.push({
          x: row,
          y: col,
          z: -1,
        });
      }
    }

    // add the threejs geometries
    this._initializeBoard();

    this.portalPairs = 1;
    this.portalPairPositions = [
      [
        { x: -4, y: -4, z: 0 },
        { x: 4, y: 4, z: 0 },
      ],
    ];
    this._initializePortalPairs();
  }

  _initializePortalPairs() {
    this.portalPairPositions.forEach((pair) => {
      let portalPos1 = pair[0];
      let portalPos2 = pair[1];
      this._createIndividualPortal(portalPos1);
      this._createIndividualPortal(portalPos2);
    });
  }

  _createIndividualPortal(coord: IPosition) {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    // without shader
    // const boxMaterial = new THREE.MeshPhongMaterial({ color: 'red' });
    // with shader
    const boxMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    // const boxMaterial = new THREE.ShaderMaterial({
    //   uniforms: this.uniforms,
    //   vertexShader: `
    //     uniform float u_time;
    //     varying vec2 vUv;
    //     varying vec3 pos;
    //     void main() {
    //       vUv = uv;
    //       pos = position;
    //       gl_Position = projectionMatrix
    //         * modelViewMatrix
    //         * vec4(position.x, position.y, position.z, 1.0);
    //     }
    //   `,
    //   fragmentShader: `
    //     uniform float u_time;
    //     varying vec2 vUv;
    //     varying vec3 pos;
    //     float circle(float radius, vec2 uv) {
    //         float value = distance(vec2(
    //                 uv.x,
    //                 // uv.x + 0.025*cos((10.*uv.y + u_time)*4.),
    //                 uv.y + 0.025*sin((10.*uv.x + u_time)*4.)
    //             ), vec2(0.5));
    //         return 1. - step(radius, value);
    //     }
    //     float circle2(float radius, vec2 uv) {
    //         float value = distance(vec2(
    //                 // uv.x,
    //                 uv.x + 0.025*cos((5.*uv.y + u_time)*4.),
    //                 uv.y + 0.025*sin((5.*uv.x + u_time)*2.)
    //             ), vec2(0.5));
    //         return step(radius, value);
    //     }
    //     void main() {
    //         // vec2 uv = gl_FragCoord.xy/u_resolution;
    //         float alpha = 0.9;
    //         vec3 white = vec3(1.0);
    //         vec3 black = vec3(0.0);
    //         vec3 red = vec3(1.0, 0.0, 0.0);
    //         vec3 color = white;
    //         float radius = 0.45;
    //         color = mix(color, red, 1. - circle(radius, vUv));
    //         color = mix(color, black, 1. - circle2(radius - 0.05, vUv));
    //         if (pos.z > .49 || pos.z < -0.49) {
    //           gl_FragColor = vec4(red, alpha);
    //         } else {
    //           gl_FragColor = vec4(color, alpha);
    //         }
    //     }
    //   `,
    // });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.x = coord.x;
    boxMesh.position.y = coord.y;
    boxMesh.position.z = coord.z;
    this.gg.add(boxMesh);
  }

  update(t: number) {
    this.uniforms.u_time.value = t / 1000;
  }

  _initializeBoard() {
    this.boardPositions.forEach((boardPosition) => {
      this._createIndividualBoardPart(boardPosition);
    });
  }

  _createIndividualBoardPart(coord: IPosition) {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: 0x004400,
      // wireframe: true,
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.x = coord.x;
    boxMesh.position.y = coord.y;
    boxMesh.position.z = coord.z;
    this.gg.add(boxMesh);
  }
}

export { Board };
