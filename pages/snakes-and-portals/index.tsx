import { useEffect, useRef } from 'react';

import { Helper } from '../../lib/utils';
import { Board, Snake, SceneInit } from '../../lib/snakes-and-portals';

// NOTE: Function naming convention `${name}Game`;
export default function SnakeGame() {
  const windowRef = useRef(0);

  useEffect(() => {
    Helper.maybeCreateCanvas();

    const test = new SceneInit('myThreeJsCanvas');

    const board = new Board();
    test.scene.add(board.gg);

    const snake = new Snake(board.boardSize, board.portalPairPositions);
    test.scene.add(snake.gg);
    test.scene.add(snake.snackGroup);

    const update = (t: number) => {
      test.update();
      board.update(t);
      snake.update(t);

      // keep track of animation frame in windowRef.current
      windowRef.current = window.requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
    // update();

    // add event listener to handle snake movement
    window.addEventListener('keydown', (e: KeyboardEvent) =>
      snake.handleMovement(e)
    );

    return () => {
      console.log('on component unmount');

      // remove scene
      test.destroy();

      // stop window request animation frame function
      window.cancelAnimationFrame(windowRef.current);

      Helper.removeCanvas();
    };
  });

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}
