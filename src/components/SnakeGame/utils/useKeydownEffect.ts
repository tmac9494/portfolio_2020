import { GameState, SnakeGameCache, UpdateSnakeGameState } from "../types";

export enum SnakeGameDirectionKeys {
  W = "w",
  A = "a",
  S = "s",
  D = "d",
}

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
      switch (e.key.toLowerCase()) {
        case SnakeGameDirectionKeys.W:
          gameCache.direction.addTopKey();
          break;
        case SnakeGameDirectionKeys.S:
          gameCache.direction.addBottomKey();
          break;
        case SnakeGameDirectionKeys.A:
          gameCache.direction.addLeftKey();
          break;
        case SnakeGameDirectionKeys.D:
          gameCache.direction.addRightKey();
          break;
      }
    }
  };
};

export const useKeyupEffect = ({
  gameCache,
}: {
  gameCache: SnakeGameCache;
}) => {
  return (e: any) => {
    switch (e.key.toLowerCase()) {
      case SnakeGameDirectionKeys.W:
        gameCache.direction.removeTopKey();
        break;
      case SnakeGameDirectionKeys.S:
        gameCache.direction.removeBottomKey();
        break;
      case SnakeGameDirectionKeys.A:
        gameCache.direction.removeLeftKey();
        break;
      case SnakeGameDirectionKeys.D:
        gameCache.direction.removeRightKey();
        break;
    }
  };
};