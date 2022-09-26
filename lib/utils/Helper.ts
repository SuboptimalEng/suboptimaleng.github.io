export class Helper {
  static removeCanvas() {
    // remove canvas element so it does not get displayed on home page
    const canvas = document.getElementById('myThreeJsCanvas') as Node;
    const parent = canvas.parentNode as Node;
    parent.removeChild(canvas);
  }

  static maybeCreateCanvas() {
    // add canvas if no canvas element exists; can happen on hot-reload
    // e.g. the canvas element gets removed when this component dismounts
    // but then the SceneInit.ts function tries to find the HTML Canvas
    // and errors out.
    let canvas = document.getElementById(
      'myThreeJsCanvas'
    ) as HTMLCanvasElement;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'myThreeJsCanvas';
      document.body.appendChild(canvas);
    }
  }
}
