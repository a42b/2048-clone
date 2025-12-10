import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [board, setBoard] = useState(createEmptyBoard());

  useEffect(() => {
    addRandomTile();
    addRandomTile();
  }, []);

  function createEmptyBoard() {
    return Array(4)
      .fill(null)
      .map(() => Array(4).fill(0));
  }

  function addRandomTile() {
    setBoard(prev => {
      const newBoard = prev.map(row => [...row]);
      const emptyCells = [];
      
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (newBoard[r][c] === 0) emptyCells.push([r, c]);
        }
      }

      if (emptyCells.length === 0) return prev;

      const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;

      return newBoard;
    });
  }

  return (
    <div className="app">
      <h1 className="title">2048 Clone (React)</h1>

      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((value, colIndex) => (
              <div className="tile" key={colIndex}>
                {value !== 0 ? value : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
