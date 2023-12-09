import React, { TouchEvent, useCallback, useRef } from "react";
import {
  DEFAULT_LENGTH,
  Difficulty,
  Directions,
  GRID_WIDTH,
  GameState,
  INITIAL_DIRECTION,
  SNAKE_GRID_ID,
  SnakeGameCache,
  SnakeGameState,
  Tile,
  TileStates,
  UpdateSnakeGameState,
} from ".";
import {
  useKeydownEffect,
  useMoveEffect,
  useApple,
  useSnakeGameTouchEvents,
  useKeyupEffect,
} from "./utils";
import { SnakeDirection } from "./utils/SnakeDirection";
import { SnakeGameContentBox } from "./SnakeGameContentBox";

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

  // deltas based on grid width
  const deltas = {
    [Directions.Right]: 1,
    [Directions.Left]: -1,
    [Directions.Top]: -total,
    [Directions.Bottom]: total,
  };

  // values outside of render
  const gameCache = useRef<SnakeGameCache>({
    direction: new SnakeDirection(INITIAL_DIRECTION, deltas, position),
    lastPositions: new Set([position - 1, position - 2]),
  });

  gameCache.current.direction.position = position;

  const { onTouchEnd, onTouchMove, onTouchStart } = useSnakeGameTouchEvents({
    direction: gameCache.current.direction,
  });

  // resta7rt
  const restartGame = useCallback(() => {
    gameCache.current.lastPositions.clear();
    gameCache.current.lastPositions.add(centerPoint - 1);
    gameCache.current.lastPositions.add(centerPoint - 2);
    gameCache.current.direction.reset(centerPoint, centerPoint - 1);

    updateGameState({
      gameState: GameState.Start,
      apple: undefined,
      length: DEFAULT_LENGTH,
      position: centerPoint,
    });
  }, [centerPoint, updateGameState]);

  // pause, play, restart trigger
  const gameStateHandler = useCallback(() => {
    if (gameState === GameState.Dead) {
      restartGame();
    } else if (gameState === GameState.Pause || gameState === GameState.Idle) {
      updateGameState({ gameState: GameState.Start });
    }
  }, [gameState, restartGame, updateGameState]);

  // update snake position
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
    lastPositions: gameCache.current.lastPositions,
    length,
    updateGameState,
    difficulty,
    max,
    apple,
    gameState,
  });

  // move effect
  useMoveEffect({
    gameState,
    position,
    deltas,
    length,
    tick,
    apple,
    total,
    setPosition,
    borderIsOutOfBounds,
    max,
    endGame,
    centerPoint,
    gameCache: gameCache.current,
  });

  const keydownEffect = useKeydownEffect({
    gameCache: gameCache.current,
    gameState,
    updateGameState,
    gameStateHandler,
  });

  const keyupEffect = useKeyupEffect({
    gameCache: gameCache.current,
  });

  // build grid
  let gridList = [];
  for (let i = 0; i < max; i++) {
    const bodyIndex =
      gameCache.current.lastPositions.has(i) &&
      Array.from(gameCache.current.lastPositions).indexOf(i);
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
      onTouchMove={onTouchMove}
      onTouchStart={(e: TouchEvent<HTMLDivElement>) => {
        onTouchStart(e);
        gameStateHandler();
      }}
      onTouchEnd={onTouchEnd}
      onKeyDownCapture={keydownEffect}
      onKeyUpCapture={keyupEffect}
      tabIndex={0}
      onBlur={() =>
        gameState === GameState.Start &&
        updateGameState({
          gameState: GameState.Pause,
        })
      }
    >
      {gridList}
      <SnakeGameContentBox gameState={gameState} />
    </div>
  );
};
