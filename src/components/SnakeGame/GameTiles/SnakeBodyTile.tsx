import React, { CSSProperties } from "react";
import {
  Directions,
  InteractiveElementProps,
  OPPOSITE_DIRECTION,
  TILE_SIZE,
} from "../types";
import classNames from "classnames";
import { Coords } from "../utils/gridElements/types";

export interface SnakeBodyTileProps extends InteractiveElementProps {
  index: number;
  from: Directions | null;
  to: Directions;
  isLast?: boolean;
  lastCoords: Coords;
  isNew?: boolean;
}

export const SnakeBodyTile: React.FC<SnakeBodyTileProps> = ({
  from,
  to,
  coords,
  isLast,
  index,
  isNew,
}) => {
  const tileSize = `${TILE_SIZE}px`;
  const bufferTileSize = `${TILE_SIZE + 8}px`;
  const fromVertialDirection =
    from === Directions.Top || from === Directions.Bottom;

  const borderProperty = {
    [Directions.Right]: "borderRight",
    [Directions.Left]: "borderLeft",
    [Directions.Top]: "borderTop",
    [Directions.Bottom]: "borderBottom",
  };

  let vertical = fromVertialDirection ? from : to;
  let horizontal = fromVertialDirection ? to : from;
  const borderRadiusProperty = `border-${OPPOSITE_DIRECTION[vertical]}-${
    OPPOSITE_DIRECTION[horizontal as Directions]
  }-radius`;

  const isToHorizontal = to === Directions.Left || to === Directions.Right;

  let positioning: Record<Directions, number | string> = {
    top: "-1px",
    left: "-1px",
    right: "-1px",
    bottom: "-1px",
  };
  if (from) {
    positioning[from] = "auto";
    positioning[OPPOSITE_DIRECTION[from]] = "-1px";
    positioning[to] = "0";
  }

  const isStraight = from === OPPOSITE_DIRECTION[to];
  const isInverted = () => (isStraight ? isToHorizontal : !isToHorizontal);
  const widthCheck = isStraight ? isToHorizontal : !isToHorizontal;
  const widthClass = widthCheck ? "animate-x" : "animate-y";

  const borderFromRadiusA = `border-${
    fromVertialDirection
      ? OPPOSITE_DIRECTION[from as Directions]
      : OPPOSITE_DIRECTION[to]
  }-${
    fromVertialDirection
      ? OPPOSITE_DIRECTION[to]
      : OPPOSITE_DIRECTION[from as Directions]
  }-radius`;

  const componentStyle: any = {
    transform: `translate(${coords.x}px, ${coords.y}px)`,
    borderTop: "1px solid",
    borderRight: "1px solid",
    borderLeft: "1px solid",
    borderBottom: "1px solid",
    overflow: isLast ? "visible" : "hidden",
    [borderProperty[to]]: "none",
    [borderProperty[from as Directions]]: "none",
    width: tileSize,
    height: tileSize,
    position: "absolute",
    zIndex: !isStraight && isLast ? index + 2 : "",
    top: 0,
    left: 0,
  };

  const childStyle: any = {
    ...positioning,
    position: "absolute",
    transition: "background-color 1s, none",
    width: isNew ? tileSize : isInverted() ? bufferTileSize : tileSize,
    height: isNew ? tileSize : isInverted() ? tileSize : bufferTileSize,
    [borderProperty[to]]: "none",
    [borderProperty[from as Directions]]: "none",
    [borderFromRadiusA]: "14px",
  };

  if (!isStraight) {
    componentStyle[borderRadiusProperty] = "14px";
    if (isLast) {
      componentStyle[`border-${vertical}-${horizontal as Directions}-radius`] =
        "0px";
      childStyle[`border-${vertical}-${horizontal as Directions}-radius`] =
        "0px";
    }
  }

  return (
    <div
      className={classNames(
        "snake-body-container",
        from && `from-${from}`,
        to && `to-${to}`,
        !!isLast && "last",
        index === 0 && "first"
      )}
      style={componentStyle}
    >
      <div
        className={classNames(
          "tile-type-body",
          from && `from-${from}`,
          !!isLast && "last",
          isLast && "tail",
          !isNew && isLast && widthClass
        )}
        key={isLast ? `${coords.x}_${coords.y}` : ""}
        style={childStyle}
      />
    </div>
  );
};

export const SnakeBodyGameTile = React.memo(SnakeBodyTile, (prev, next) => {
  return (
    prev.from === next.from &&
    prev.to === next.to &&
    prev?.coords?.x === next?.coords?.x &&
    prev?.coords?.y === next?.coords?.y &&
    prev?.isLast === next?.isLast &&
    prev?.isNew === next?.isNew
  );
});
