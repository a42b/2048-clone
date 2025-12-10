import React from 'react';

export default function Game() {
  const rows = Array.from({ length: 4 });
  return (
    <div className="game-root">
      <div className="board">
        {rows.map((_, r) => (
          <div key={r} className="board-row">
            {rows.map((_, c) => (
              <div key={c} className="tile placeholder" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
