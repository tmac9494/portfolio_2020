import React, { useRef } from "react";
import { SnakeGameState, Difficulty, DEFAULT_LENGTH } from "./types";

export type HighScoreSchema = {
  state: SnakeGameState;
  difficulty: Difficulty;
};

export const HighScores: React.FC<{
  gameHistory: HighScoreSchema[];
  difficulty: Difficulty;
  length: number;
}> = ({ gameHistory, difficulty, length }) => {
  const history = gameHistory.filter((item) => item.difficulty === difficulty);
  const lastScore = useRef<number>(length - DEFAULT_LENGTH);
  if (lastScore.current > length) {
    lastScore.current = 0;
  } else if (length !== lastScore.current + 1) {
    lastScore.current++;
  }
  return (
    <div className="scores-container">
      <div className="game-score">
        <div key={`count_${length}`} className="scoreboard-counter">
          <h1>{lastScore.current - DEFAULT_LENGTH}</h1>
          <h1>{length - DEFAULT_LENGTH}</h1>
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
