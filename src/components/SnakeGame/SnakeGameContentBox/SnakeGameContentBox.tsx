import React, { memo } from "react";
import { Difficulty, GameState, TileStates } from "../types";
import { SnakeGameInstance } from "../utils/SnakeGameInstance";
import { TILE_SIZE } from "../types";
import { PowerUpDescription } from "./PowerUpDescription";

type GameContent = Record<GameState, string[]>;

const ContentBox: React.FC<{
  gameState: GameState;
  difficultyLevel: Difficulty;
  gameInstance: SnakeGameInstance;
}> = ({ gameState, gameInstance }) => {
  const isMobile = window.innerWidth < 800;

  const GAME_TITLES: GameContent = {
    [GameState.Dead]: ["Game Over"],
    [GameState.Pause]: ["Game Paused"],
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
          <PowerUpDescription
            powerup={TileStates.Hypercube}
            tileStyle={tileStyle}
          />
          {gameInstance.difficulty !== Difficulty.Easy && (
            <PowerUpDescription
              powerup={TileStates.Dimensionator}
              tileStyle={tileStyle}
            />
          )}
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

export const SnakeGameContentBox = memo(
  ContentBox,
  (prev, next) =>
    prev.gameState === next.gameState &&
    prev?.difficultyLevel === next?.difficultyLevel
);
