# 2048 Game Project

A **2048 game clone** built with **React**.  
The project demonstrates core concepts of game logic, state management, and UI design.

![s](image.png)

---

## Features

- Full 2048 mechanics  
- **Win detection** (2048 tile popup — shown only once)  
- **Score system** and **LocalStorage best score**  
- Centered and responsive board layout  
- Restart button to begin a new game anytime  

---

## Technologies Used

- **React** (Hooks: useState, useEffect)  
- **JavaScript (ES6+)**  
- **CSS** for board, tiles, and animations  
- **Vite** as the project bundler  
- LocalStorage for best score persistence  

---

##  Installation & Running

Clone this repository:

```bash
git clone <your-repo-url>
cd 2048-react
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Then open: http://localhost:5173/

# Gameplay

    Use the arrow keys to move tiles.

    Identical tiles merge and form the next tile value.

    After each move, a new tile (2 or 4) spawns.

    Create the 2048 tile to win.

    You may continue playing after winning.

    The game ends when no valid moves remain.