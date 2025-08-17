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
    <div className="block border-2 border-black">
      {createIterableBoard(boardSize).map((row, i) => (
        <div key={`board-${boardSize}_row-${i}`} className="m-0 p-0">
          {row.map((square, j) => {
            const position = i * boardSize + j;
            return (
              <span
                key={`board-${boardSize}_row-${i}_square-${j}`}
                className={`inline-block h-6 w-6 cursor-pointer transition sm:h-8 sm:w-8 sm:cursor-default ${highlightedSquares[i * boardSize + j] ? "border-2 border-white bg-blue-500" : square === 1 ? "bg-yellow-100 p-px" : "bg-black p-px"}`}
              >
                {queens.includes(position) && (
                  <span
                    key={`${boardSize}-queen-${position}`}
                    className="block h-full w-full"
                    onMouseEnter={() => setSelectedQueen(position)}
                    onMouseLeave={() => setSelectedQueen(null)}
                    onClick={() =>
                      setSelectedQueen(
                        selectedQueen === position ? null : position,
                      )
                    }
                  >
                    <img src={queen} className="h-6 w-6 sm:h-8 sm:w-8" />
                  </span>
                )}
              </span>
            );
          })}
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
