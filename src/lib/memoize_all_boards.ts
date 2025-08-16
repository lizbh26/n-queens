import { Board, BOARD_SIZE } from "../config/constants";
import { calculatePossibleMoves } from "./calculate-possible-moves";

export function memoizeAllBoards(): Board[] {
  const boards: Board[] = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const board = calculatePossibleMoves({ x, y });

      //   console.log("------------------");
      //   for (let i = 0; i < BOARD_SIZE; i++) {
      //     console.log(
      //       board.slice(i * BOARD_SIZE, i * BOARD_SIZE + BOARD_SIZE).join(", ")
      //     );
      //   }
      //   console.log("------------------\n");

      boards.push(board);
    }
  }

  return boards;
}
