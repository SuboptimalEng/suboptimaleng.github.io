import * as THREE from 'three';
import vertexShader from './shaders/portal_vs.glsl';
import fragmentShader from './shaders/portal_fs.glsl';

interface IPosition {
  x: number;
  y: number;
  z: number;
}

interface IPortal {
  x: number;
  y: number;
  z: number;
  color: string;
}

class Board {
  gg: THREE.Group;
  clock: THREE.Clock;

  uniforms: any;
  boardSize: number;
  boardPositions: Array<IPosition>;

  portalPairPositions: Array<[IPortal, IPortal]>;

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
    // this.boardSize = 15;
    this.boardSize = 21;
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

    this.portalPairPositions = [
      // level 1
      // [
      //   { x: 4, y: 4, z: 0, color: 'red' },
      //   { x: -4, y: -4, z: 0, color: 'red' },
      // ],
      // [
      //   { x: -4, y: 0, z: 0, color: 'green' },
      //   { x: 4, y: -4, z: 0, color: 'green' },
      // ],
      // [
      //   { x: -4, y: 4, z: 0, color: 'blue' },
      //   { x: 4, y: 0, z: 0, color: 'blue' },
      // ],

      // level 2
      [
        { x: -8, y: 6, z: 0, color: 'red' },
        { x: -4, y: 2, z: 0, color: 'red' },
      ],
      [
        { x: -4, y: 6, z: 0, color: 'green' },
        { x: 0, y: 2, z: 0, color: 'green' },
      ],
      [
        { x: 0, y: 6, z: 0, color: 'blue' },
        { x: 4, y: 2, z: 0, color: 'blue' },
      ],
      [
        { x: 4, y: 6, z: 0, color: 'yellow' },
        { x: 8, y: 2, z: 0, color: 'yellow' },
      ],
      [
        { x: 8, y: 6, z: 0, color: 'grey' },
        { x: -8, y: 2, z: 0, color: 'grey' },
      ],
      [
        { x: -8, y: -6, z: 0, color: 'purple' },
        { x: -4, y: -2, z: 0, color: 'purple' },
      ],
      [
        { x: -4, y: -6, z: 0, color: 'brown' },
        { x: 0, y: -2, z: 0, color: 'brown' },
      ],
      [
        { x: 0, y: -6, z: 0, color: 'teal' },
        { x: 4, y: -2, z: 0, color: 'teal' },
      ],
      [
        { x: 4, y: -6, z: 0, color: 'violet' },
        { x: 8, y: -2, z: 0, color: 'violet' },
      ],
      [
        { x: 8, y: -6, z: 0, color: 'pink' },
        { x: -8, y: -2, z: 0, color: 'pink' },
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

  _createIndividualPortal(portal: IPortal) {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshPhongMaterial({ color: portal.color });
    // with shader
    // const boxMaterial = new THREE.ShaderMaterial({
    //   uniforms: this.uniforms,
    //   vertexShader: vertexShader,
    //   fragmentShader: fragmentShader,
    // });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.x = portal.x;
    boxMesh.position.y = portal.y;
    boxMesh.position.z = portal.z;
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
      // color: 0xfafafa,
      color: 0x101010,
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
