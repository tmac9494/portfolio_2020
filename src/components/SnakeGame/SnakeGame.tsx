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
import { HighScoreSchema, HighScores } from "./HighScores";

export const SnakeGame: React.FC<{
  size: number;
}> = ({ size = 15 }) => {
  // history storage
  const gameHistory: HighScoreSchema[] = JSON.parse(
    localStorage.getItem(HISTORY_STORAGE_KEY) || "[]"
  );

  // difficulty state
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Normal);

  // track game ticks
  const [tick, setTick] = useState<number>(0);
  const { interval, borderOutOfBounds } = difficulties[difficulty];

  // snake game state
  const [snakeGameState, setSnakeGameState] =
    useState<SnakeGameState>(INITIAL_GAME_STATE);
  const { gameState } = snakeGameState;

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
    const tickTimeout = setTimeout(() => {
      if (gameState === GameState.Start) {
        setTick(tick + 1);
      }
    }, interval);
    return () => clearTimeout(tickTimeout);
  }, [tick, interval, gameState]);

  // end game effect
  const endGame = useCallback(() => {
    let history = gameHistory || [];
    if (
      snakeGameState.length - DEFAULT_LENGTH !== 0 &&
      !history.find(
        (item) =>
          item.difficulty === difficulty &&
          item.state.length === snakeGameState.length
      )
    ) {
      history.push({ state: snakeGameState, difficulty });
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    }
    updateGameState({
      gameState: GameState.Dead,
    });
  }, [updateGameState, gameHistory, snakeGameState, difficulty]);

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
        />
        <HighScores
          gameHistory={gameHistory}
          difficulty={difficulty}
          length={snakeGameState.length}
        />
      </div>
      <DifficultyOptions
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
    </>
  );
};
