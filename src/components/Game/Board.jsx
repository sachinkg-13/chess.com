import React, { useState } from "react";
import { Chessboard } from "react-chessboard";

export default function Board({ game, makeMove, playerRole, playAudio, fen }) {
  const [moveFrom, setMoveFrom] = useState("");
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  function getMoveOptions(square) {
    const moves = game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      return false;
    }

    const newSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.turn()
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square) {
    setRightClickedSquares({});

    // if click on same square, reset
    if (moveFrom === square) {
      setMoveFrom("");
      setOptionSquares({});
      return;
    }

    // if click on a piece that can move, set moveFrom
    if (getMoveOptions(square)) {
      setMoveFrom(square);
      return;
    }

    // if click on a square to move to
    if (moveFrom) {
      const move = {
        from: moveFrom,
        to: square,
        promotion: "q", // always promote to queen for simplicity
      };
      const result = makeMove(move);
      if (result) {
        setMoveFrom("");
        setOptionSquares({});
        if (result.captured) playAudio("capture");
        else playAudio("move");

        if (game.inCheck()) playAudio("check");
      }
    }
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    };

    const result = makeMove(move);
    if (result) {
      setOptionSquares({});
      if (result.captured) playAudio("capture");
      else playAudio("move");

      if (game.inCheck()) playAudio("check");
      return true;
    }
    return false;
  }

  return (
    <div className="w-full max-w-[600px] aspect-square">
      <Chessboard
        id="BasicBoard"
        position={fen}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        onSquareRightClick={(square) =>
          setRightClickedSquares({
            ...rightClickedSquares,
            [square]:
              rightClickedSquares[square] &&
              rightClickedSquares[square].backgroundColor ===
                "rgba(0, 0, 255, 0.4)"
                ? undefined
                : { backgroundColor: "rgba(0, 0, 255, 0.4)" },
          })
        }
        customSquareStyles={{
          ...optionSquares,
          ...rightClickedSquares,
        }}
        boardOrientation={playerRole === "b" ? "black" : "white"}
        customDarkSquareStyle={{ backgroundColor: "#b58863" }}
        customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
      />
    </div>
  );
}
