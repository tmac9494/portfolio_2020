import React, { CSSProperties } from "react";
import { TileStates } from "../types";
import { DimensionatorIcon, LightningIcon } from "../icons";

const icons: Partial<Record<TileStates, React.FC>> = {
  [TileStates.Dimensionator]: DimensionatorIcon,
  [TileStates.Hypercube]: LightningIcon,
};

const descriptions: Partial<Record<TileStates, string>> = {
  [TileStates.Dimensionator]: "Allows snake to jump across boundaries",
  [TileStates.Hypercube]: "Increases snake speed by 20%",
};

export const PowerUpDescription = ({
  powerup,
  tileStyle,
}: {
  powerup: TileStates;
  tileStyle: CSSProperties;
}) => {
  if (!icons[powerup]) return null;
  const Icon = icons[powerup] as React.FC;
  const description = descriptions[powerup];
  return (
    <div className="margin-bottom-2 flex flex-row align-center">
      <div
        style={tileStyle}
        className={`game-tile tile-type-${powerup} margin-right-2`}
      >
        <Icon />
      </div>
      <span className="text-left">{description}</span>
    </div>
  );
};
