import { useEffect, useRef } from 'react';

import * as THREE from 'three';

import { SceneInit } from '../../lib/SceneInit';

function Snake() {
  const windowRef = useRef(0);

  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.animate();

    const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    test.scene.add(boxMesh);

    const animate = () => {
      boxMesh.rotateX(0.01);
      windowRef.current = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      // remove scene
      test.destroy();

      // stop animation frame
      window.cancelAnimationFrame(windowRef.current);

      // remove canvas element so it does not get displayed on home page
      const canvas = document.getElementById('myThreeJsCanvas') as Node;
      const parent = canvas.parentNode as Node;
      parent.removeChild(canvas);
    };
  });

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default Snake;
