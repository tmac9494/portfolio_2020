import React from "react";
import { GameState } from "./types";

type GameContent = Record<GameState, string[]>;

export const SnakeGameContentBox: React.FC<{ gameState: GameState }> = ({
  gameState,
}) => {
  const isMobile = window.innerWidth < 800;

  const GAME_TITLES: GameContent = {
    [GameState.Dead]: ["Game Over"],
    [GameState.Pause]: ["Pause"],
    [GameState.Idle]: ["React Snake"],
    [GameState.Start]: [],
  };

  const GAME_DESCRIPTIONS: GameContent = {
    [GameState.Dead]: [`${isMobile ? "Touch" : "Press spacebar"} to restart`],
    [GameState.Pause]: [`${isMobile ? "Touch" : "Press spacebar"} to continue`],
    [GameState.Idle]: [
      `${isMobile ? "Swipe on grid" : "W/A/S/D"} - Snake Movement`,
      `${isMobile ? "Touch" : "Spacebar"} - Pause/Continue/Restart`,
    ],
    [GameState.Start]: [],
  };

  const title = GAME_TITLES[gameState];
  const description = GAME_DESCRIPTIONS[gameState];

  if (!!!(title.length ?? description.length)) return null;

  return (
    <div key={gameState} className="snake-game-info-box">
      <h1>{title}</h1>
      {description && description.map((text) => <p key={text}>{text}</p>)}
    </div>
  );
};
