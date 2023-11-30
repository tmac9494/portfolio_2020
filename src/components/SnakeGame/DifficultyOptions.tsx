import React from "react";
import { Difficulty, SNAKE_GRID_ID } from "./types";

export const DifficultyOptions: React.FC<{
  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
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
        onClick={() => handleDifficultyChange(Difficulty.Easy)}
      >
        {Difficulty.Easy}
      </button>
      <button
        className={`difficulty-btn ${
          difficulty === Difficulty.Normal ? "active" : ""
        }`}
        onClick={() => handleDifficultyChange(Difficulty.Normal)}
      >
        {Difficulty.Normal}
      </button>
      <button
        className={`difficulty-btn ${
          difficulty === Difficulty.Hard ? "active" : ""
        }`}
        onClick={() => handleDifficultyChange(Difficulty.Hard)}
      >
        {Difficulty.Hard}
      </button>
    </div>
  );
};
