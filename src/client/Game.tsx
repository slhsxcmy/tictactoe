import React from "react";
import { useGameContext } from "./context";

export function Game() {
  return (
    <>
      <GameState />
      <GameBoard />
      <Reset />
    </>
  );
}

function Reset() {
  const { reset } = useGameContext();
  return (
    <button
      style={{
        fontSize: 20,
      }}
      type="button"
      onClick={reset}
    >
      Reset game
    </button>
  );
}

function GameBoard() {
  const { board, setCell, gameState } = useGameContext();
  return (
    <div
      style={{
        display: "grid",
        gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
        width: 600,
        height: 600,
      }}
    >
      {board.map((row, r) => {
        return row.map((cell, c) => {
          return (
            <button
              style={{
                border: "1px black solid",
                fontSize: 30,
              }}
              type="button"
              onClick={() => {
                setCell(r, c, gameState === "alicePlay" ? "X" : "O");
              }}
              disabled={
                cell !== " " || ["aliceWin", "bobWin"].includes(gameState)
              }
            >
              {cell}
            </button>
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
