import Game from "./features/game/Game";
import Humain from "./features/humains/Humain";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game />
        {/* <Humain /> */}
      </header>
    </div>
  );
}

export default App;
