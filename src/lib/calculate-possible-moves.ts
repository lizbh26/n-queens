import { Board, BOARD_SIZE, Coord } from "../config/constants";

export function calculatePossibleMoves({ x: pos_x, y: pos_y }: Coord): Board {
  const board: Board = new Array(BOARD_SIZE * BOARD_SIZE).fill(false);

  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const pos = y * BOARD_SIZE + x;
      if (
        x === pos_x ||
        y === pos_y ||
        Math.abs(pos_x - x) === Math.abs(pos_y - y)
      ) {
        board[pos] = true;
      }
    }
  }

  return board;
}
