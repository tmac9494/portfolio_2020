import React from "react";
import { Directions, OPPOSITE_DIRECTION } from "../types";
import classNames from "classnames";

export const SakeTailTile: React.FC<{
  index: number;
  from: Directions;
  to: Directions;
  x: number;
  y: number;
  tileSize: string;
}> = ({ from, to, index, x, y, tileSize }) => {
  //   const hideBorder = from && OPPOSITE_DIRECTION[from];
  return (
    <>
      <div
        key="body"
        className={classNames(
          "tile-type-body tail",
          from && `from-${from}`,
          to && `to-${to}`,
          "last",
          from !== OPPOSITE_DIRECTION[to] && "corner-border",
          //   hideBorder && `hide-border-${hideBorder}`,
          `hide-border-${to}`
        )}
        style={{
          width: tileSize,
          height: tileSize,
          top: 0,
          left: 0,
          position: "absolute",
          transform: `translate(${x}px, ${y}px)`,
          zIndex: index + 1,
        }}
      />
    </>
  );
};
