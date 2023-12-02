import React, { useCallback, useEffect, useState } from "react";
import { GameGrid } from "./GameGrid";
import "./styles.scss";
import {
  DEFAULT_LENGTH,
  Difficulty,
  GameState,
  HISTORY_STORAGE_KEY,
  INITIAL_GAME_STATE,
  SnakeGameState,
  TILE_SIZE,
  UpdateSnakeGameState,
  difficulties,
} from "./types";
import { DifficultyOptions } from "./DifficultyOptions";
import { HighScores } from "./HighScores";
import { getSnakeGameHistory } from "./utils";

export const SnakeGame: React.FC<{
  size: number;
}> = ({ size = 15 }) => {
  // difficulty state
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Normal);

  // track game ticks
  const [tick, setTick] = useState<number>(0);

  // snake game state
  const max = Math.floor(size * size);
  const centerPoint = Math.ceil((max - 1) / 2);
  const [snakeGameState, setSnakeGameState] = useState<SnakeGameState>({
    ...INITIAL_GAME_STATE,
    position: centerPoint,
  });
  const { gameState } = snakeGameState;
  const { interval, borderOutOfBounds } = difficulties[difficulty];

  // game state update handler
  const updateGameState: UpdateSnakeGameState = useCallback(
    (overrides) => {
      setSnakeGameState({
        ...snakeGameState,
        ...overrides,
      });
    },
    [snakeGameState]
  );

  // core render ticker
  useEffect(() => {
    const isMobile = window.innerWidth < 800;
    const tickTimeout = setTimeout(() => {
      if (gameState === GameState.Start) {
        setTick(tick + 1);
      }
    }, interval + (isMobile ? 50 : 0));
    return () => clearTimeout(tickTimeout);
  }, [tick, interval, gameState]);

  // end game effect
  const endGame = useCallback(() => {
    let gameHistory = getSnakeGameHistory();
    if (
      snakeGameState.length - DEFAULT_LENGTH !== 0 &&
      !gameHistory.find(
        (item) =>
          item.difficulty === difficulty &&
          item.state.length === snakeGameState.length
      )
    ) {
      gameHistory.push({ state: snakeGameState, difficulty });
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(gameHistory));
    }
    updateGameState({
      gameState: GameState.Dead,
    });
  }, [updateGameState, snakeGameState, difficulty]);

  return (
    <>
      <div
        id="snake-game"
        className={`${difficulty}`}
        style={{ maxWidth: TILE_SIZE * size + 2 + "px" }}
      >
        <GameGrid
          updateGameState={updateGameState}
          endGame={endGame}
          snakeGameState={snakeGameState}
          tick={tick}
          difficulty={difficulty}
          total={size}
          borderIsOutOfBounds={borderOutOfBounds}
          centerPoint={centerPoint}
          max={max}
        />
        <HighScores difficulty={difficulty} length={snakeGameState.length} />
      </div>
      <DifficultyOptions
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
    </>
  );
};
