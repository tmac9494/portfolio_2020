import React from "react";
import { Coords } from "../utils/gridElements/types";
import { TILE_SIZE } from "../types";

export const NomNom: React.FC<{
  coords?: Coords;
  clear: () => void;
}> = ({ coords, clear }) => {
  if (!coords) return null;

  const tileSize = `${TILE_SIZE}px`;
  return (
    <div
      style={{
        width: tileSize,
        height: tileSize,
        transform: `translate(${coords.x * TILE_SIZE}px, ${
          coords.y * TILE_SIZE
        }px)`,
      }}
      className="nomnom-effect"
    >
      <h1 onAnimationEnd={clear}>Nom!</h1>
    </div>
  );
};
