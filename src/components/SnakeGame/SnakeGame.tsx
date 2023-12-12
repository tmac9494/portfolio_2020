import React, { useEffect, useRef, useState } from "react";
import { GameGrid } from "./GameGrid";
import "./styles.scss";
import { SnakeGameState, TILE_SIZE, difficulties } from "./types";
import { DifficultyOptions } from "./DifficultyOptions";
import { HighScores } from "./HighScores";
import { SnakeGameInstance } from "./utils/SnakeGameInstance";

export const SnakeGame: React.FC<{
  size: number;
}> = ({ size = 15 }) => {
  // game state
  const [gameState, setGameState] = useState<SnakeGameState>();

  // game instance logic
  const gameInstance = useRef(
    new SnakeGameInstance({ gridWidth: size, renderDispatch: setGameState })
  );
  // initial game render
  useEffect(() => {
    gameInstance.current.renderGame();
    return () => gameInstance.current.cleanUp();
  }, []);

  const { interval } = gameState
    ? difficulties[gameState.difficulty]
    : difficulties[gameInstance.current.difficulty];

  // core render ticker
  useEffect(() => {
    const tickInterval = gameInstance.current.getGameTicker();
    return () => clearInterval(tickInterval);
  }, [interval]);

  // null until state setup
  if (gameState === undefined) {
    return null;
  }

  return (
    <>
      <div
        id="snake-game"
        className={`${gameState.difficulty}`}
        style={{ maxWidth: TILE_SIZE * size + 2 + "px" }}
        onTouchMove={gameInstance.current.onTouchMove}
        onTouchStart={gameInstance.current.onTouchStart}
        onTouchEnd={gameInstance.current.onTouchEnd}
        onKeyDown={gameInstance.current.onKeyDown}
        onKeyUp={gameInstance.current.onKeyUp}
      >
        <GameGrid gameState={gameState} gameInstance={gameInstance.current} />
        <HighScores
          difficulty={gameState.difficulty}
          length={gameState.length}
        />
      </div>
      <DifficultyOptions
        difficulty={gameState.difficulty}
        setDifficulty={gameInstance.current.changeDifficulty}
      />
    </>
  );
};
