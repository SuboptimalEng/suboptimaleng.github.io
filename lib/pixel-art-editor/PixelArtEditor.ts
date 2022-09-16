class PixelArtEditor {
  // canvas context
  private cc;
  private canvas;

  // x1, y1, x2, y2
  private verticalPaths = [
    [0, 0, 0, 600],
    [100, 0, 100, 600],
    [200, 0, 200, 600],
    [300, 0, 300, 600],
    [400, 0, 400, 600],
    [500, 0, 500, 600],
    [600, 0, 600, 600],
  ];

  private horizontalPaths = [
    [0, 0, 600, 0],
    [0, 100, 600, 100],
    [0, 200, 600, 200],
    [0, 300, 600, 300],
    [0, 400, 600, 400],
    [0, 500, 600, 500],
    [0, 600, 600, 600],
  ];

  constructor(canvasId: string) {
    this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
    this.cc = <CanvasRenderingContext2D>this.canvas.getContext('2d');

    this.createPixelOutline();
  }

  createPixelOutline() {
    this.cc.lineWidth = 0.5;

    this.cc.beginPath();
    this.verticalPaths.forEach((p) => {
      let [x1, y1, x2, y2] = p;
      this.cc.moveTo(x1, y1);
      this.cc.lineTo(x2, y2);
    });
    this.horizontalPaths.forEach((p) => {
      let [x1, y1, x2, y2] = p;
      this.cc.moveTo(x1, y1);
      this.cc.lineTo(x2, y2);
    });
    this.cc.stroke();
  }

  findNearestSquare(x: number, y: number): { x: number; y: number } {
    console.log(x, y);

    let newX = Math.floor(x / 100) * 100;
    let newY = Math.floor(y / 100) * 100;

    return {
      x: newX,
      y: newY,
    };
  }

  onMouseMove(e: MouseEvent) {
    let rect = this.canvas.getBoundingClientRect();
    let pos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // this.cc.beginPath();
    // this.cc.strokeRect(0, 0, 100, 100);
    let nearestSquare = this.findNearestSquare(pos.x, pos.y);
    this.cc.fillRect(nearestSquare.x, nearestSquare.y, 100, 100);
    // this.cc.moveTo(0, 0);
    // this.cc.lineTo(0, 100);
    // this.cc.lineTo(100, 100);
    // this.cc.closePath();
    // this.cc.stroke();

    // console.log('mouse is moving', pos);
  }

  createHouse() {
    this.cc.lineWidth = 10;

    // Wall
    this.cc.strokeRect(75, 140, 150, 110);

    // Door
    this.cc.fillRect(130, 190, 40, 60);

    // Roof
    this.cc.beginPath();
    this.cc.moveTo(50, 140);
    this.cc.lineTo(150, 60);
    this.cc.lineTo(250, 140);
    this.cc.closePath();
    this.cc.stroke();
  }
}

export { PixelArtEditor };
