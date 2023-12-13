import React from "react";
import { GridElementEffects, SnakeGameInstance } from "../utils";
import { DimensionatorIcon, LightningIcon } from "../icons";
import classNames from "classnames";
import "./styles.scss";
const icons = {
  [GridElementEffects.Dimensionator]: DimensionatorIcon,
  [GridElementEffects.Hypercube]: LightningIcon,
};
export const EffectIndicator: React.FC<{
  gameInstance: SnakeGameInstance;
  effect: GridElementEffects;
}> = ({ gameInstance, effect }) => {
  const Icon = icons[effect];

  const duration = gameInstance[effect]?.effectDuration || 0;
  const timeElpased = Date.now() - (gameInstance[effect]?.lastActivatedAt || 0);
  const percentage = 100 - (timeElpased / duration) * 100;

  if (!gameInstance[effect]?.effectIsActive) {
    return null;
  }
  return (
    <div className={classNames("snake-game-effect flex flex-row", effect)}>
      <Icon />
      <div className={classNames("duration-bar", effect)}>
        <span
          style={{
            // animation: `timeoutBar ${gameInstance[effect]?.effectDuration}ms linear forwards`,
            height: percentage + "%",
          }}
        />
      </div>
    </div>
  );
};
