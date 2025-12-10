import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore")) || 0
  );

  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const [hasWonBefore, setHasWonBefore] = useState(false);

  const [isMoving, setIsMoving] = useState(false);
  const [moveDirection, setMoveDirection] = useState("left");

  useEffect(() => {
    window.focus();

    addRandomTile();
    addRandomTile();

    const handleKey = (e) => {
      if (gameOver || win) return;

      if (e.key === "ArrowLeft") moveLeft();
      if (e.key === "ArrowRight") moveRight();
      if (e.key === "ArrowUp") moveUp();
      if (e.key === "ArrowDown") moveDown();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameOver, win]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score);
    }
  }, [score]);

  function createEmptyBoard() {
    return Array(4)
      .fill(null)
      .map(() => Array(4).fill(0));
  }

  function restartGame() {
    setScore(0);
    setGameOver(false);
    setWin(false);
    setHasWonBefore(false); 

    const fresh = createEmptyBoard();
    fresh[Math.floor(Math.random() * 4)][Math.floor(Math.random() * 4)] = 2;
    fresh[Math.floor(Math.random() * 4)][Math.floor(Math.random() * 4)] = 2;

    setBoard(fresh);
  }

  function addRandomTile() {
    setBoard((prev) => {
      const newBoard = prev.map((row) => [...row]);
      const empty = [];

      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (newBoard[r][c] === 0) empty.push([r, c]);
        }
      }

      if (empty.length === 0) {
        if (!canMove(prev)) setGameOver(true);
        return prev;
      }

      const [r, c] = empty[Math.floor(Math.random() * empty.length)];
      newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
      if (!hasWonBefore) {
        for (let row of newBoard) {
          if (row.includes(2048)) {
            setWin(true);
            setHasWonBefore(true);
            break;
          }
        }
      }

      return newBoard;
    });
  }

  function slideRowLeft(row) {
    let arr = row.filter((n) => n !== 0);

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        setScore((s) => s + arr[i]);
        arr[i + 1] = 0;
      }
    }

    arr = arr.filter((n) => n !== 0);
    while (arr.length < 4) arr.push(0);
    return arr;
  }

  function slideRowRight(row) {
    return slideRowLeft([...row].reverse()).reverse();
  }

  function transpose(mat) {
    return mat[0].map((_, i) => mat.map((row) => row[i]));
  }

  function canMove(mat) {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (mat[r][c] === 0) return true;
      }
    }

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 3; c++) {
        if (mat[r][c] === mat[r][c + 1]) return true;
      }
    }

    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 3; r++) {
        if (mat[r][c] === mat[r + 1][c]) return true;
      }
    }

    return false;
  }

  function triggerMoveAnimation(direction) {
    setMoveDirection(direction);
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 170);
  }

  function moveLeft() {
    if (gameOver || win) return;

    triggerMoveAnimation("left");

    setBoard((prev) => {
      const next = prev.map((row) => slideRowLeft(row));
      if (JSON.stringify(next) !== JSON.stringify(prev)) {
        setTimeout(() => addRandomTile(), 40);
      }
      return next;
    });
  }

  function moveRight() {
    if (gameOver || win) return;

    triggerMoveAnimation("right");

    setBoard((prev) => {
      const next = prev.map((row) => slideRowRight(row));
      if (JSON.stringify(next) !== JSON.stringify(prev)) {
        setTimeout(() => addRandomTile(), 40);
      }
      return next;
    });
  }

  function moveUp() {
    if (gameOver || win) return;

    triggerMoveAnimation("up");

    setBoard((prev) => {
      const t = transpose(prev);
      const moved = t.map((row) => slideRowLeft(row));
      const next = transpose(moved);

      if (JSON.stringify(next) !== JSON.stringify(prev)) {
        setTimeout(() => addRandomTile(), 40);
      }
      return next;
    });
  }

  function moveDown() {
    if (gameOver || win) return;

    triggerMoveAnimation("down");

    setBoard((prev) => {
      const t = transpose(prev);
      const moved = t.map((row) => slideRowRight(row));
      const next = transpose(moved);

      if (JSON.stringify(next) !== JSON.stringify(prev)) {
        setTimeout(() => addRandomTile(), 40);
      }
      return next;
    });
  }

  return (
    <div className="app">
      <h1 className="title">2048 Clone (React)</h1>

      <div className="top-bar">
        <div className="score-box">
          <div className="score-title">SCORE</div>
          <div className="score-value">{score}</div>
        </div>

        <div className="score-box best">
          <div className="score-title">BEST</div>
          <div className="score-value">{bestScore}</div>
        </div>

        <button className="restart-btn" onClick={restartGame}>
          Restart
        </button>
      </div>

      <div style={{ position: "relative", width: "fit-content", margin: "0 auto" }}>
        <div className="board">
          {board.map((row, ri) => (
            <div className="board-row" key={ri}>
              {row.map((value, ci) => (
                <div
                  className={`tile ${value !== 0 ? "tile-" + value : ""} ${
                    isMoving ? `moving moving-${moveDirection}` : ""
                  }`}
                  key={ci}
                >
                  {value !== 0 ? value : ""}
                </div>
              ))}
            </div>
          ))}
        </div>

        {win && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2>You Win!</h2>
              <p>You reached 2048!</p>
              <button onClick={() => setWin(false)}>Continue</button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2>Game Over</h2>
              <p>No more moves left.</p>
              <button onClick={restartGame}>Restart</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
