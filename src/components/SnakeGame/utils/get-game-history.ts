import { HighScoreSchema } from "..";
import {
  DEFAULT_LENGTH,
  Difficulty,
  HISTORY_STORAGE_KEY,
  SnakeGameState,
} from "../types";

// history storage
export const getSnakeGameHistory = (): HighScoreSchema[] =>
  JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || "[]");

export const saveSnakeGameHistory = ({
  state,
  difficulty,
}: {
  state: SnakeGameState;
  difficulty: Difficulty;
}) => {
  const gameHistory = getSnakeGameHistory();
  if (
    state.length - DEFAULT_LENGTH !== 0 &&
    !gameHistory.find(
      (item) =>
        item.difficulty === difficulty && item.state.length === state.length
    )
  ) {
    gameHistory.push({
      state,
      difficulty,
    });
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(gameHistory));
  }
};
