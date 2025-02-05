import React from "react";
import { Tile } from "../Tile";
import { TileStates } from "../types";

const Grid: React.FC<{
  size: number;
}> = ({ size }) => {
  let gridList = [];
  for (let i = 0; i < size; i++) {
    gridList.push(<Tile key={i} tileState={TileStates.Inactive} />);
  }
  return <div className="grid-tiles flex flex-row">{gridList}</div>;
};

export const StaticTileGrid = React.memo(Grid);
