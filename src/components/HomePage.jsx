import React from "react";
import { Play, Users, Trophy, Shield } from "lucide-react";

const HomePage = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent drop-shadow-sm">
            CHESS
            <span className="text-green-500">.</span>
            REALM
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light">
            Experience the classic game in a modern, real-time environment.
            Challenge opponents worldwide instantly.
          </p>
        </div>

        {/* Action Button */}
        <div className="animate-fade-in-up delay-100">
          <button
            onClick={onStartGame}
            className="group relative px-8 py-4 bg-white text-zinc-950 text-xl font-bold rounded-full hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center gap-3"
          >
            <Play className="w-6 h-6 fill-current" />
            <span>Start New Game</span>
            <div className="absolute inset-0 rounded-full ring-2 ring-white/50 group-hover:ring-white/80 animate-pulse-slow" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12 animate-fade-in-up delay-200">
          <FeatureCard
            icon={<Users className="w-8 h-8 text-blue-400" />}
            title="Real-time Multiplayer"
            description="Instant matchmaking with live opponents from around the globe."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-purple-400" />}
            title="Secure & Fair"
            description="Advanced anti-cheat detection and secure socket connections."
          />
          <FeatureCard
            icon={<Trophy className="w-8 h-8 text-yellow-400" />}
            title="Ranked Matches"
            description="Climb the leaderboards and prove your strategic mastery."
          />
        </div>
      </div>

      <footer className="absolute bottom-6 text-zinc-600 text-sm">
        © 2024 Chess Realm. All rights reserved.
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-800/50 transition-colors duration-300 text-left">
    <div className="mb-4 p-3 bg-zinc-950/50 rounded-xl w-fit border border-zinc-800/50">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-zinc-200 mb-2">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default HomePage;
