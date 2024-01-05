import React from "react";
import { TILE_SIZE, TileStates } from "../";
import {
  DimensionatorIcon,
  FoodIcon,
  HazardIcon,
  LightningIcon,
} from "../icons";
import classNames from "classnames";
import { SnakeGameInstance } from "../utils/SnakeGameInstance";
import "./styles.scss";

export const Tile: React.FC<{
  tileState: TileStates;
  gameInstance?: SnakeGameInstance;
  x?: string;
  y?: string;
  isLast?: boolean;
}> = ({ tileState, gameInstance, x, y }) => {
  const tileSize = `${TILE_SIZE}px`;

  const direction = gameInstance?.direction.direction;

  return (
    <div
      style={{
        width: tileSize,
        height: tileSize,
        left: x,
        top: y,
      }}
      className={classNames(
        `game-tile tile-type-${tileState}`,
        tileState === TileStates.Head && direction
      )}
    >
      {tileState === TileStates.Hypercube && <LightningIcon />}
      {tileState === TileStates.Apple && <FoodIcon />}
      {tileState === TileStates.Obstacle && <HazardIcon />}
      {tileState === TileStates.Dimensionator && <DimensionatorIcon />}
    </div>
  );
};
