import React from "react";
import { useGameContext } from "./context";

export function Game() {
  return (
    <>
      <GameState />
      <GameBoard />
    </>
  );
}

function GameBoard() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
        width: 600,
        height: 600,
      }}
    >
      {[0, 1, 2].map((r) => {
        return [0, 1, 2].map((c) => {
          return (
            <div
              style={{
                border: "1px black solid",
              }}
            >
              {r} {c}
            </div>
          );
        });
      })}
    </div>
  );
}

function GameState() {
  const { gameState } = useGameContext();
  switch (gameState) {
    case "alicePlay":
      return <h1>Alice to play.</h1>;
    case "bobPlay":
      return <h1>Bob to play.</h1>;
    case "aliceWin":
      return <h1>Alice won!</h1>;
    case "bobWin":
      return <h1>Bob won!</h1>;
    default:
      throw new Error(`Unknown gameState ${gameState satisfies never}`);
  }
}
