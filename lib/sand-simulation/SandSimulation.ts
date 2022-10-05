export class SandSimulation {
  canvasId: string;
  canvas: HTMLCanvasElement;
  cc: CanvasRenderingContext2D;

  pixelWidth: number;
  pixelHeight: number;

  mouseX: number = 0;
  mouseY: number = 0;
  mouseDown: boolean = false;

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
  }

  private drawPixel(blockType: number, row: number, col: number) {
    if (blockType === 0) {
      this.cc.fillStyle = 'white';
    } else if (blockType === 1) {
      this.cc.fillStyle = 'brown';
    } else if (blockType === 2) {
      this.cc.fillStyle = 'blue';
    }
    this.cc.fillRect(
      row * this.pixelWidth,
      col * this.pixelHeight,
      this.pixelWidth,
      this.pixelHeight
    );
  }

  onMouseMove = (event: MouseEvent) => {
    if (this.mouseDown) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }
  };

  onMouseUp = (event: MouseEvent) => {
    this.mouseDown = false;
  };

  onMouseDown = (event: MouseEvent) => {
    this.mouseDown = true;
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  addEventListeners() {
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
  }

  removeEventListeners() {
    this.canvas.removeEventListener('mouseup', this.onMouseUp);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
  }

  render() {
    for (let i = 0; i < this.sandbox.length; i++) {
      for (let j = 0; j < this.sandbox[i].length; j++) {
        this.drawPixel(this.sandbox[i][j], j, i);
      }
    }
  }

  sandBlockOutOfBounds(i: number, j: number) {
    if (i >= this.sandbox.length - 1) {
      return true;
    }
    if (j === 0 || j === this.sandbox[i].length - 1) {
      return true;
    }
    return false;
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

        // sand block
        if (this.sandbox[i][j] === 1) {
          if (this.sandBlockOutOfBounds(i, j)) {
            continue;
          }
          if (this.sandbox[i + 1][j] === 0) {
            this.resetBlock(i, j);
            this.sandbox[i + 1][j] = 1;
          } else if (this.sandbox[i + 1][j + 1] === 0) {
            this.resetBlock(i, j);
            this.sandbox[i + 1][j + 1] = 1;
          } else if (this.sandbox[i + 1][j - 1] === 0) {
            this.resetBlock(i, j);
            this.sandbox[i + 1][j - 1] = 1;
          }
        }

        // water block
        if (this.sandbox[i][j] === 2) {
          if (i + 1 < this.sandbox.length && this.sandbox[i + 1][j] === 0) {
            this.resetBlock(i, j);
            this.sandbox[i + 1][j] = 2;
          } else if (
            i + 1 < this.sandbox.length &&
            this.sandbox[i + 1][j + 1] === 0
          ) {
            this.resetBlock(i, j);
            this.sandbox[i + 1][j + 1] = 2;
          } else if (
            i + 1 < this.sandbox.length &&
            this.sandbox[i + 1][j - 1] === 0
          ) {
            this.resetBlock(i, j);
            this.sandbox[i + 1][j - 1] = 2;
          } else if (j - 1 > 0 && this.sandbox[i][j - 1] === 0) {
            this.resetBlock(i, j);
            this.sandbox[i][j - 1] = 2;
          } else if (
            j + 1 < this.sandbox[i].length &&
            this.sandbox[i][j + 1] === 0
          ) {
            this.resetBlock(i, j);
            this.sandbox[i][j + 1] = 2;
          }
        }
      }
    }

    // add sand after the render step
    if (this.mouseDown) {
      const rect = this.canvas.getBoundingClientRect();
      const x = this.mouseX - rect.left;
      const y = this.mouseY - rect.top;
      const row = Math.round(y / this.cols);
      const col = Math.round(x / this.rows);
      this.sandbox[row][col] = 2;
    }
  }

  resetBlock(i: number, j: number) {
    this.sandbox[i][j] = 0;
  }
}
