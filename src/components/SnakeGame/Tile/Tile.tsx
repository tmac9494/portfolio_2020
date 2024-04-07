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
import { Coords } from "../utils/gridElements/types";

type TileProps = {
  tileState: TileStates;
  gameInstance?: SnakeGameInstance;
  x?: string;
  y?: string;
  isLast?: boolean;
};

export const Tile: React.FC<TileProps> = ({
  tileState,
  gameInstance,
  x,
  y,
}) => {
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

const compareCoords = (prev?: TileProps, next?: TileProps) => {
  return prev?.x === next?.x && prev?.y === next?.y;
};

export const HypercubeGameTile = React.memo(Tile, compareCoords);

export const AppleGameTile = React.memo(Tile, compareCoords);

export const ObstacleGameTile = React.memo(Tile, compareCoords);

export const DimensionatorGameTile = React.memo(Tile, compareCoords);
