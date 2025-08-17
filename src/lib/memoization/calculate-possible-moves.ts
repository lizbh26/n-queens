import { Board, Coord } from "@/config/constants";

export function calculatePossibleMoves(
  { x: pos_x, y: pos_y }: Coord,
  boardSize: number,
): Board {
  const board: Board = new Array(boardSize * boardSize).fill(false);

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const pos = y * boardSize + x;
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
