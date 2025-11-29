import express from "express";
import { Server } from "socket.io";
import http from "http";
import { Chess } from "chess.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const chess = new Chess();
let players = {};
let currentPlayer = "w";

app.use(express.static(path.join(__dirname, "dist")));

io.on("connection", function (socket) {
  console.log("A new client connected");

  if (!players.white) {
    players.white = socket.id;
    socket.emit("playerRole", "w");
    console.log("White joined");
  } else if (!players.black) {
    players.black = socket.id;
    socket.emit("playerRole", "b");
    console.log("Black joined");
  } else {
    socket.emit("spectatorRole");
  }

  socket.on("disconnect", function () {
    console.log("User disconnected");
    if (socket.id === players.white) {
      delete players.white;
      io.emit("playerDisconnected", "w");
      if (players.black)
        io.to(players.black).emit("gameOver", {
          winner: "b",
          reason: "opponent_disconnected",
        });
    } else if (socket.id === players.black) {
      delete players.black;
      io.emit("playerDisconnected", "b");
      if (players.white)
        io.to(players.white).emit("gameOver", {
          winner: "w",
          reason: "opponent_disconnected",
        });
    }
  });

  socket.on("resign", () => {
    const playerColor = socket.id === players.white ? "w" : "b";
    const opponentColor = playerColor === "w" ? "b" : "w";
    io.emit("gameOver", { winner: opponentColor, reason: "resignation" });
  });

  socket.on("abort", () => {
    io.emit("gameOver", { winner: "draw", reason: "aborted" });
  });

  socket.on("move", (move) => {
    try {
      if (chess.turn() === "w" && socket.id !== players.white) return;
      if (chess.turn() === "b" && socket.id !== players.black) return;

      const result = chess.move(move);
      if (result) {
        currentPlayer = chess.turn();
        io.emit("move", move);
        io.emit("boardState", {
          fen: chess.fen(),
          history: chess.history(),
        });

        if (chess.isGameOver()) {
          let winner = null;
          let reason = "";
          if (chess.isCheckmate()) {
            winner = chess.turn() === "w" ? "b" : "w";
            reason = "checkmate";
          } else if (chess.isDraw()) {
            winner = "draw";
            reason = "draw";
          }
          io.emit("gameOver", { winner, reason });
        }

        if (result.captured) {
          io.emit("capture", result.captured);
        }
      } else {
        console.log("Invalid move");
        socket.emit("invalidMove", move);
      }
    } catch (error) {
      console.log(error);
      socket.emit("invalidMove", move);
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

server.listen(process.env.PORT || 3000, function () {
  console.log("listening on *:3000");
});
