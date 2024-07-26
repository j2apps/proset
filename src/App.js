import logo from './logo.svg';
import './App.css';
import Board from './game_elements/board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board size={8}></Board>
      </header>
    </div>
  );
}

export default App;
