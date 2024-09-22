import React from "react";

type TProgress = "alicePlay" | "bobPlay" | "aliceWin" | "bobWin" | "tie";
type TCell = " " | "X" | "O";
type TBoard = [
  [TCell, TCell, TCell],
  [TCell, TCell, TCell],
  [TCell, TCell, TCell]
];

type TGameContext = {
  progress: TProgress;
  board: TBoard;
  setCell: (r: number, c: number, cell: TCell) => void;
  reset: () => void;
};

const GameContext = React.createContext<TGameContext | null>(null);

const initialBoard: TBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
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
    const winPatterns = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ], // rows
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ], // columns
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ], // diagonals
    ];

    return winPatterns.some((pattern) =>
      pattern.every(([r, c]) => board[r][c] === player)
    );
  };

  const setCell = React.useCallback((r: number, c: number, cell: TCell) => {
    setGame((prevGame) => {
      const newBoard = structuredClone(prevGame.board);
      if (newBoard[r][c] !== " ") {
        throw new Error(`This cell (${r}, ${c}) has been set`);
      }
      newBoard[r][c] = cell;

      let newProgress: TProgress;
      if (checkWin(newBoard, cell)) {
        newProgress = cell === "X" ? "aliceWin" : "bobWin";
      } else if (newBoard.flat().every((cell) => cell !== " ")) {
        newProgress = "tie";
      } else {
        newProgress = cell === "X" ? "bobPlay" : "alicePlay";
      }

      return {
        board: newBoard,
        progress: newProgress,
      };
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
