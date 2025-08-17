import { Board } from "../config/constants";
import { mergeBoards } from "./merge-boards";
import { memoizeAllBoards } from "./memoization/memoize-all-boards";

export function findSolutions(boardSize: number, numberOfQueens: number) {
  const memoizedBoards = memoizeAllBoards(boardSize);

  const solutions: number[][] = [];
  const stack: { queens: number[]; board: Board }[] = [];

  for (let i = 0; i < boardSize; i++) {
    let board = new Array(...(memoizedBoards[i] ?? []));
    stack.push({ queens: [i], board });
  }
  stack.reverse();

  while (stack.length > 0) {
    console.count();
    const state = stack.pop();
    if (!state) continue;

    const { queens, board } = state;

    const freeSpaces = findNonThreatenedSpaces(board);
    if (freeSpaces.length === 0) {
      if (queens.length < numberOfQueens) continue;

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

    for (let i = 0; i < boardSize; i++) {
      //If square is threatened, skip
      if (board[column * boardSize + i]) continue;

      const boardForThisPiece = new Array(
        ...(memoizedBoards[column * boardSize + i] ?? [])
      );

      stack.push({
        queens: [...queens, column * boardSize + i],
        board: mergeBoards(board, boardForThisPiece),
      });
    }
  }

  return { solutions, memoizedBoards };
}

function findNonThreatenedSpaces(board: Board): number[] {
  const spaces: number[] = [];
  board.forEach((threatened, i) => !threatened && spaces.push(i));
  return spaces;
}
