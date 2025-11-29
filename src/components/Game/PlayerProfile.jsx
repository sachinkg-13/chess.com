import React from "react";
import { User } from "lucide-react";

export default function PlayerProfile({
  name,
  rating,
  timer,
  active,
  capturedPieces,
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`flex items-center justify-between p-2 rounded-lg ${
        active ? "bg-sidebar-hover" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-600 rounded-md flex items-center justify-center">
          <User className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-semibold">{name}</span>
          <span className="text-gray-400 text-xs">{rating}</span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className="flex -space-x-2">
          {capturedPieces &&
            capturedPieces.map((p, i) => {
              const isWhitePlayer = name.includes("White");
              const pieceColor = isWhitePlayer ? "b" : "w";
              const pieceName = p.toLowerCase();

              const wikiMap = {
                w: {
                  p: "4/45/Chess_plt45.svg",
                  n: "7/70/Chess_nlt45.svg",
                  b: "b/b1/Chess_blt45.svg",
                  r: "7/72/Chess_rlt45.svg",
                  q: "1/15/Chess_qlt45.svg",
                  k: "4/42/Chess_klt45.svg",
                },
                b: {
                  p: "c/c7/Chess_pdt45.svg",
                  n: "e/ef/Chess_ndt45.svg",
                  b: "9/98/Chess_bdt45.svg",
                  r: "f/ff/Chess_rdt45.svg",
                  q: "4/47/Chess_qdt45.svg",
                  k: "f/f0/Chess_kdt45.svg",
                },
              };

              return (
                <img
                  key={i}
                  src={`https://upload.wikimedia.org/wikipedia/commons/${wikiMap[pieceColor][pieceName]}`}
                  alt={p}
                  className="w-5 h-5"
                />
              );
            })}
        </div>
        <div
          className={`px-3 py-1 rounded ${
            active ? "bg-white text-black" : "bg-gray-700 text-gray-300"
          } font-mono font-bold`}
        >
          {formatTime(timer)}
        </div>
      </div>
    </div>
  );
}
