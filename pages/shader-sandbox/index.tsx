import { useEffect, useRef, useState } from 'react';

import { Helper } from '../../lib/utils';
import { SceneInit, ShaderSandbox } from '../../lib/shader-sandbox';

// NOTE: Function naming convention `${name}Game`;
export default function ShaderSandboxGame() {
  const windowRef = useRef(0);

  const [fragmentShader, setFragmentShader] = useState(`
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution;

      if (u_mouse.x < uv.x + 0.01 && u_mouse.x > uv.x - 0.01) {
        gl_FragColor = vec4(1, 0, 0, 0.9);
      } else if (1. - u_mouse.y < uv.y + 0.01 && 1. - u_mouse.y > uv.y - 0.01) {
        gl_FragColor = vec4(1, 0, 0, 0.9);
      } else {
        gl_FragColor = vec4(1. * uv.x, abs(sin(u_time)), 0, 0.9);
      }
  }
  `);

  useEffect(() => {
    Helper.maybeCreateCanvas();

    const test = new SceneInit('myThreeJsCanvas');

    const shaderSandbox = new ShaderSandbox(test.uniforms, fragmentShader);

    test.scene.add(shaderSandbox.gg);

    // const board = new Board();
    // test.scene.add(board.gg);
    // const snake = new Snake(board.boardSize, board.portalPairPositions);
    // test.scene.add(snake.gg);
    // test.scene.add(snake.snackGroup);

    const update = (t: number) => {
      test.update();
      // shaderSandbox.update(t);
      // board.update(t);
      // snake.update(t);

      // keep track of animation frame in windowRef.current
      windowRef.current = window.requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
    // update();

    // add event listener to handle snake movement
    // window.addEventListener('keydown', (e: KeyboardEvent) =>
    //   snake.handleMovement(e)
    // );

    return () => {
      console.log('on component unmount');

      // remove scene
      test.destroy();

      // stop window request animation frame function
      window.cancelAnimationFrame(windowRef.current);

      Helper.removeCanvas();
    };
  }, [fragmentShader]);

  const handleOnChange = (e: any) => {
    let { name, value } = e.target;
    setFragmentShader(value);
  };

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
      <div className="flex-col space-y-4">
        <input type="text" value={fragmentShader} onChange={handleOnChange} />
        <p>{fragmentShader}</p>
      </div>
    </div>
  );
}
