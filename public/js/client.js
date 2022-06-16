const socket = io();

const board = document.querySelector(".board");
const boardCells = document.querySelectorAll(".board__cell");
const boardCellsArr = Array.from(boardCells);
const xBox = document.querySelector(".playerSelect--X");
const oBox = document.querySelector(".playerSelect--O");
const overlay = document.querySelector(".overlay");
const overlayTurn = document.querySelector(".overlay--turn");
const overlayText = document.querySelector(".overlay__text");
const resetBtn = document.querySelector(".reset-btn");

overlay.addEventListener("click", (e) => {
  console.log(e.target === resetBtn ? resetGame() : "");
});
const clearBoard = () =>
  boardCellsArr.forEach((cell) => (cell.textContent = ""));

const resetGame = () => {
  socket.emit("reset", "reset");
  clearBoard();
  overlay.classList.add("hide");
  return "reset";
};
const offTurn = () => {
  overlayTurn.classList.remove("show");
  overlayTurn.classList.add("show");
};
const onTurn = () => {
  overlayTurn.classList.remove("show");
};

let socketPlayer = "";

socket.on("resetGame", () => {
  clearBoard();

  overlay.classList.add("hide");
});

socket.on("playerAssignment", (player) => {
  socketPlayer = player;
  const choice = socketPlayer.choice;
  overlay.classList.add("hide");
  choice === "X" ? xBox.classList.add("active") : oBox.classList.add("active");
});

socket.on("sent-playerMove", ({ cell, choice }) => {
  const selectedCell = boardCellsArr.find(
    (boardCell) => boardCell.dataset.id === cell
  );
  selectedCell.textContent = choice;
  socketPlayer.choice === choice ? offTurn() : onTurn();
});

socket.on("winner", (winner) => {
  console.log("winner");
  onTurn();
  overlayText.textContent = winner;
  overlay.classList.remove("hide");
  resetBtn.classList.add("show--reset");
});

board.addEventListener("click", (e) => {
  const move = e.target.dataset.id;

  socket.emit("playerMove", move);
});

resetBtn.addEventListener("click", (e) => {
  console.log("reset game");
});

board.addEventListener("click", (e) => {
  if (e.target.classList[0] === "board__cell") {
    const child =
      socketPlayer.choice === "X"
        ? e.target.firstElementChild
        : e.target.lastElementChild;

    if (child && socketPlayer) {
      child.classList.add("visible");
    }
  }
});

socket.emit("join", "bobby", (error) => {
  if (error) {
    alert(error);
  }
});
