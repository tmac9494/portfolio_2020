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
        key={i}
        gameInstance={gameInstance}
        bodyIndex={bodyIndex}
        index={i}
        tileState={gameInstance.getTileTypeByIndex(i)}
      />
    );
  }

  return (
    <div className="grid" id={SNAKE_GRID_ID}>
      {gridList}
      <SnakeGameContentBox
        gameState={gameState.gameState}
        gameInstance={gameInstance}
      />
    </div>
  );
};
