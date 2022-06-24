import { useEffect, useRef } from 'react';

import { SceneInit } from '../../lib/SceneInit';
import { SnakeGame } from '../../lib/snake/Snake';

function Snake() {
  const windowRef = useRef(0);

  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    const snakeGame = new SnakeGame();
    test.scene.add(snakeGame.group);

    const update = () => {
      test.update();
      snakeGame.update();

      // keep track of animation frame in windowRef.current
      windowRef.current = window.requestAnimationFrame(update);
    };
    update();

    return () => {
      console.log('on component unmount');

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

export default Snake;
