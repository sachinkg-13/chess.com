import React, { useState, useEffect } from "react";
import Board from "./components/Game/Board";
import GameSidebar from "./components/GameSidebar";
import Modal from "./components/UI/Modal";
import { useChessGame } from "./hooks/useChessGame";
import { useChessAudio } from "./hooks/useChessAudio";

function App() {
  const {
    game,
    fen,
    turn,
    playerRole,
    makeMove,
    gameOver,
    winner,
    gameOverReason,
    resignGame,
    abortGame,
    history,
  } = useChessGame();
  const { playAudio } = useChessAudio();

  const [whiteTime, setWhiteTime] = useState(600); // 10 minutes
  const [blackTime, setBlackTime] = useState(600);
  const [flipBoard, setFlipBoard] = useState(false);

  // Timer Logic
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      if (turn === "w") {
        setWhiteTime((prev) => Math.max(0, prev - 1));
      } else {
        setBlackTime((prev) => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [turn, gameOver]);

  // Check for timeout
  useEffect(() => {
    if (whiteTime === 0 || blackTime === 0) {
      // Handle timeout game over if not already handled by chess.js logic
    }
  }, [whiteTime, blackTime]);

  // Calculate captured pieces (simplified)
  const getCapturedPieces = (boardFen) => {
    const pieces = { p: 8, n: 2, b: 2, r: 2, q: 1, k: 1 };
    const currentCounts = { w: {}, b: {} };

    // Parse FEN
    const boardPart = boardFen.split(" ")[0];
    for (const char of boardPart) {
      if (/[a-z]/.test(char)) {
        currentCounts.b[char] = (currentCounts.b[char] || 0) + 1;
      } else if (/[A-Z]/.test(char)) {
        const lower = char.toLowerCase();
        currentCounts.w[lower] = (currentCounts.w[lower] || 0) + 1;
      }
    }

    const captured = { w: [], b: [] };

    ["p", "n", "b", "r", "q"].forEach((p) => {
      const whiteCount = currentCounts.w[p] || 0;
      const blackCount = currentCounts.b[p] || 0;

      for (let i = 0; i < pieces[p] - blackCount; i++) captured.w.push(p);
      for (let i = 0; i < pieces[p] - whiteCount; i++) captured.b.push(p);
    });

    return captured;
  };

  const captured = getCapturedPieces(fen);

  const handleNewGame = () => {
    window.location.reload();
  };

  const getGameOverMessage = () => {
    if (winner === "draw") return "Game ended in a draw.";
    if (gameOverReason === "resignation")
      return `${winner === "w" ? "White" : "Black"} won by resignation.`;
    if (gameOverReason === "opponent_disconnected")
      return "Opponent disconnected. You win!";
    if (gameOverReason === "aborted") return "Game aborted.";
    return "Checkmate!";
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_350px] gap-4 w-full max-w-6xl">
        {/* Left: Board Stage */}
        <div className="flex items-center justify-center bg-zinc-900 rounded-lg p-4 shadow-2xl border border-zinc-800">
          <Board
            game={game}
            makeMove={makeMove}
            playerRole={
              flipBoard ? (playerRole === "w" ? "b" : "w") : playerRole
            }
            playAudio={playAudio}
            fen={fen}
          />
        </div>

        {/* Right: Sidebar HUD */}
        <div className="h-[600px] lg:h-auto">
          <GameSidebar
            players={{
              me: {
                name: playerRole === "w" ? "White Player" : "Black Player",
                rating: 1200,
                color: playerRole,
                captured: playerRole === "w" ? captured.w : captured.b,
              },
              opponent: {
                name: playerRole === "w" ? "Black Player" : "White Player",
                rating: 1200,
                color: playerRole === "w" ? "b" : "w",
                captured: playerRole === "w" ? captured.b : captured.w,
              },
            }}
            timers={{
              me: playerRole === "w" ? whiteTime : blackTime,
              opponent: playerRole === "w" ? blackTime : whiteTime,
            }}
            activePlayer={turn}
            history={history}
            onResign={resignGame}
            onNewGame={handleNewGame}
            onFlipBoard={() => setFlipBoard(!flipBoard)}
            onAbort={abortGame}
          />
        </div>
      </div>

      <Modal
        isOpen={gameOver}
        title={
          winner === "draw"
            ? "Draw!"
            : `${winner === "w" ? "White" : "Black"} Wins!`
        }
        onClose={() => {}}
      >
        <div className="flex flex-col gap-4">
          <p className="text-center text-lg">{getGameOverMessage()}</p>
          <button
            onClick={handleNewGame}
            className="bg-green-600 hover:bg-green-500 text-white py-3 rounded font-bold w-full"
          >
            Play Again
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
