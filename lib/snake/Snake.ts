import * as THREE from 'three';
import { KeyboardEvent } from 'react';

interface IPosition {
  x: number;
  y: number;
}

class Snake {
  group: THREE.Group;
  boxMesh: THREE.Mesh;

  head: IPosition;
  body: Array<IPosition>;

  constructor() {
    this.group = new THREE.Group();

    const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    const boxMaterial = new THREE.MeshNormalMaterial();
    this.boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    this.head = { x: 1, y: 2 };
    this.body = [
      { x: 1, y: 1 },
      { x: 0, y: 0 },
    ];

    this.group.add(this.boxMesh);
  }

  handleMovement(event: KeyboardEvent) {
    // wasd
    // if (event.key)
  }

  update() {
    this.boxMesh.rotation.x += 0.01;
  }
}

export { Snake };
