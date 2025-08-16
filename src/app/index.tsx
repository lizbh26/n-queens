import { useEffect, useState } from "react";
import { findSolutions } from "../lib/find_solutions";
import { BOARD_SIZE, QUEENS } from "../config/constants";

function App() {
  const [solutions, setSolutions] = useState<number[][]>([]);

  useEffect(() => {
    async function calculateSolutions() {
      const solutions = findSolutions() ?? [];
      setSolutions(solutions);
    }

    calculateSolutions();
  }, []);

  if (solutions.length === 0) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main>
      <div className="grid grid-cols-3">
        {solutions.map((solution) => (
          <div key={solution.toString()} className="flex gap-2 my-2">
            {"["}
            {Array.from({ length: QUEENS }).map((_, q) => (
              <div key={solution.toString() + q}>{solution[q] ?? -1}</div>
            ))}
            {"]"}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
