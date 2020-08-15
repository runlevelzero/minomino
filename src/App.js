import React from 'react';
import './App.css';
import Header from './components/ui/Header'
import GameArea from './components/tetris/GameArea'

function App() {
  return (
    <div className="App">
      <Header/>
      <GameArea />
    </div>
  );
}

export default App;
