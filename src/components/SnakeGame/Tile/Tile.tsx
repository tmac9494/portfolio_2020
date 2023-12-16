import React from "react";
import { Directions, TILE_SIZE, TileStates } from "../";
import {
  DimensionatorIcon,
  FoodIcon,
  HazardIcon,
  LightningIcon,
} from "../icons";
import classNames from "classnames";
import { SnakeGameInstance } from "../utils";
import "./styles.scss";

export const Tile: React.FC<{
  tileState: TileStates;
  gameInstance?: SnakeGameInstance;
  x?: string;
  y?: string;
  from?: Directions | null;
  to?: Directions;
  isLast?: boolean;
}> = ({ tileState, gameInstance, x, y, from, to, isLast }) => {
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
        from && `from-${from}`,
        to && `to-${to}`,
        !!isLast && "last",
        tileState === TileStates.Head && direction
      )}
    >
      {tileState === TileStates.Hypercube && <LightningIcon />}
      {tileState === TileStates.Apple && <FoodIcon />}
      {tileState === TileStates.Obstacle && <HazardIcon />}
      {tileState === TileStates.Dimensionator && <DimensionatorIcon />}
      {tileState === TileStates.Head && (
        <div className="snake-eyes">
          {direction !== Directions.Left && <div className="eye" />}
          {direction !== Directions.Right && <div className="eye" />}
        </div>
      )}
    </div>
  );
};
