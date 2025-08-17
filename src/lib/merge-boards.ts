import { Board } from "../config/constants";

export function mergeBoards(b1: Board, b2: Board): Board {
  return Array.from({ length: Math.max(b1.length, b2.length) }).map(
    (_, i) => b1[i] || b2[i]
  );
}
