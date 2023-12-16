import React from "react";
import { Directions, TILE_SIZE } from "../types";
import { SnakeBodyTileProps } from "./SnakeBodyTile";
import classNames from "classnames";

interface SnakeHeadTileProps extends SnakeBodyTileProps {
  direction: Directions;
}

export const SnakeHeadTile: React.FC<SnakeHeadTileProps> = ({
  direction,
  from,
  to,
  coords,
}) => {
  const tileSize = `${TILE_SIZE}px`;

  return (
    <div
      className={classNames(
        "tile-type-head",
        from && `from-${from}`,
        to && `to-${to}`,
        direction
      )}
      style={{
        width: tileSize,
        height: tileSize,
        left: coords.x,
        top: coords.y,
      }}
    >
      <div className="snake-eyes">
        {direction !== Directions.Left && <div className="eye" />}
        {direction !== Directions.Right && <div className="eye" />}
      </div>
    </div>
  );
};
