import { useEffect, useRef } from 'react';
import { Helper } from '../../lib/utils';
import { SceneInit, VoxelEditor } from '../../lib/voxel-editor';

export default function VoxelEditorGame() {
  const windowRef = useRef(0);

  useEffect(() => {
    Helper.maybeCreateCanvas();

    const test = new SceneInit('myThreeJsCanvas');
    const voxelEditor = new VoxelEditor();
    test.scene.add(voxelEditor.gg);
    // const snake = new Snake(board.boardSize, board.portalPairPositions);
    // test.scene.add(snake.gg);
    // test.scene.add(snake.snackGroup);

    const update = (t: number) => {
      test.update();
      // board.update(t);
      // snake.update(t);

      // keep track of animation frame in windowRef.current
      windowRef.current = window.requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
    // update();

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
