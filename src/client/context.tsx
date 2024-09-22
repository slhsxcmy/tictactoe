import React from "react";

type TGameState = "alicePlay" | "bobPlay" | "aliceWin" | "bobWin";
type TGameContext = {
  gameState: TGameState;
  setGameState: React.Dispatch<React.SetStateAction<TGameState>>;
};

const GameContext = React.createContext<TGameContext | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = React.useState<TGameState>("alicePlay");
  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
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
