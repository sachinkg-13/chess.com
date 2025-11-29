import React from "react";
import PlayerProfile from "./Game/PlayerProfile";
import MoveHistory from "./Game/MoveHistory";
import { Flag, RotateCcw, X } from "lucide-react";

export default function GameSidebar({
  players,
  timers,
  activePlayer,
  history,
  onResign,
  onNewGame,
  onFlipBoard,
  onAbort,
}) {
  return (
    <div className="flex flex-col h-full bg-sidebar-bg rounded-lg overflow-hidden border border-gray-800 shadow-lg">
      {/* Opponent Profile */}
      <div
        className={`p-2 border-b border-gray-800 transition-colors duration-300 ${
          activePlayer === players.opponent.color
            ? "bg-green-900/20 border-l-4 border-l-green-500"
            : "border-l-4 border-l-transparent"
        }`}
      >
        <PlayerProfile
          name={players.opponent.name || "Opponent"}
          rating={players.opponent.rating || 1200}
          timer={timers.opponent}
          active={activePlayer === players.opponent.color}
          capturedPieces={players.opponent.captured}
        />
      </div>

      {/* Move History */}
      <MoveHistory history={history} />

      {/* Action Buttons */}
      <div className="p-4 bg-sidebar-bg border-t border-gray-800 grid grid-cols-2 gap-2">
        <button
          onClick={onNewGame}
          className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded font-bold transition-colors flex items-center justify-center gap-2 col-span-2"
        >
          New Game
        </button>
        <button
          onClick={onResign}
          className="bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Flag size={18} /> Resign
        </button>
        <button
          onClick={onAbort}
          className="bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded font-medium transition-colors flex items-center justify-center gap-2"
        >
          <X size={18} /> Abort
        </button>
      </div>

      {/* User Profile */}
      <div
        className={`p-2 border-t border-gray-800 bg-sidebar-bg transition-colors duration-300 ${
          activePlayer === players.me.color
            ? "bg-green-900/20 border-l-4 border-l-green-500"
            : "border-l-4 border-l-transparent"
        }`}
      >
        <PlayerProfile
          name={players.me.name || "You"}
          rating={players.me.rating || 1200}
          timer={timers.me}
          active={activePlayer === players.me.color}
          capturedPieces={players.me.captured}
        />
      </div>
    </div>
  );
}
