import { useEffect } from 'react';

import * as THREE from 'three';

import { SceneInit } from '../../lib/SceneInit';

function Snake() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.animate();

    const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    test.scene.add(boxMesh);

    const animate = () => {
      boxMesh.rotateX(0.01);
      window.requestAnimationFrame(animate);
    };
    animate();
  });

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default Snake;
