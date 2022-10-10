import * as THREE from 'three';

export class VoxelEditor {
  gg: THREE.Group;
  base: THREE.Group;

  constructor() {
    this.gg = new THREE.Group();
    this.base = new THREE.Group();

    this.gg.add(this.base);

    this.createBase();
  }

  createBase() {
    for (let x = -5; x < 5; x++) {
      for (let y = -5; y < 5; y++) {
        const boxGeo = new THREE.BoxGeometry();
        const boxMat = new THREE.MeshNormalMaterial({ wireframe: true });
        const boxMesh = new THREE.Mesh(boxGeo, boxMat);
        boxMesh.position.set(x, y, 0);
        this.base.add(boxMesh);
      }
    }
  }
}
