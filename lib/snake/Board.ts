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
