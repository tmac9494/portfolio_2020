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
      className="snake-head-container"
      style={{
        width: tileSize,
        height: tileSize,
        transform: `translate(${coords.x}px, ${coords.y}px)`,
      }}
    >
      <div
        key="hider"
        className="head-hide-lower-layer"
        style={{
          width: tileSize,
          height: tileSize,
        }}
      />
      <div
        key="head"
        className={classNames(
          "tile-type-head",
          from && `from-${from}`,
          to && `to-${to}`,
          direction
        )}
        style={{
          width: tileSize,
          height: tileSize,
        }}
      >
        <div className="snake-eyes">
          <div className="eye left" />
          <div className="eye right" />
        </div>
      </div>
    </div>
  );
};

export const SnakeHeadGameTile = React.memo(SnakeHeadTile, (prev, next) => {
  return (
    prev.from === next.from &&
    prev.to === next.to &&
    prev?.coords?.x === next?.coords?.x &&
    prev?.coords?.y === next?.coords?.y &&
    prev?.direction === next?.direction
  );
});
