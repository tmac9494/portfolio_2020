import React, { useEffect, useRef, useState } from "react";
import { GameGrid } from "./GameGrid";
import "./styles.scss";
import { GameState, SNAKE_GAME_ID, SnakeGameState, TILE_SIZE } from "./types";
import { DifficultyOptions } from "./DifficultyOptions";
import { HighScores } from "./HighScores";
import { SnakeGameInstance } from "./utils/SnakeGameInstance";
import classNames from "classnames";
import { EffectIndicator } from "./EffectUI";
import { GridElementEffects } from "./utils";

export const SnakeGame: React.FC<{
  size: number;
  debug?: boolean;
}> = ({ size = 15, debug = false }) => {
  // game state
  const [gameState, setGameState] = useState<SnakeGameState>();

  // game instance logic outside of react render cycle
  const gameInstance = useRef(
    new SnakeGameInstance({
      gridWidth: size,
      renderDispatch: setGameState,
      debug,
    })
  );

  // initial game render/setup/cleanup
  useEffect(() => {
    const currentRef = gameInstance.current;
    currentRef.initialize();
    return () => currentRef.cleanUp();
  }, []);

  // null until state setup
  if (gameState === undefined) {
    return null;
  }

  return (
    <>
      <div
        id={SNAKE_GAME_ID}
        className={classNames(
          gameState.difficulty,
          gameInstance.current?.hyperCube?.effectIsActive && "hyper-buff",
          gameInstance.current?.dimensionator?.effectIsActive &&
            "dimensionator-buff"
        )}
        style={{ maxWidth: TILE_SIZE * size + 2 + "px" }}
        onTouchMove={gameInstance.current.onTouchMove}
        onTouchStart={gameInstance.current.onTouchStart}
        onTouchEnd={gameInstance.current.onTouchEnd}
        onKeyDown={gameInstance.current.onKeyDown}
        onKeyUp={gameInstance.current.onKeyUp}
        tabIndex={0}
        onBlur={() =>
          gameState.gameState === GameState.Start &&
          gameInstance.current.pauseGame()
        }
      >
        <div className="snake-game-effect-container flex flex-row">
          <EffectIndicator
            duration={gameState.effects[GridElementEffects.Dimensionator]}
            gameInstance={gameInstance.current}
            effect={GridElementEffects.Dimensionator}
          />
          <EffectIndicator
            duration={gameState.effects[GridElementEffects.Hypercube]}
            gameInstance={gameInstance.current}
            effect={GridElementEffects.Hypercube}
          />
        </div>
        <GameGrid gameState={gameState} gameInstance={gameInstance.current} />
        <HighScores
          difficulty={gameState.difficulty}
          length={gameState.length}
        />
      </div>
      <DifficultyOptions
        difficulty={gameState.difficulty}
        setDifficulty={gameInstance.current.changeDifficulty}
      />
    </>
  );
};
