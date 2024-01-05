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
  lastCoords,
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
        // left: coords.x,
        // top: coords.y,

        transform: `translate(${coords.x}px, ${coords.y}px)`,
      }}
    >
      <div className="snake-eyes">
        <div className="eye left" />
        <div className="eye right" />
      </div>
    </div>
  );
};
