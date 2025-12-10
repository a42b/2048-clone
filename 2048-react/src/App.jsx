import React from 'react';
import Game from './components/Game';
import './styles.css';

export default function App() {
  return (
    <div className="app">
      <h1 className="title">2048 Clone (React)</h1>
      <Game />
    </div>
  );
}
