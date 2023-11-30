import React from "react";
import { TILE_SIZE, TileStates } from "./";

export const Tile: React.FC<{
  tileState: TileStates;
  bodyIndex: number | false;
}> = ({ tileState, bodyIndex }) => {
  const tileSize = `${TILE_SIZE}px`;
  return (
    <div
      style={{
        width: tileSize,
        height: tileSize,
        // opacity:
        //   tileState === TileStates.Body && bodyIndex
        //     ? `0.${8 - bodyIndex < 0 ? 2 : 2 + (8 - bodyIndex || 1)}`
        //     : 1,
      }}
      className={`game-tile tile-type-${tileState}`}
    ></div>
  );
};
