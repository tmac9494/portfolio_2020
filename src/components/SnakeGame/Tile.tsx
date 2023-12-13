import React from "react";
import { Directions, TILE_SIZE, TileStates } from "./";
import {
  DimensionatorIcon,
  FoodIcon,
  HazardIcon,
  LightningIcon,
} from "./icons";
import classNames from "classnames";
import { SnakeGameInstance } from "./utils";

export const Tile: React.FC<{
  tileState: TileStates;
  bodyIndex: number | false;
  gameInstance: SnakeGameInstance;
  index: number;
}> = ({ tileState, bodyIndex, index, gameInstance }) => {
  const tileSize = `${TILE_SIZE}px`;

  const {
    deltas,
    lastPositions,
    direction: { direction },
  } = gameInstance;

  let directionFrom: Directions | null = null;

  if (tileState === TileStates.Head) {
    const previousPosition = Array.from(lastPositions)[0];
    switch (index) {
      case previousPosition + deltas[Directions.Top]:
        directionFrom = Directions.Bottom;
        break;
      case previousPosition + deltas[Directions.Right]:
        directionFrom = Directions.Left;
        break;
      case previousPosition + deltas[Directions.Left]:
        directionFrom = Directions.Right;
        break;
      case previousPosition + deltas[Directions.Bottom]:
        directionFrom = Directions.Top;
        break;
    }
  }

  return (
    <div
      style={{
        width: tileSize,
        height: tileSize,
      }}
      className={classNames(
        `game-tile tile-type-${tileState}`,
        tileState === TileStates.Head && direction,
        directionFrom && `from-${directionFrom}`
      )}
    >
      {tileState === TileStates.Hypercube && <LightningIcon />}
      {tileState === TileStates.Apple && <FoodIcon />}
      {tileState === TileStates.Obstacle && <HazardIcon />}
      {tileState === TileStates.Dimensionator && <DimensionatorIcon />}
      {tileState === TileStates.Head && (
        <div className="snake-eyes">
          {direction !== Directions.Left && <span />}
          {direction !== Directions.Right && <span />}
        </div>
      )}
    </div>
  );
};
