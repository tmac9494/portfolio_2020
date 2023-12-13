import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GameGrid } from "./GameGrid";
import "./styles.scss";
import { SnakeGameState, TILE_SIZE, difficulties } from "./types";
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
        id="snake-game"
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
      >
        <div className="snake-game-effect-container flex flex-row">
          <EffectIndicator
            gameInstance={gameInstance.current}
            effect={GridElementEffects.Dimensionator}
          />
          <EffectIndicator
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
