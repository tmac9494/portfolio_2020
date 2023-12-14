import React from "react";
import { GameState } from "./types";
import { SnakeGameInstance } from "./utils";
import { DimensionatorIcon, LightningIcon } from "./icons";
import { TILE_SIZE } from "./types";

type GameContent = Record<GameState, string[]>;

export const SnakeGameContentBox: React.FC<{
  gameState: GameState;
  gameInstance: SnakeGameInstance;
}> = ({ gameState, gameInstance }) => {
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

  const BUTTON_TEXT: GameContent = {
    [GameState.Dead]: ["Play again"],
    [GameState.Pause]: ["Continue"],
    [GameState.Idle]: ["Start Game"],
    [GameState.Start]: [],
  };

  const title = GAME_TITLES[gameState];
  const description = GAME_DESCRIPTIONS[gameState];
  const buttonText = BUTTON_TEXT[gameState];

  if (!!!(title.length ?? description.length)) return null;
  const tileStyle = { width: TILE_SIZE + "px", height: TILE_SIZE + "px" };

  return (
    <div key={gameState} className="snake-game-info-box">
      <h1>{title}</h1>
      {description && description.map((text) => <p key={text}>{text}</p>)}
      {gameState === GameState.Idle && (
        <div className="grid-elements-info">
          <div className="margin-bottom-2 flex flex-row align-center">
            <div
              style={tileStyle}
              className="game-tile tile-type-hypercube margin-right-2"
            >
              <LightningIcon />
            </div>
            <span>Increases snake speed by 20%</span>
          </div>
          <div className="margin-bottom-3 flex flex-row align-center">
            <div
              style={tileStyle}
              className="game-tile tile-type-dimensionator margin-right-2"
            >
              <DimensionatorIcon />
            </div>
            <span>Allows snake to safely cross borders</span>
          </div>
        </div>
      )}
      {isMobile && (
        <button
          onMouseDown={(e: React.MouseEvent) => {
            e.preventDefault();
            gameInstance.gameStateHandler();
          }}
          className="btn snake-game-btn"
          tabIndex={-1}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};
