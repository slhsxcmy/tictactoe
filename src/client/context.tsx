import React from "react";

type TGameState = "alicePlay" | "bobPlay" | "aliceWin" | "bobWin";
type TCell = " " | "X" | "O";
type TBoard = [
  [TCell, TCell, TCell],
  [TCell, TCell, TCell],
  [TCell, TCell, TCell]
];

type TGameContext = {
  gameState: TGameState;
  //   setGameState: React.Dispatch<React.SetStateAction<TGameState>>;
  board: TBoard;
  setCell: (r: number, c: number, cell: TCell) => void;
  reset: () => void;
};

const GameContext = React.createContext<TGameContext | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = React.useState<TGameState>("alicePlay");
  const [board, setBoard] = React.useState<TBoard>([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);

  const setCell = React.useCallback(
    (r: number, c: number, cell: TCell) => {
      const newBoard = structuredClone(board);
      if (newBoard[r][c] !== " " && newBoard[r][c] !== cell) {
        throw new Error("The other player has set this cell");
      }
      newBoard[r][c] = cell;

      //   console.log(r, c, cell, JSON.stringify(newBoard, null, 2));

      let win = null;
      // check victory
      for (let i = 0; i < 3; i += 1) {
        if (
          newBoard[i][0] !== " " &&
          newBoard[i][0] === newBoard[i][1] &&
          newBoard[i][0] === newBoard[i][2]
        ) {
          win = newBoard[i][0];
        }

        if (
          newBoard[0][i] !== " " &&
          newBoard[0][i] === newBoard[1][i] &&
          newBoard[0][i] === newBoard[2][i]
        ) {
          win = newBoard[0][i];
        }
      }

      if (
        newBoard[1][1] !== " " &&
        newBoard[1][1] === newBoard[0][0] &&
        newBoard[1][1] === newBoard[2][2]
      ) {
        win = newBoard[1][1];
      }

      if (
        newBoard[1][1] !== " " &&
        newBoard[1][1] === newBoard[0][2] &&
        newBoard[1][1] === newBoard[2][0]
      ) {
        win = newBoard[1][1];
      }

      setBoard(newBoard);
      if (win === "X") {
        setGameState("aliceWin");
      } else if (win === "O") {
        setGameState("bobWin");
      } else if (cell === "X") {
        setGameState("bobPlay");
      } else if (cell === "O") {
        setGameState("alicePlay");
      } else {
        throw new Error("Unknown next gameState");
      }
    },
    [board]
  );

  const reset = React.useCallback(() => {
    setBoard([
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ]);
    setGameState("alicePlay");
  }, []);

  return (
    <GameContext.Provider value={{ gameState, board, setCell, reset }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used in GameProvider");
  }
  return context;
}
