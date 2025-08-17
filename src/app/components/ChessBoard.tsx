//@ts-ignore
import queen from "@/img/queen.png";

import { Board } from "@/config/constants";

import { useState } from "react";

export interface ChessBoardParams {
  queens: number[];
  boardSize: number;
  memoizedBoards: Board[];
}
export function ChessBoard({
  boardSize,
  queens,
  memoizedBoards,
}: ChessBoardParams) {
  const [selectedQueen, setSelectedQueen] = useState<number | null>(null);

  const highlightedSquares =
    selectedQueen !== null ? memoizedBoards[selectedQueen] : [];

  return (
    <div className="block">
      {createIterableBoard(boardSize).map((row, i) => (
        <div className=" p-0 m-0">
          {row.map((square, j) => (
            <span
              className={`inline-block h-8 w-8 ${highlightedSquares[i * boardSize + j] ? "bg-blue-500 border-2 border-white" : square === 1 ? "bg-yellow-200 p-px" : "bg-black p-px"}`}
            >
              {queens.includes(i * boardSize + j) && (
                <span
                  className="w-full block h-full"
                  onMouseEnter={() => setSelectedQueen(i * boardSize + j)}
                  onMouseLeave={() => setSelectedQueen(null)}
                >
                  <img src={queen} width={32} height={32} />
                </span>
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function createIterableBoard(boardSize: number): number[][] {
  let board: number[][] = [];

  for (let i = 0; i < boardSize; i++) {
    board.push([]);
    for (let j = 0; j < boardSize; j++) {
      const pos = (i % 2) + j;
      board[i].push(pos % 2);
    }
  }

  return board;
}
