import React, { useEffect, useRef, useState } from "react";
import {
  AppleGameTile,
  Difficulty,
  DimensionatorGameTile,
  GameState,
  HypercubeGameTile,
  OPPOSITE_DIRECTION,
  ObstacleGameTile,
  SNAKE_GRID_ID,
  SnakeGameState,
  TILE_SIZE,
  TileStates,
  getCoordsFromString,
} from ".";
import { SnakeGameInstance } from "./utils/SnakeGameInstance";
import classNames from "classnames";
import { GridToggle } from "./GridToggle";
import {
  SnakeBodyGameTile,
  SnakeHeadGameTile,
  StaticTileGrid,
} from "./GameTiles";
import { SnakeGameTailTile } from "./GameTiles/SakeTailTile";
import { SnakeGameContentBox } from "./SnakeGameContentBox";
import { Coords } from "./utils/gridElements/types";
import { NomNom } from "./icons/NomNom";

export const GameGrid: React.FC<{
  gameState: SnakeGameState;
  gameInstance: SnakeGameInstance;
  gridSize: number;
}> = ({ gameState, gameInstance, gridSize }) => {
  const [showLines, setShowLines] = useState(false);
  const [nomCoords, setNomCoords] = useState<Coords>();
  const appleCoords = gameInstance?.apple?.coords;
  const currentGameState = gameState.gameState;
  const currentDifficulty = gameState.difficulty;
  const lastAppleCoords = useRef<Coords>();
  const lastDifficulty = useRef<Difficulty>(currentDifficulty);
  if (!lastAppleCoords.current && currentGameState === GameState.Start) {
    lastAppleCoords.current = appleCoords;
  }

  useEffect(() => {
    if (
      currentGameState === GameState.Dead ||
      currentDifficulty !== lastDifficulty.current
    ) {
      setNomCoords(undefined);
      lastAppleCoords.current = undefined;
      lastDifficulty.current = currentDifficulty;
    } else if (
      currentGameState === GameState.Start &&
      nomCoords === undefined &&
      (appleCoords?.x !== lastAppleCoords?.current?.x ||
        appleCoords?.y !== lastAppleCoords?.current?.y)
    ) {
      setNomCoords(lastAppleCoords.current);
      lastAppleCoords.current = appleCoords;
    }
  }, [currentGameState, appleCoords, nomCoords, currentDifficulty]);

  const lastBodyElement =
    gameInstance.snake.body[gameInstance.snake.body.length - 1];
  const lastBodyElementCoords = lastBodyElement.getCoordsInPixels();

  return (
    <div
      className={classNames("grid", showLines && "grid-lines")}
      id={SNAKE_GRID_ID}
    >
      <StaticTileGrid size={gridSize} />
      {gameInstance.snake.body.map((value, i) => (
        <SnakeBodyGameTile
          key={`body-${i}-${gameInstance.length}`}
          from={value.from}
          to={value.to}
          index={i}
          coords={value.getCoordsInPixels()}
          lastCoords={value.lastPosition}
          isLast={i === gameInstance.snake.body.length - 1}
          isNew={value.isNew}
        />
      ))}

      <SnakeGameTailTile
        key="tail"
        tileSize={`${TILE_SIZE}px`}
        x={lastBodyElementCoords.x}
        y={lastBodyElementCoords.y}
        index={lastBodyElement.index}
        from={lastBodyElement.from || OPPOSITE_DIRECTION[lastBodyElement.to]}
        to={lastBodyElement.to}
      />
      {gameInstance.apple.coords && (
        <AppleGameTile
          key="apple"
          gameInstance={gameInstance}
          tileState={TileStates.Apple}
          x={gameInstance.apple.getGridXPosition() + "px"}
          y={gameInstance.apple.getGridYPosition() + "px"}
        />
      )}
      {nomCoords && (
        <NomNom clear={() => setNomCoords(undefined)} coords={nomCoords} />
      )}
      {gameInstance.apple.boundaries &&
        Array.from(gameInstance.apple.boundaries).map((boundary) => {
          const { x, y } = getCoordsFromString(boundary);
          return (
            <ObstacleGameTile
              key={boundary}
              gameInstance={gameInstance}
              tileState={TileStates.Obstacle}
              x={gameInstance.apple.getGridXPosition(x) + "px"}
              y={gameInstance.apple.getGridYPosition(y) + "px"}
            />
          );
        })}
      {gameInstance.hyperCube?.coords && (
        <HypercubeGameTile
          key="hypercube"
          gameInstance={gameInstance}
          tileState={TileStates.Hypercube}
          x={gameInstance.hyperCube.getGridXPosition() + "px"}
          y={gameInstance.hyperCube.getGridYPosition() + "px"}
        />
      )}
      {gameInstance.dimensionator?.coords && (
        <DimensionatorGameTile
          key="dimensionator"
          gameInstance={gameInstance}
          tileState={TileStates.Dimensionator}
          x={gameInstance.dimensionator.getGridXPosition() + "px"}
          y={gameInstance.dimensionator.getGridYPosition() + "px"}
        />
      )}
      <SnakeHeadGameTile
        index={-1}
        from={
          gameInstance.snake.head.from ||
          OPPOSITE_DIRECTION[gameInstance.direction.direction]
        }
        direction={gameInstance.direction.direction}
        to={gameInstance.snake.head.direction}
        coords={gameInstance.snake.head.getCoordsInPixels()}
        lastCoords={gameInstance.snake.head.lastPosition}
      />
      <GridToggle callback={setShowLines} showLines={showLines} />
      <SnakeGameContentBox
        gameState={gameState.gameState}
        difficultyLevel={gameState.difficulty}
        gameInstance={gameInstance}
      />
    </div>
  );
};
