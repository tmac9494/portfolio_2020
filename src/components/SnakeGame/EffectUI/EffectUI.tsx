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
  duration: number;
  gameInstance: SnakeGameInstance;
  effect: GridElementEffects;
}> = ({ gameInstance, effect, duration }) => {
  const Icon = icons[effect];

  const effectDuration = gameInstance[effect]?.effectDuration || 0;
  const percentage = (duration / effectDuration) * 100;

  if (!gameInstance[effect]?.effectIsActive) {
    return null;
  }
  let style: any = { height: `${percentage}%` };
  if (percentage < 98) {
    style.borderTopRightRadius = 0;
  }

  return (
    <div
      className={classNames(
        "snake-game-effect flex flex-row",
        effect,
        percentage < 15 && "hurry"
      )}
    >
      <Icon />
      <div className={classNames("duration-bar", effect)}>
        <span style={style} />
      </div>
    </div>
  );
};
