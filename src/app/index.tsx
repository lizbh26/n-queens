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
      <h1 className="text-3xl mb-8 font-bold uppercase text-center">
        El problema de las n reinas
      </h1>
      <form className="mb-8 block">
        <div className="flex justify-center gap-7 mt-4">
          <div className="flex flex-col items-center">
            <label htmlFor="input-board">Tamaño del tablero </label>
            <span className="flex gap-1 items-center mt-4">
              <p>1</p>
              <input
                id="input-board"
                type="range"
                min={1}
                max={8}
                value={boardSize}
                onChange={(e) => setBoardSize(Number(e.target.value))}
              />
              <p>8</p>
            </span>
          </div>
        </div>
      </form>
      <div className="mt-4">
        <p className="text-center mb-8">
          Para un tablero de {boardSize}x{boardSize} con {boardSize} reina
          {boardSize !== 1 ? "s" : ""},{" "}
          {solutions.length !== 0
            ? `hay ${solutions.length}
            soluci${solutions.length === 1 ? "ón" : "ones"}: `
            : "no hay soluciones."}
        </p>
        {solutions.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {solutions.map((solution, i) => (
              <div className="text-center my-2">
                <h2 className="text-xl">Solución {i + 1}</h2>
                <div
                  key={solution.toString()}
                  className="flex justify-center w-full items-center"
                >
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
