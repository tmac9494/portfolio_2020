import React from "react";
import { GameState, SNAKE_GRID_ID, SnakeGameState, Tile, TileStates } from ".";
import { SnakeGameContentBox } from "./SnakeGameContentBox";
import { SnakeGameInstance } from "./utils/SnakeGameInstance";

export const GameGrid: React.FC<{
  gameState: SnakeGameState;
  gameInstance: SnakeGameInstance;
}> = ({ gameState, gameInstance }) => {
  // build grid
  let gridList = [];
  for (let i = 0; i < gameInstance.max; i++) {
    const bodyIndex =
      gameInstance.lastPositions.has(i) &&
      Array.from(gameInstance.lastPositions).indexOf(i);
    gridList.push(
      <Tile
        bodyIndex={bodyIndex}
        key={i}
        tileState={
          i === gameState.position
            ? TileStates.Head
            : i === gameState.apple?.location
            ? TileStates.Apple
            : i === gameInstance?.hyperCube?.location
            ? TileStates.Hypercube
            : i !== gameState.position &&
              bodyIndex !== false &&
              bodyIndex < gameState.length
            ? TileStates.Body
            : gameState.apple?.boundaries.has(i)
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
      tabIndex={0}
      onBlur={() =>
        gameState.gameState === GameState.Start && gameInstance.pauseGame()
      }
    >
      {gridList}
      <SnakeGameContentBox gameState={gameState.gameState} />
    </div>
  );
};
