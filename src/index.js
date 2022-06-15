const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const {
  addPlayer,
  getPlayer,
  removePlayer,
  getPlayers,
} = require("./utils/players");

const { addMove, checkWinner, resetBoard } = require("./utils/board");

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New WebSocket connection");
  socket.join("room");

  socket.on("join", (msg, callback) => {
    console.log("user has joined");
    const player = addPlayer(socket.id);
    if (player) {
      io.to(socket.id).emit("playerAssignment", player);
    }
  });

  socket.on("playerMove", (move) => {
    const player = getPlayer(socket.id);
    const playerMove = addMove(move, player.choice);
    const winner = checkWinner();
    if (winner !== "No Winner") {
      console.log(winner);
      io.to("room").emit("winner", winner);
    }
    if (winner === "No Winner") {
      io.to("room").emit("sent-playerMove", playerMove);
    }
  });

  socket.on("reset", (reset) => {
    resetBoard();
    io.to("room").emit("resetGame", "Game Reset");
    checkWinner();
  });

  socket.on("disconnect", () => {
    console.log(removePlayer(socket.id));
  });
});

server.listen(port, () => {
  console.log(`This server is listening on the ${port}`);
});
