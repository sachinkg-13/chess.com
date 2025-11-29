import { useCallback } from "react";

// Preload audios
const moveAudio = new Audio("/audios/move-self.mp3");
const captureAudio = new Audio("/audios/capture.mp3");
const checkAudio = new Audio("/audios/move-check.mp3");
const notifyAudio = new Audio("/audios/game-end.mp3");
const gameOverAudio = new Audio("/audios/game-end.mp3");

export function useChessAudio() {
  const playAudio = useCallback((type) => {
    try {
      switch (type) {
        case "move":
          moveAudio.currentTime = 0;
          moveAudio.play();
          break;
        case "capture":
          captureAudio.currentTime = 0;
          captureAudio.play();
          break;
        case "check":
          checkAudio.currentTime = 0;
          checkAudio.play();
          break;
        case "game_over":
          gameOverAudio.currentTime = 0;
          gameOverAudio.play();
          break;
        default:
          notifyAudio.currentTime = 0;
          notifyAudio.play();
      }
    } catch (error) {
      console.error("Audio play failed", error);
    }
  }, []);

  return { playAudio };
}
