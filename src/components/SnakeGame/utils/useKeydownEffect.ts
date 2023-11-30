import {
  GameState,
  Directions,
  GameDeltas,
  UpdateSnakeGameState,
} from "../types";

export const useKeydownEffect = ({
  lastPositions,
  gameState,
  direction,
  position,
  deltas,
  length,
  restartGame,
  updateGameState,
}: {
  lastPositions: React.MutableRefObject<Set<number>>;
  gameState: GameState;
  direction: React.MutableRefObject<Directions>;
  position: number;
  deltas: GameDeltas;
  length: number;
  updateGameState: UpdateSnakeGameState;
  restartGame: () => void;
}) => {
  return (e: any) => {
    const lastPosition = Array.from(lastPositions.current)[0];
    const isEmpty = length === 0;
    if (e.key === " ") {
      e.preventDefault();
      if (gameState === GameState.Idle || gameState === GameState.Start) {
        updateGameState({
          gameState:
            gameState === GameState.Idle ? GameState.Start : GameState.Pause,
        });
      } else if (gameState === GameState.Dead) {
        restartGame();
      } else if (gameState === GameState.Pause) {
        updateGameState({ gameState: GameState.Start });
      }
    } else if (gameState === GameState.Start) {
      switch (e.key) {
        case "w":
          if (isEmpty || lastPosition !== position + deltas[Directions.Top])
            direction.current = Directions.Top;
          break;
        case "s":
          if (isEmpty || lastPosition !== position + deltas[Directions.Bottom])
            direction.current = Directions.Bottom;
          break;
        case "a":
          if (isEmpty || lastPosition !== position + deltas[Directions.Left])
            direction.current = Directions.Left;
          break;
        case "d":
          if (isEmpty || lastPosition !== position + deltas[Directions.Right])
            direction.current = Directions.Right;
          break;
      }
    }
  };
};
