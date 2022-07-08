import { useEffect, useRef } from 'react';

import CannonDebugger from 'cannon-es-debugger';

import { FranticArchitect, SceneInit } from '../../lib/frantic-architect';

function FranticArchitectGame() {
  const windowRef = useRef(0);
  let gui: any;

  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');

    const franticArchitect = new FranticArchitect();
    test.scene.add(franticArchitect.gg);

    const cannonDebugger = CannonDebugger(test.scene, franticArchitect.world);

    const initGui = async () => {
      const dat = await import('dat.gui');
      gui = new dat.GUI();
      gui
        .add(test, 'cameraRotationDepth', 5, 100)
        .name('Camera Distance')
        .onChange((value: any) => {
          // TODO: Change camera position every 10 units.
          // const newY = Math.round((value / 10) % 5) + 5;
          // if (test.camera.position.y !== newY) {
          //   test.camera.lookAt(new THREE.Vector3(0, newY, 0));
          //   test.camera.position.y = newY;
          // }
        });
    };
    initGui();

    const animate = () => {
      const dt = test.clock.getDelta();

      test.update();
      test.udpateCameraPosition();

      // run this when debugging
      cannonDebugger.update();

      franticArchitect.update(dt);
      franticArchitect.animatePhantomGroup();
      franticArchitect.animateCompoundShapeGroup();

      requestAnimationFrame(animate);
    };
    animate();

    const onClick = (event: MouseEvent) => {
      franticArchitect.acceptPhantomBlock();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        franticArchitect.acceptPhantomBlock();
      }
    };

    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      console.log('on component unmount');

      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);

      // remove scene
      test.destroy();

      // stop window request animation frame function
      window.cancelAnimationFrame(windowRef.current);

      // remove canvas element so it does not get displayed on home page
      const canvas = document.getElementById('myThreeJsCanvas') as Node;
      const parent = canvas.parentNode as Node;
      parent.removeChild(canvas);

      // remove dat.GUI
      gui.destroy();
    };
  }, []);

  return (
    <div>
      {/* <a href="https://thegamedex.com">
        <div className="absolute m-4 text-4xl">⬅️</div>
      </a> */}
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default FranticArchitectGame;
