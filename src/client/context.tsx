import React from "react";

type TProgress = "alicePlay" | "bobPlay" | "aliceWin" | "bobWin" | "tie";
type TCell = " " | "X" | "O";
type TBoard = TCell[];

type TGameContext = {
  progress: TProgress;
  board: TBoard;
  setCell: (r: number, c: number) => void;
  reset: () => void;
};

const GameContext = React.createContext<TGameContext | null>(null);

const initialBoard: TBoard = Array(9).fill(" ");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [game, setGame] = React.useState<{
    progress: TProgress;
    board: TBoard;
  }>({
    progress: "alicePlay",
    board: initialBoard,
  });

  const checkWin = (board: TBoard, player: TCell): boolean => {
    return winPatterns.some((pattern) =>
      pattern.every((index) => board[index] === player)
    );
  };

  const setCell = React.useCallback((r: number, c: number) => {
    setGame((prevGame) => {
      const index = r * 3 + c;
      if (prevGame.board[index] !== " ") {
        throw new Error(`This cell (${r}, ${c}) has been set`);
      }

      const newBoard = [...prevGame.board];
      const currentPlayer = prevGame.progress === "alicePlay" ? "X" : "O";
      newBoard[index] = currentPlayer;

      let newProgress: TProgress;
      if (checkWin(newBoard, currentPlayer)) {
        newProgress = currentPlayer === "X" ? "aliceWin" : "bobWin";
      } else if (newBoard.every((cell) => cell !== " ")) {
        newProgress = "tie";
      } else {
        newProgress = currentPlayer === "X" ? "bobPlay" : "alicePlay";
      }

      return { board: newBoard, progress: newProgress };
    });
  }, []);

  const reset = React.useCallback(() => {
    setGame({
      progress: "alicePlay",
      board: initialBoard,
    });
  }, []);

  return (
    <GameContext.Provider value={{ ...game, setCell, reset }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
