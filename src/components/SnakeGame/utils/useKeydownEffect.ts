import { GameState, SnakeGameCache, UpdateSnakeGameState } from "../types";

export const useKeydownEffect = ({
  gameState,
  gameCache,
  updateGameState,
  gameStateHandler,
}: {
  gameState: GameState;
  updateGameState: UpdateSnakeGameState;
  gameCache: SnakeGameCache;
  gameStateHandler: () => void;
}) => {
  return (e: any) => {
    if (e.key === " ") {
      e.preventDefault();
      if (gameState === GameState.Start) {
        updateGameState({
          gameState: GameState.Pause,
        });
      }
      gameStateHandler();
    } else if (gameState === GameState.Start) {
      switch (e.key) {
        case "w":
          gameCache.direction.toTop();
          break;
        case "s":
          gameCache.direction.toBottom();
          break;
        case "a":
          gameCache.direction.toLeft();
          break;
        case "d":
          gameCache.direction.toRight();
          break;
      }
    }
  };
};
