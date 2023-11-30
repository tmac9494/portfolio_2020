import { useEffect, useRef } from "react";
import {
  GameState,
  Directions,
  INITIAL_DIRECTION,
  AppleTile,
  GameDeltas,
} from "../types";

export const useMoveEffect = ({
  position,
  deltas,
  tick,
  lastPositions,
  gameState,
  direction,
  max,
  length,
  borderIsOutOfBounds,
  endGame,
  centerPoint,
  total,
  setPosition,
  apple,
}: {
  lastPositions: React.MutableRefObject<Set<number>>;
  gameState: GameState;
  position: number;
  deltas: GameDeltas;
  length: number;
  tick: number;
  direction: React.MutableRefObject<Directions>;
  apple: AppleTile | undefined;
  total: number;
  setPosition: (value: React.SetStateAction<number>) => void;
  borderIsOutOfBounds: boolean;
  max: number;
  endGame: () => void;
  centerPoint: number;
}) => {
  const lastTick = useRef<number>();
  useEffect(() => {
    let newPosition = position + deltas[direction.current];
    if (gameState === GameState.Start && lastTick.current !== tick) {
      const positionsAsArray = Array.from(lastPositions.current);
      positionsAsArray.unshift(position);
      if (lastPositions.current.size > max - 2) {
        positionsAsArray.pop();
      }
      lastPositions.current = new Set(positionsAsArray);

      // out of bounds positions
      const isPassedRight =
        (position + 1) % total === 0 && direction.current === Directions.Right;
      const isPassedLeft =
        position % total === 0 && direction.current === Directions.Left;
      const isPassedTop = newPosition < 0;
      const isPassedBottom = newPosition > max - 1;

      // player died
      const playerAteBody =
        lastPositions.current.has(newPosition) &&
        positionsAsArray.indexOf(newPosition) < length;

      const playerOutOfBounds =
        borderIsOutOfBounds &&
        (isPassedRight || isPassedBottom || isPassedLeft || isPassedTop);

      const playerHitObstacle = apple?.boundaries.has(position);

      // end game if player died
      if (playerAteBody || playerOutOfBounds || playerHitObstacle) {
        endGame();
      }

      // border out of bounds is false pathfinder
      if (!borderIsOutOfBounds) {
        if (isPassedRight) newPosition = position - total + 1;
        else if (isPassedLeft) newPosition = position + total - 1;
        else if (isPassedTop) newPosition = position + max - total;
        else if (isPassedBottom) newPosition = position - max + total;
      }

      lastTick.current = tick;
      setPosition(newPosition);
    }
  }, [
    position,
    direction,
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
    lastPositions,
    lastTick,
    setPosition,
  ]);
};
