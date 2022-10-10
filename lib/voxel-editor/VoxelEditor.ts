import * as THREE from 'three';

export class VoxelEditor {
  gg: THREE.Group;

  constructor() {
    this.gg = new THREE.Group();

    const boxGeo = new THREE.BoxGeometry();
    const boxMat = new THREE.MeshStandardMaterial();
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);

    this.gg.add(boxMesh);
  }
}
