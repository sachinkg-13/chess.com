import { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
import io from "socket.io-client";

const socket = io(import.meta.env.PROD ? undefined : "http://localhost:3000");

export function useChessGame() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [playerRole, setPlayerRole] = useState(null); // 'w', 'b', or 'spectator'
  const [turn, setTurn] = useState("w");
  const [history, setHistory] = useState([]);
  const [winner, setWinner] = useState(null); // 'w', 'b', or 'draw'
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("playerRole", (role) => {
      setPlayerRole(role);
      console.log("Assigned role:", role);
    });

    socket.on("spectatorRole", () => {
      setPlayerRole("spectator");
    });

    socket.on("boardState", ({ fen: newFen, history: newHistory }) => {
      setFen(newFen);
      const newGame = new Chess(newFen);
      setGame(newGame);
      setTurn(newGame.turn());
      setHistory(newHistory); // Sync history
      checkGameOver(newGame);
    });

    socket.on("gameOver", ({ winner, reason }) => {
      setGameOver(true);
      setWinner(winner);
      setGameOverReason(reason); // You might want to add this state
    });

    return () => {
      socket.off("connect");
      socket.off("playerRole");
      socket.off("spectatorRole");
      socket.off("boardState");
      socket.off("move");
      socket.off("gameOver");
    };
  }, []);

  const [gameOverReason, setGameOverReason] = useState("");

  const checkGameOver = (chessInstance) => {
    // Client-side check is still good for immediate feedback, but server is authority
    if (chessInstance.isGameOver()) {
      // Wait for server event for definitive result usually, but we can set locally too
    }
  };

  const makeMove = useCallback(
    (move) => {
      if (game.turn() !== playerRole && playerRole !== "spectator") return null;

      const gameCopy = new Chess(game.fen());
      let result = null;
      try {
        result = gameCopy.move(move);
      } catch (e) {
        return null;
      }

      if (result) {
        setGame(gameCopy);
        setFen(gameCopy.fen());
        setTurn(gameCopy.turn());
        setHistory(gameCopy.history());
        // checkGameOver(gameCopy); // Let server handle game over
        socket.emit("move", move);
        return result;
      }
      return null;
    },
    [game, playerRole]
  );

  const resignGame = () => {
    socket.emit("resign");
  };

  const abortGame = () => {
    socket.emit("abort");
  };

  return {
    game,
    fen,
    turn,
    history,
    playerRole,
    makeMove,
    gameOver,
    winner,
    gameOverReason,
    resignGame,
    abortGame,
  };
}
