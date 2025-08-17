import { Board } from "../config/constants";
import { mergeBoards } from "./merge-boards";
import { memoizeAllBoards } from "./memoization/memoize-all-boards";

export function findSolutions(boardSize: number) {
  const memoizedBoards = memoizeAllBoards(boardSize);

  const solutions: number[][] = [];
  const stack: { queens: number[]; board: Board }[] = [];

  for (let i = 0; i < boardSize; i++) {
    let board = new Array(...(memoizedBoards[i] ?? []));
    stack.push({ queens: [i], board });
  }
  stack.reverse();

  while (stack.length > 0) {
    const state = stack.pop();
    if (!state) continue;

    const { queens, board } = state;

    if (queens.length === boardSize) {
      if (
        !solutions.find((solution) => solution.toString() === queens.toString())
      ) {
        solutions.push(queens);
      }

      continue;
    }

    const column = queens.length;
    for (let i = 0; i < boardSize; i++) {
      const coord = column * boardSize + i;
      if (board[coord]) continue;

      const newQueens = [...queens, coord].sort((a, b) => a - b);

      const boardForThisPiece = new Array(...(memoizedBoards[coord] ?? []));
      const boardAfterPlacingPiece = mergeBoards(board, boardForThisPiece);

      stack.push({
        queens: newQueens,
        board: boardAfterPlacingPiece,
      });
    }
  }

  return { solutions, memoizedBoards };
}
