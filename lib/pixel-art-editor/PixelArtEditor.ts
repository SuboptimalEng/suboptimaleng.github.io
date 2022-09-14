class PixelArtEditor {
  constructor(canvasId: string) {
    let canvas = <HTMLCanvasElement>document.getElementById(canvasId);
    let ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

    ctx.lineWidth = 10;

    // Wall
    ctx.strokeRect(75, 140, 150, 110);

    // Door
    ctx.fillRect(130, 190, 40, 60);

    // Roof
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();
  }
}

export { PixelArtEditor };
