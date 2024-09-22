import { GameProvider } from "./client/context";
import { Game } from "./client/Game";

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;
