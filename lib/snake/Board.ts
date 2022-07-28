import * as THREE from 'three';

interface IPosition {
  x: number;
  y: number;
  z: number;
}

class Board {
  gg: THREE.Group;

  boardSize: number;
  boardPositions: Array<IPosition>;

  constructor() {
    this.gg = new THREE.Group();

    this.boardSize = 4;
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
  }

  _initializeBoard() {
    this.boardPositions.forEach((boardPosition) => {
      this._createIndividualBoardPart(boardPosition);
    });
  }

  _createIndividualBoardPart(coord: IPosition) {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.x = coord.x;
    boxMesh.position.y = coord.y;
    boxMesh.position.z = coord.z;
    this.gg.add(boxMesh);
  }
}

export { Board };
