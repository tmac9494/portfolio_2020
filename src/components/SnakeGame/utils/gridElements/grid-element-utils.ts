import { Difficulty, Directions } from "../../types";
import { SnakeBody } from "./SnakeBody";
import { SnakeHead } from "./SnakeHead";
import { Coords } from "./types";

export const shouldShowDimensionator = (
  value: number,
  difficulty: Difficulty
): boolean => {
  return difficulty !== Difficulty.Easy && (value === 1 || value % 8 === 0);
};

export const shouldShowHypercube = (value: number): boolean => {
  return value === 2 || value % 10 === 0;
};

export const mapNewBodyElements = (body: Coords[], gridWidth: number) =>
  body.map(
    (position, index) =>
      new SnakeBody({
        ...position,
        direction: Directions.Right,
        gridWidth: gridWidth,
        index,
      })
  );

export const mapSnakeHead = (coords: Coords, gridWidth: number) =>
  new SnakeHead({
    ...coords,
    direction: Directions.Right,
    gridWidth: gridWidth,
  });
