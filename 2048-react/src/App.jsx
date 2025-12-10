import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [board, setBoard] = useState(createEmptyBoard());

  useEffect(() => {
    addRandomTile();
    addRandomTile();

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        moveLeft();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
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

  function slideRowLeft(row) {
    let nums = row.filter(n => n !== 0);

    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i] === nums[i + 1]) {
        nums[i] *= 2;
        nums[i + 1] = 0;
      }
    }

    nums = nums.filter(n => n !== 0);

    while (nums.length < 4) nums.push(0);

    return nums;
  }

  function moveLeft() {
    setBoard(prev => {
      const newBoard = prev.map(row => slideRowLeft(row));

      if (JSON.stringify(newBoard) !== JSON.stringify(prev)) {
        setTimeout(() => addRandomTile(), 50);
      }

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
