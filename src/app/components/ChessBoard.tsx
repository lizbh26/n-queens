//@ts-ignore
import queen from "@/img/queen.png";

import { BOARD_SIZE } from "@/config/constants";
import { useState } from "react";
import { MEMOIZED_BOARDS } from "@/config/memoized";

export interface ChessBoardParams {
  queens: number[];
}
export function ChessBoard({ queens }: ChessBoardParams) {
  const [selectedQueen, setSelectedQueen] = useState<number | null>(null);

  const highlightedSquares =
    selectedQueen !== null ? MEMOIZED_BOARDS[selectedQueen] : [];

  return (
    <div>
      {createIterableBoard().map((row, i) => (
        <div className=" p-0 m-0">
          {row.map((square, j) => (
            <span
              className={`inline-block h-8 w-8 ${highlightedSquares[i * BOARD_SIZE + j] ? "bg-blue-500 border-2 border-white" : square === 1 ? "bg-yellow-200 p-px" : "bg-black p-px"}`}
            >
              {queens.includes(i * BOARD_SIZE + j) && (
                <span
                  className="w-full block h-full"
                  onMouseEnter={() => setSelectedQueen(i * BOARD_SIZE + j)}
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

function createIterableBoard(): number[][] {
  let board: number[][] = [];

  for (let i = 0; i < BOARD_SIZE; i++) {
    board.push([]);
    for (let j = 0; j < BOARD_SIZE; j++) {
      const pos = (i % 2) + j;
      board[i].push(pos % 2);
    }
  }

  return board;
}
