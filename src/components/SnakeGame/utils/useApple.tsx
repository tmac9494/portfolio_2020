import { useCallback, useEffect } from "react";
import {
  SnakeGameState,
  AppleTile,
  Difficulty,
  GameState,
  UpdateSnakeGameState,
} from "../types";

export const useApple = ({
  position,
  total,
  lastPositions,
  length,
  updateGameState,
  difficulty,
  max,
  apple,
  gameState,
}: {
  position: number;
  total: number;
  lastPositions: Set<number>;
  length: number;
  updateGameState: UpdateSnakeGameState;
  difficulty: Difficulty;
  max: number;
  apple: AppleTile | undefined;
  gameState: GameState;
}) => {
  // create apple logic
  const setNewApple = useCallback(
    (overrides?: Partial<SnakeGameState>) => {
      // get valid apple position
      const getNewPosition = () => {
        const generatePosition = () => Math.floor(Math.random() * max);
        const snakeBuffer = new Set(
          [
            // create larger buffer around snake's head
            position,
            position + 1,
            position + 2,
            position - 1,
            position - 1,
            position + total,
            position - total,
            position + total + 1,
            position - total + 1,
            position + total - 1,
            position - total - 1,
            // snake body
            ...Array.from(lastPositions).slice(0, length + 1),
          ].reduce((prev: number[], current) => {
            return [
              ...prev,
              current,
              current - total,
              current + total,
              current - 1,
              current + 1,
            ];
          }, [])
        );
        let newPosition = position;
        do {
          newPosition = generatePosition();
        } while (snakeBuffer.has(newPosition));
        return newPosition;
      };
      // set new apple
      updateGameState({
        apple: new AppleTile({
          location: getNewPosition(),
          hasBoundaries: difficulty === Difficulty.Hard,
          gridWidth: total,
        }),
        ...overrides,
      });
    },
    [difficulty, total, updateGameState, position, length, max, lastPositions]
  );

  // create apple / eat apple
  useEffect(() => {
    if (apple?.location === position) {
      setNewApple({ length: length + 1 });
    } else if (!apple && gameState === GameState.Start) {
      setNewApple();
    }
  }, [apple, length, position, setNewApple, gameState]);
};
