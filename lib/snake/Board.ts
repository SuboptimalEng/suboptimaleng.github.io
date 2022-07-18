class Board {
  // 2d board array
  board: Array<Array<string>>;

  constructor() {
    let a = 'b';

    // 'h' - represents the head of the snake
    // 't' - represents the tail of the snake
    this.board = [
      ['0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
      ['0', 'h', '1', 't', '0'],
      ['0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
    ];
  }
}

export default Board;
