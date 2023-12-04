import React, { useRef } from "react";
import { SnakeGameState, Difficulty, DEFAULT_LENGTH } from "./types";
import { getSnakeGameHistory } from "./utils";

export type HighScoreSchema = {
  state: SnakeGameState;
  difficulty: Difficulty;
};

export const HighScores: React.FC<{
  difficulty: Difficulty;
  length: number;
}> = ({ difficulty, length }) => {
  const gameHistory = getSnakeGameHistory();
  const history = gameHistory.filter((item) => item.difficulty === difficulty);
  const lastScoreRef = useRef<number>(length - DEFAULT_LENGTH);
  if (lastScoreRef.current > length) {
    lastScoreRef.current = 0;
  } else if (length !== lastScoreRef.current + 1) {
    lastScoreRef.current++;
  }

  const currentScore = length - DEFAULT_LENGTH;
  const lastScore = lastScoreRef.current - DEFAULT_LENGTH;

  return (
    <div className="scores-container">
      <div className="game-score">
        <div key={`count_${length}`} className="scoreboard-counter">
          <h1>{lastScore < 0 ? "--" : lastScore}</h1>
          <h1>{currentScore}</h1>
        </div>
      </div>
      {history.length > 0 && (
        <div className="high-scores-container">
          <h4>High Scores</h4>
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
                <div key={`${item.state.length}_${i}`}>
                  <span>{item.state.length - DEFAULT_LENGTH}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
