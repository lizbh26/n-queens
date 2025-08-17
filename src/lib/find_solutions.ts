import { Board, BOARD_SIZE, QUEENS } from "../config/constants";
import { memoizeAllBoards } from "./memoize_all_boards";
import { mergeBoards } from "./merge-boards";

export function findSolutions() {
  const memoizedMoves = memoizeAllBoards();

  const solutions: number[][] = [];
  const stack: { queens: number[]; board: Board }[] = [];

  for (let i = 0; i < BOARD_SIZE; i++) {
    let board = new Array(...(memoizedMoves[i] ?? []));
    stack.push({ queens: [i], board });
  }
  stack.reverse();

  while (stack.length > 0) {
    const state = stack.pop();
    if (!state) continue;

    const { queens, board } = state;

    if (queens.length >= QUEENS) {
      queens.sort((a, b) => a - b);

      if (
        !solutions.find((solution) => solution.toString() === queens.toString())
      ) {
        solutions.push(queens);
      }

      continue;
    }

    // There can only be one queen per column, so it only checks one column at a time
    const column = queens.length;

    for (let i = 0; i < BOARD_SIZE; i++) {
      //If square is threatened, skip
      if (board[column * BOARD_SIZE + i]) continue;

      const boardForThisPiece = new Array(
        ...(memoizedMoves[column * BOARD_SIZE + i] ?? [])
      );

      stack.push({
        queens: [...queens, column * BOARD_SIZE + i],
        board: mergeBoards(board, boardForThisPiece),
      });
    }
  }

  return solutions;
}
