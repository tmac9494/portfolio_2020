import { Difficulty } from "../../types";

export const shouldShowDimensionator = (
  value: number,
  difficulty: Difficulty
): boolean => {
  return difficulty !== Difficulty.Easy && (value === 1 || value % 8 === 0);
};

export const shouldShowHypercube = (value: number): boolean => {
  return value === 2 || value % 10 === 0;
};
