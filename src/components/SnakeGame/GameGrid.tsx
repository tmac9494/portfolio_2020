import React, { useMemo, useState } from "react";
import {
  OPPOSITE_DIRECTION,
  SNAKE_GRID_ID,
  SnakeGameState,
  Tile,
  TileStates,
  getCoordsFromString,
} from ".";
import { SnakeGameContentBox } from "./SnakeGameContentBox";
import { SnakeGameInstance } from "./utils/SnakeGameInstance";
import classNames from "classnames";
import { GridToggle } from "./GridToggle";
import { SnakeBodyTile, SnakeHeadTile } from "./GameTiles";

export const GameGrid: React.FC<{
  gameState: SnakeGameState;
  gameInstance: SnakeGameInstance;
  gridSize: number;
}> = ({ gameState, gameInstance, gridSize }) => {
  const [showLines, setShowLines] = useState(false);

  // build grid
  const grid = useMemo(() => {
    let gridList = [];
    for (let i = 0; i < gridSize; i++) {
      gridList.push(<Tile key={i} tileState={TileStates.Inactive} />);
    }
    return gridList;
  }, [gridSize]);

  return (
    <div
      className={classNames("grid", showLines && "grid-lines")}
      id={SNAKE_GRID_ID}
    >
      <div className="grid-tiles flex flex-row">{grid}</div>
      {gameInstance.snake.body.map((value, i) => (
        <SnakeBodyTile
          key={`body-${i}-${gameInstance.length}`}
          from={value.from}
          to={value.to}
          index={i}
          coords={value.getCoordsInPixels()}
          isLast={i === gameInstance.snake.body.length - 1}
        />
      ))}
      {gameInstance.apple.coords && (
        <Tile
          key="apple"
          gameInstance={gameInstance}
          tileState={TileStates.Apple}
          x={gameInstance.apple.getGridXPosition() + "px"}
          y={gameInstance.apple.getGridYPosition() + "px"}
        />
      )}
      {gameInstance.apple.boundaries &&
        Array.from(gameInstance.apple.boundaries).map((boundary) => {
          const { x, y } = getCoordsFromString(boundary);
          return (
            <Tile
              key={boundary}
              gameInstance={gameInstance}
              tileState={TileStates.Obstacle}
              x={gameInstance.apple.getGridXPosition(x) + "px"}
              y={gameInstance.apple.getGridYPosition(y) + "px"}
            />
          );
        })}
      {gameInstance.hyperCube?.coords && (
        <Tile
          key="hypercube"
          gameInstance={gameInstance}
          tileState={TileStates.Hypercube}
          x={gameInstance.hyperCube.getGridXPosition() + "px"}
          y={gameInstance.hyperCube.getGridYPosition() + "px"}
        />
      )}
      {gameInstance.dimensionator?.coords && (
        <Tile
          key="dimensionator"
          gameInstance={gameInstance}
          tileState={TileStates.Dimensionator}
          x={gameInstance.dimensionator.getGridXPosition() + "px"}
          y={gameInstance.dimensionator.getGridYPosition() + "px"}
        />
      )}
      <SnakeHeadTile
        index={-1}
        from={
          gameInstance.snake.head.from ||
          OPPOSITE_DIRECTION[gameInstance.direction.direction]
        }
        direction={gameInstance.direction.direction}
        to={gameInstance.snake.head.direction}
        coords={gameInstance.snake.head.getCoordsInPixels()}
      />
      <GridToggle callback={setShowLines} showLines={showLines} />
      <SnakeGameContentBox
        gameState={gameState.gameState}
        gameInstance={gameInstance}
      />
    </div>
  );
};
