import { Board } from "../../config/constants";
import { calculatePossibleMoves } from "./calculate-possible-moves";

export function memoizeAllBoards(boardSize: number): Board[] {
  const boards: Board[] = [];
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const board = calculatePossibleMoves({ x, y }, boardSize);
      boards.push(board);
    }
  }

  return boards;
}
