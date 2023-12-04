import { HighScoreSchema } from "..";
import { HISTORY_STORAGE_KEY } from "../types";

// history storage
export const getSnakeGameHistory = (): HighScoreSchema[] =>
  JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || "[]");
