import { useEffect, useRef } from 'react';

import { Snake } from './Snake';
import { SceneInit } from '../../lib/SceneInit';

export default function SnakeGame() {
  const windowRef = useRef(0);

  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    const snake = new Snake();
    test.scene.add(snake.group);

    const update = () => {
      test.update();
      snake.update();

      // keep track of animation frame in windowRef.current
      windowRef.current = window.requestAnimationFrame(update);
    };
    update();

    return () => {
      // console.log('on component unmount');

      // remove scene
      test.destroy();

      // stop window request animation frame function
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
