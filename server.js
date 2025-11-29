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

let chess = new Chess();
let players = {};
let currentPlayer = "w";

app.use(express.static(path.join(__dirname, "dist")));

io.on("connection", function (socket) {
  console.log("A new client connected:", socket.id);

  socket.on("joinGame", () => {
    console.log(`Socket ${socket.id} requesting to join game`);

    // Check if player is already in the game
    if (players.white === socket.id || players.black === socket.id) {
      console.log(`Player ${socket.id} already in game`);
      return;
    }

    if (!players.white) {
      players.white = socket.id;
      console.log("Player joined as White (Waiting)");
    } else if (!players.black) {
      players.black = socket.id;
      console.log("Player joined as Black");
    } else {
      console.log("Spectator joined");
      socket.emit("spectatorRole");
      socket.emit("boardState", {
        fen: chess.fen(),
        history: chess.history(),
      });
      return;
    }

    if (players.white && players.black) {
      console.log("Both players present. Starting new game...");
      chess = new Chess(); // Start a fresh game
      console.log("New Game FEN:", chess.fen());

      io.to(players.white).emit("gameStarted", {
        role: "w",
        fen: chess.fen(),
        history: chess.history(),
      });
      io.to(players.black).emit("gameStarted", {
        role: "b",
        fen: chess.fen(),
        history: chess.history(),
      });
      console.log("Game Started emitted to players");
    }
  });

  socket.on("leaveQueue", () => {
    if (players.white === socket.id) {
      delete players.white;
      console.log("White left queue");
    } else if (players.black === socket.id) {
      delete players.black;
      console.log("Black left queue");
    }
  });

  socket.on("disconnect", function () {
    console.log("User disconnected:", socket.id);
    if (socket.id === players.white) {
      delete players.white;
      io.emit("playerDisconnected", "w");
      if (players.black) {
        io.to(players.black).emit("gameOver", {
          winner: "b",
          reason: "opponent_disconnected",
        });
      }
    } else if (socket.id === players.black) {
      delete players.black;
      io.emit("playerDisconnected", "b");
      if (players.white) {
        io.to(players.white).emit("gameOver", {
          winner: "w",
          reason: "opponent_disconnected",
        });
      }
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
