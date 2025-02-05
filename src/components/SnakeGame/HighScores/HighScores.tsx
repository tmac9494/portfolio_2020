import React, { useEffect, useRef, useState } from "react";
import {
  SnakeGameState,
  Difficulty,
  DEFAULT_LENGTH,
  GameState,
} from "../types";
import { SnakeGameInstance } from "../utils/SnakeGameInstance";
import "./styles.scss";
import { TrohpyIcon } from "../icons";
import classNames from "classnames";

export type HighScoreSchema = {
  state: SnakeGameState;
  difficulty: Difficulty;
};

export const HighScoresContent: React.FC<{
  difficulty: Difficulty;
  length: number;
  gameInstance: SnakeGameInstance;
  gameState: GameState;
}> = ({ length, gameState, gameInstance, difficulty }) => {
  const [history, setHistory] = useState<HighScoreSchema[]>();

  const hasLatestState = useRef<boolean>(false);
  const lastDifficulty = useRef<Difficulty>(difficulty);

  useEffect(() => {
    if (
      gameState === GameState.Idle ||
      gameState === GameState.Dead ||
      difficulty !== lastDifficulty.current
    ) {
      setHistory(gameInstance.getGameHistory());
      hasLatestState.current = true;
      lastDifficulty.current = difficulty;
    }
    if (gameState === GameState.Start) {
      hasLatestState.current = false;
    }
  }, [gameState, gameInstance, difficulty]);

  const lastScoreRef = useRef<number>(length - DEFAULT_LENGTH);
  if (lastScoreRef.current > length) {
    lastScoreRef.current = 0;
  } else if (length !== lastScoreRef.current + 1) {
    lastScoreRef.current++;
  }

  const currentScore = length - DEFAULT_LENGTH;
  const lastScore = lastScoreRef.current - DEFAULT_LENGTH;

  return (
    <div className="scores-container flex flex-row">
      <div
        key={`count_${length}`}
        className={classNames("game-score", currentScore !== 0 && "blink")}
      >
        <div className="scoreboard-counter">
          <h1>{lastScore < 0 ? "--" : lastScore}</h1>
          <h1>{currentScore}</h1>
        </div>
      </div>
      {history && history.length > 0 && (
        <div className="high-scores-container">
          <div className="score-list">
            {history
              .sort((a, b) =>
                a.state.length < b.state.length
                  ? 1
                  : a.state.length > b.state.length
                  ? -1
                  : 0
              )
              .slice(0, 3)
              .map((item: HighScoreSchema, i: number) => (
                <div
                  className="high-score-item flex flex-row"
                  key={`${item.state.length}_${i}`}
                >
                  <TrohpyIcon className={["gold", "silver", "bronze"][i]} />
                  <span style={{ flexGrow: 2 }}>
                    {item.state.length - DEFAULT_LENGTH}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const HighScores = React.memo(
  HighScoresContent,
  (prevProps, nextProps) => {
    return (
      prevProps.gameState === nextProps.gameState &&
      prevProps.difficulty === nextProps.difficulty &&
      prevProps.length === nextProps.length
    );
  }
);
