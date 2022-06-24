import * as THREE from 'three';

class Snake {
  group: THREE.Group;
  boxMesh: THREE.Mesh;

  constructor() {
    this.group = new THREE.Group();

    const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    const boxMaterial = new THREE.MeshNormalMaterial();
    this.boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    this.group.add(this.boxMesh);
  }

  update() {
    this.boxMesh.rotation.x += 0.01;
  }
}

export { Snake };
