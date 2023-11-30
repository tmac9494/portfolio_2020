import React, { useCallback, useRef, useState } from "react";
import {
  DEFAULT_LENGTH,
  Difficulty,
  Directions,
  GRID_WIDTH,
  GameState,
  INITIAL_DIRECTION,
  SNAKE_GRID_ID,
  SnakeGameState,
  Tile,
  TileStates,
  UpdateSnakeGameState,
} from ".";
import { useKeydownEffect, useMoveEffect, useApple } from "./utils";

export const GameGrid: React.FC<{
  snakeGameState: SnakeGameState;
  updateGameState: UpdateSnakeGameState;
  endGame: () => void;
  tick: number;
  total: number;
  difficulty: Difficulty;
  borderIsOutOfBounds?: boolean;
  centerPoint: number;
  max: number;
}> = ({
  snakeGameState,
  updateGameState,
  endGame,
  total = GRID_WIDTH,
  tick,
  difficulty,
  borderIsOutOfBounds = true,
  centerPoint,
  max,
}) => {
  const { gameState, apple, length, position } = snakeGameState;
  const direction = useRef<Directions>(INITIAL_DIRECTION);
  const lastPositions = useRef<Set<number>>(
    new Set([position - 1, position - 2])
  );

  // deltas based on grid width
  const deltas = {
    [Directions.Right]: 1,
    [Directions.Left]: -1,
    [Directions.Top]: -total,
    [Directions.Bottom]: total,
  };

  const restartGame = useCallback(() => {
    lastPositions.current.clear();
    lastPositions.current.add(centerPoint - 1);
    lastPositions.current.add(centerPoint - 2);
    direction.current = INITIAL_DIRECTION;
    updateGameState({
      gameState: GameState.Start,
      apple: undefined,
      length: DEFAULT_LENGTH,
      position: centerPoint,
    });
  }, [centerPoint, updateGameState]);

  const setPosition = useCallback(
    (position: number) => {
      updateGameState({
        ...snakeGameState,
        position,
      });
    },
    [snakeGameState, updateGameState]
  );

  useApple({
    position,
    total,
    lastPositions,
    length,
    updateGameState,
    difficulty,
    max,
    apple,
    gameState,
  });

  // move effect
  useMoveEffect({
    lastPositions,
    gameState,
    position,
    deltas,
    length,
    tick,
    direction,
    apple,
    total,
    setPosition,
    borderIsOutOfBounds,
    max,
    endGame,
    centerPoint,
  });

  const keydownEffect = useKeydownEffect({
    lastPositions,
    gameState,
    direction,
    position,
    deltas,
    length,
    restartGame,
    updateGameState,
  });

  // build grid
  let gridList = [];
  for (let i = 0; i < max; i++) {
    const bodyIndex =
      lastPositions.current.has(i) &&
      Array.from(lastPositions.current).indexOf(i);
    gridList.push(
      <Tile
        bodyIndex={bodyIndex}
        key={i}
        tileState={
          i === position
            ? TileStates.Head
            : i === apple?.location
            ? TileStates.Apple
            : i !== position && bodyIndex !== false && bodyIndex < length
            ? TileStates.Body
            : apple?.boundaries.has(i)
            ? TileStates.Obstacle
            : TileStates.Inactive
        }
      />
    );
  }

  return (
    <div
      className="grid"
      id={SNAKE_GRID_ID}
      onKeyDown={keydownEffect}
      tabIndex={0}
      onBlur={() =>
        gameState === GameState.Start &&
        updateGameState({
          gameState: GameState.Pause,
        })
      }
    >
      {gridList}
      {gameState === GameState.Dead && (
        <div className="snake-game-info-box">
          <h1>Game Over</h1>
          <p>Press Spacebar to restart</p>
        </div>
      )}
      {gameState === GameState.Pause && (
        <div className="snake-game-info-box">
          <h1>Game Paused</h1>
          <p>Press Spacebar to continue</p>
        </div>
      )}
      {gameState === GameState.Idle && (
        <div className="snake-game-info-box">
          <h1>React Snake</h1>
          <p>W, A, S, D - Snake Movement</p>
          <p>Spacebar - Pause/Continue/Restart</p>
        </div>
      )}
    </div>
  );
};
