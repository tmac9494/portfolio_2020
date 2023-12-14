import React from "react";
import { Difficulty, SNAKE_GRID_ID } from "./types";

export const DifficultyOptions: React.FC<{
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
}> = ({ difficulty, setDifficulty }) => {
  const handleDifficultyChange = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
    document.getElementById(SNAKE_GRID_ID)?.focus();
  };

  return (
    <div className="game-settings-container">
      <button
        className={`difficulty-btn ${
          difficulty === Difficulty.Easy ? "active" : ""
        }`}
        onMouseDown={(e: React.MouseEvent) => {
          e.preventDefault();
          handleDifficultyChange(Difficulty.Easy);
        }}
      >
        {Difficulty.Easy}
      </button>
      <button
        className={`difficulty-btn ${
          difficulty === Difficulty.Normal ? "active" : ""
        }`}
        onMouseDown={(e: React.MouseEvent) => {
          e.preventDefault();
          handleDifficultyChange(Difficulty.Normal);
        }}
      >
        {Difficulty.Normal}
      </button>
      <button
        className={`difficulty-btn ${
          difficulty === Difficulty.Hard ? "active" : ""
        }`}
        onMouseDown={(e: React.MouseEvent) => {
          e.preventDefault();
          handleDifficultyChange(Difficulty.Hard);
        }}
      >
        {Difficulty.Hard}
      </button>
    </div>
  );
};
