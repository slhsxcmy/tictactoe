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
    <button style={{ fontSize: 20 }} type="button" onClick={reset}>
      Reset game
    </button>
  );
}

function GameBoard() {
  const { board, setCell, progress } = useGameContext();
  return (
    <div
      style={{
        display: "grid",
        gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
        width: 600,
        height: 600,
      }}
    >
      {board.map((cell, index) => (
        <GameCell
          key={index}
          cell={cell}
          onClick={() => setCell(Math.floor(index / 3), index % 3)}
          disabled={cell !== " " || ["aliceWin", "bobWin"].includes(progress)}
        />
      ))}
    </div>
  );
}

function GameCell({
  cell,
  onClick,
  disabled,
}: {
  cell: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      style={{
        border: "1px black solid",
        fontSize: 30,
      }}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {cell}
    </button>
  );
}

function GameState() {
  const { progress } = useGameContext();
  const messages: Record<string, string> = {
    alicePlay: "Alice to play.",
    bobPlay: "Bob to play.",
    aliceWin: "Alice won!",
    bobWin: "Bob won!",
    tie: "It's a tie!",
  };
  return <h1>{messages[progress]}</h1>;
}
