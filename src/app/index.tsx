import { useMemo, useState } from "react";
import { findSolutions } from "../lib/find_solutions";
import { ChessBoard } from "./components/ChessBoard";

function App() {
  const [boardSize, setBoardSize] = useState(8);

  const { solutions, memoizedBoards } = useMemo(() => {
    return findSolutions(boardSize);
  }, [boardSize]);

  return (
    <main className="my-8">
      <h1 className="mb-8 text-center text-2xl font-bold uppercase sm:text-3xl">
        El problema de las n reinas
      </h1>
      <form className="mb-8 block">
        <div className="flex flex-col items-center">
          <label htmlFor="input-board">Tamaño del tablero </label>
          <span className="mt-2 flex items-center gap-1">
            <p>1</p>
            <input
              id="input-board"
              type="range"
              min={1}
              max={10}
              value={boardSize}
              onChange={(e) => setBoardSize(Number(e.target.value))}
            />
            <p>10</p>
          </span>
        </div>
      </form>
      <div className="mt-4">
        <p className="mb-8 text-center">
          Para un tablero de {boardSize}x{boardSize} con {boardSize} reina
          {boardSize !== 1 ? "s" : ""},{" "}
          {solutions.length !== 0
            ? `hay ${solutions.length}
            soluci${solutions.length === 1 ? "ón" : "ones"}: `
            : "no hay soluciones."}
        </p>
        {solutions.length > 0 && (
          <div className="mx-2 grid grid-cols-1 rounded border-2 border-gray-200 bg-gray-100 sm:mx-10 md:mx-16 md:grid-cols-2 lg:mx-20 lg:grid-cols-3">
            {solutions.map((solution, i) => (
              <div
                key={`solution-${boardSize}-${i}`}
                className="my-4 text-center"
              >
                <h2 className="text-xl">Solución {i + 1}</h2>
                <div className="flex w-full items-center justify-center leading-0">
                  <ChessBoard
                    queens={solution}
                    boardSize={boardSize}
                    memoizedBoards={memoizedBoards}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
