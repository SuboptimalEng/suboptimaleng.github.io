import { useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { githubDark } from '@uiw/codemirror-theme-github';

import { Helper } from '../../lib/utils';
import { SceneInit, ShaderSandbox } from '../../lib/shader-sandbox';

// NOTE: Function naming convention `${name}Game`;
export default function ShaderSandboxGame() {
  const windowRef = useRef(0);
  const [showEditor, setShowEditor] = useState(false);
  const [fragmentShader, setFragmentShader] = useState(`
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  float x = (uv.x + 1.0) / 2.0;
  float y = (uv.y + 1.0) / 2.0;

  vec3 green = vec3(x - y, 0.4, 0.0);

  float xOpacity = floor(uv.x * 20.0) / 20.0;
  float yOpacity = floor(uv.y * 20.0) / 20.0;
  float randomOpacity = rand(vec2(xOpacity, yOpacity));
  float minOpacity = 0.5 + randomOpacity * 0.5;

  if (u_mouse.x < uv.x + 0.005 && u_mouse.x > uv.x - 0.005) {
    gl_FragColor = vec4(0.75, 0, 0, 1);
  } else if (1. - u_mouse.y < uv.y + 0.01 && 1. - u_mouse.y > uv.y - 0.01) {
    gl_FragColor = vec4(0.75, 0, 0, 1);
  } else {
    gl_FragColor = vec4(green, minOpacity);
  }
}
`);

  useEffect(() => {
    Helper.maybeCreateCanvas();

    const test = new SceneInit('myThreeJsCanvas');

    const shaderSandbox = new ShaderSandbox(test.uniforms, fragmentShader);

    test.scene.add(shaderSandbox.gg);

    const update = (t: number) => {
      test.update();
      // shaderSandbox.update(t);

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
  }, [fragmentShader]);

  const handleOnChange = (value: string) => {
    setFragmentShader(value);
  };

  const toggleEditor = () => {
    setShowEditor(!showEditor);
  };

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
      <div className="absolute inset-x-8 inset-y-24">
        <div className="flex flex-col h-full w-full place-items-center justify-center">
          <div className="absolute -top-9 left-0">
            <button
              onClick={toggleEditor}
              className="border-2 p-1 bg-black text-white text-xs opacity-75"
            >
              {showEditor ? <div>Hide Editor</div> : <div>Show Editor</div>}
            </button>
          </div>
          {showEditor && (
            <CodeMirror
              theme={githubDark}
              value={fragmentShader}
              onChange={handleOnChange}
              width="100%"
              height="100%"
              className="w-full h-full border-2 opacity-90"
            />
          )}
        </div>
      </div>
    </div>
  );
}
