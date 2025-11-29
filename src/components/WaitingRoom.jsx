import React from "react";
import { Loader2, X } from "lucide-react";

const WaitingRoom = ({ onCancel }) => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-green-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[20%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 max-w-md w-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center space-y-8 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse" />
          <Loader2 className="w-16 h-16 text-green-500 animate-spin relative z-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Waiting for Opponent
          </h2>
          <p className="text-zinc-400">
            We're looking for a worthy challenger to join your game...
          </p>
        </div>

        <div className="w-full bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
          <div className="flex items-center justify-between text-sm text-zinc-300 mb-2">
            <span>Status</span>
            <span className="text-green-400 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
              Searching
            </span>
          </div>
          <div className="h-1 w-full bg-zinc-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-500/50 w-1/3 animate-loading-bar rounded-full" />
          </div>
        </div>

        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200 text-sm font-medium border border-transparent hover:border-zinc-700"
        >
          <X className="w-4 h-4" />
          Cancel Search
        </button>
      </div>
    </div>
  );
};

export default WaitingRoom;
