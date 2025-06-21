// Remove body margin for a clean layout
document.querySelector("body").style.margin = 0;

// Set up the root container
const root = document.querySelector(".app");
Object.assign(root.style, {
  width: "100vw",
  height: "100vh",
  backgroundColor: "#1e1e2f",
  color: "white",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial, sans-serif",
});

// Create and style the game title
const title = document.createElement("h1");
title.innerText = "Tic Tac Toe";
Object.assign(title.style, {
  marginBottom: "20px",
  color: "#00d4ff",
  textShadow: "2px 2px 5px #00a1c6",
});
root.appendChild(title);

// Create and style the reset button
const resetButton = document.createElement("button");
resetButton.innerText = "Reset";
Object.assign(resetButton.style, {
  margin: "20px",
  padding: "10px 20px",
  backgroundColor: "#00d4ff",
  border: "none",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "8px",
  transition: "transform 0.2s",
});
resetButton.addEventListener("mouseover", () => {
  resetButton.style.transform = "scale(1.1)";
});
resetButton.addEventListener("mouseout", () => {
  resetButton.style.transform = "scale(1)";
});
root.appendChild(resetButton);

// Create a placeholder for the winner announcement
let winner = document.createElement("h3");
Object.assign(winner.style, {
  margin: "20px",
  color: "#00ff88",
  fontSize: "24px",
});

// Create and style the game board
const board = document.createElement("div");
Object.assign(board.style, {
  margin: "20px",
  maxWidth: "350px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "10px",
  padding: "20px 10px",
  border: "3px solid #00d4ff",
  borderRadius: "10px",
  backgroundColor: "#282a36",
});
root.appendChild(board);

// Create the game board cells
for (let i = 0; i < 9; i++) {
  const box = document.createElement("button");
  box.setAttribute("id", "box");
  Object.assign(box.style, {
    minWidth: "100px",
    height: "100px",
    backgroundColor: "#44475a",
    fontSize: "50px",
    fontWeight: "600",
    color: "white",
    border: "2px solid #6272a4",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  });

  // Add hover effect
  box.addEventListener("mouseover", () => {
    box.style.backgroundColor = "#6272a4";
    box.style.transform = "scale(1.1)";
  });
  box.addEventListener("mouseout", () => {
    box.style.backgroundColor = "#44475a";
    box.style.transform = "scale(1)";
  });

  board.appendChild(box);
}

// Game logic
let turn0 = true;
const winList = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const boxes = document.querySelectorAll("#box");

// Add click listeners for game logic
for (let box of boxes) {
  box.addEventListener("click", () => {
    box.innerHTML =  turn0 ? "O" : 'X';
    box.style.color = turn0 ? "#00d4ff" : '#ff0000';
    box.disabled = true;
    box.style.cursor = "default";
    box.style.pointerEvents = "none";
    turn0 = !turn0;
    checkWinner();
  });
}


// Reset the game
function resetGame() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.backgroundColor = "#44475a";
    box.style.cursor = "pointer";
    box.style.pointerEvents = "auto";
  });
  turn0 = true;
  if (winner) {
    winner.remove(); // Remove the winner element from the DOM
  }
}

// Disable all boxes after a win
function disableBoxes() {
  boxes.forEach((box) => {
    box.disabled = true;
    box.style.pointerEvents = "none";
  });
}

// Check for a winner
function checkWinner() {
  for (const combo of winList) {
    const [a, b, c] = combo;
    const pos1 = boxes[a].innerText;
    const pos2 = boxes[b].innerText;
    const pos3 = boxes[c].innerText;

    if (pos1 && pos1 === pos2 && pos2 === pos3) {
      winner.innerText = `Winner is ${pos1}`;
      resetButton.insertAdjacentElement("afterend", winner);

      disableBoxes();
      return;
    }
  }
}

// Attach the reset functionality to the button
resetButton.addEventListener("click", resetGame);