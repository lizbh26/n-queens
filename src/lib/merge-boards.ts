import { Board, BOARD_SIZE } from "../config/constants";

export function mergeBoards(b1: Board, b2: Board): Board {
  return Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map(
    (_, i) => b1[i] || b2[i]
  );
}
