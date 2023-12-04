import { useEffect, useRef } from "react";
import {
  GameState,
  Directions,
  AppleTile,
  GameDeltas,
  SnakeGameCache,
} from "../types";

export const useMoveEffect = ({
  position,
  deltas,
  tick,
  gameState,
  max,
  length,
  borderIsOutOfBounds,
  endGame,
  centerPoint,
  total,
  setPosition,
  apple,
  gameCache,
}: {
  gameState: GameState;
  position: number;
  deltas: GameDeltas;
  length: number;
  tick: number;
  apple: AppleTile | undefined;
  total: number;
  setPosition: (value: number) => void;
  borderIsOutOfBounds: boolean;
  max: number;
  endGame: () => void;
  centerPoint: number;
  gameCache: SnakeGameCache;
}) => {
  const lastTick = useRef<number>();
  useEffect(() => {
    let newPosition = position + deltas[gameCache.direction.direction];
    if (gameState === GameState.Start && lastTick.current !== tick) {
      const positionsAsArray = Array.from(gameCache.lastPositions);
      positionsAsArray.unshift(position);
      if (gameCache.lastPositions.size > max - 2) {
        positionsAsArray.pop();
      }
      gameCache.lastPositions = new Set(positionsAsArray);
      gameCache.direction.lastPosition = positionsAsArray[0];

      // out of bounds positions
      const isPassedRight =
        (position + 1) % total === 0 &&
        gameCache.direction.direction === Directions.Right;
      const isPassedLeft =
        position % total === 0 &&
        gameCache.direction.direction === Directions.Left;
      const isPassedTop = newPosition < 0;
      const isPassedBottom = newPosition > max - 1;

      // player died
      const playerAteBody =
        gameCache.lastPositions.has(newPosition) &&
        positionsAsArray.indexOf(newPosition) < length;

      const playerOutOfBounds =
        borderIsOutOfBounds &&
        (isPassedRight || isPassedBottom || isPassedLeft || isPassedTop);

      const playerHitObstacle = apple?.boundaries.has(position);

      // end game if player died
      if (playerAteBody || playerOutOfBounds || playerHitObstacle) {
        endGame();
      } else {
        // border out of bounds is false pathfinder
        if (!borderIsOutOfBounds) {
          if (isPassedRight) newPosition = position - total + 1;
          else if (isPassedLeft) newPosition = position + total - 1;
          else if (isPassedTop) newPosition = position + max - total;
          else if (isPassedBottom) newPosition = position - max + total;
        }
        setPosition(newPosition);
      }
      lastTick.current = tick;
    }
  }, [
    position,
    total,
    max,
    gameState,
    length,
    deltas,
    centerPoint,
    tick,
    borderIsOutOfBounds,
    apple?.boundaries,
    endGame,
    setPosition,
    gameCache,
  ]);
};
