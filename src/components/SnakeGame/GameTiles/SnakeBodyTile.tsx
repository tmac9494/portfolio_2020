import React from "react";
import { Directions, InteractiveElementProps, TILE_SIZE } from "../types";
import classNames from "classnames";

export interface SnakeBodyTileProps extends InteractiveElementProps {
  index: number;
  from: Directions | null;
  to: Directions;
  isLast?: boolean;
}

export const SnakeBodyTile: React.FC<SnakeBodyTileProps> = ({
  coords,
  index,
  from,
  to,
  isLast,
}) => {
  const tileSize = `${TILE_SIZE}px`;

  return (
    <div
      className={classNames(
        "tile-type-body",
        from && `from-${from}`,
        to && `to-${to}`,
        !!isLast && "last"
      )}
      style={{
        width: tileSize,
        height: tileSize,
        left: coords.x,
        top: coords.y,
        zIndex: index + 5,
      }}
    />
  );
};
