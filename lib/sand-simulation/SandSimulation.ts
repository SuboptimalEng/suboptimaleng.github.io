export class SandSimulation {
  canvasId: string;
  canvas: HTMLCanvasElement;
  cc: CanvasRenderingContext2D;

  pixelWidth: number;
  pixelHeight: number;

  rows: number = 20;
  cols: number = 20;

  // 0 -> empty
  // 1 -> sand
  // 2 -> water
  sandbox: Array<Array<number>>;

  constructor(canvasId: string) {
    this.canvasId = canvasId;
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.cc = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.pixelWidth = this.canvas.width / this.cols;
    this.pixelHeight = this.canvas.height / this.rows;

    this.sandbox = [];
    for (let i = 0; i < this.rows; i++) {
      const arr = new Array(this.cols).fill(0);
      this.sandbox.push([...arr]);
    }

    this.sandbox[0][1] = 1;
    this.sandbox[1][1] = 1;
    this.sandbox[2][1] = 1;
    this.sandbox[3][1] = 1;
    this.sandbox[4][1] = 1;
    this.sandbox[5][1] = 1;
    this.sandbox[6][1] = 1;
    this.sandbox[7][1] = 1;
    this.sandbox[8][1] = 1;
    this.sandbox[9][1] = 1;
    this.sandbox[10][1] = 1;
    this.sandbox[11][1] = 1;
    this.sandbox[12][1] = 1;
    this.sandbox[13][1] = 1;
    this.sandbox[14][1] = 1;
    this.sandbox[15][1] = 1;
    this.sandbox[16][1] = 1;
  }

  private drawPixel(blockType: number, row: number, col: number) {
    if (blockType === 0) {
      this.cc.fillStyle = 'white';
    } else if (blockType === 1) {
      this.cc.fillStyle = 'brown';
    }
    this.cc.fillRect(
      row * this.pixelWidth,
      col * this.pixelHeight,
      this.pixelWidth,
      this.pixelHeight
    );
  }

  setAsSand(row: number, col: number) {
    this.sandbox[row][col] = 1;
  }

  onMouseDown = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let row = Math.floor(y / this.cols);
    let col = Math.floor(x / this.rows) + 1;

    this.setAsSand(row, col);
  };

  addEventListeners() {
    this.canvas.addEventListener('mousedown', this.onMouseDown);
  }

  removeEventListeners() {
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
  }

  render() {
    for (let i = 0; i < this.sandbox.length; i++) {
      for (let j = 0; j < this.sandbox[i].length; j++) {
        this.drawPixel(this.sandbox[i][j], j, i);
      }
    }
  }

  step() {
    // iterate from the bottom row to the top row
    // this ensures that the current sand block can always below
    for (let i = this.sandbox.length - 1; i >= 0; i--) {
      for (let j = 0; j < this.sandbox[i].length; j++) {
        // if empty space, do nothing
        if (this.sandbox[i][j] === 0) {
          continue;
        }

        if (i === this.sandbox.length - 1) {
          // if final row and final col, do nothing
          if (j === 0 || j === this.sandbox[i].length - 1) {
            continue;
          } else {
            // todo: do something if water
            continue;
          }
        }

        if (this.sandbox[i][j] === 1) {
          if (this.sandbox[i + 1][j] === 0) {
            this.sandbox[i][j] = 0;
            this.sandbox[i + 1][j] = 1;
          } else if (this.sandbox[i + 1][j + 1] === 0) {
            this.sandbox[i][j] = 0;
            this.sandbox[i + 1][j + 1] = 1;
          } else if (this.sandbox[i + 1][j - 1] === 0) {
            this.sandbox[i][j] = 0;
            this.sandbox[i + 1][j - 1] = 1;
          }
        }
      }
    }
  }
}
