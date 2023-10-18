export class Helper {
  static getCanvasId(): string {
    return 'myCanvasId';
  }

  static removeCanvas() {
    const canvasId = Helper.getCanvasId();
    // remove canvas element so it does not get displayed on home page
    const canvas = document.getElementById(canvasId) as Node;
    const parent = canvas.parentNode as Node;
    parent.removeChild(canvas);
  }

  static maybeCreateCanvas(): string {
    // add canvas if no canvas element exists; can happen on hot-reload
    // e.g. the canvas element gets removed when this component dismounts
    // but then the SceneInit.ts function tries to find the HTML Canvas
    // and errors out.
    const canvasId = Helper.getCanvasId();
    let canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = canvasId;
      document.body.appendChild(canvas);
    }
    return canvasId;
  }
}
