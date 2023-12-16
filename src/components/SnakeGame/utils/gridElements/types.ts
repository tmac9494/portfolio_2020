import { Difficulty, Directions } from "../../types";

export type SnakeBodyParams = {
  x: number;
  y: number;
  direction: Directions;
  index?: number;
  gridWidth: number;
  lastPosition?: Coords;
};

export type Coords = {
  x: number;
  y: number;
};

export interface SnakeBodyState extends Coords {
  x: number;
  y: number;
  from: Directions | null;
  direction: Directions;
}
export type SnakeParams = {
  body: Coords[];
  head: Coords;
  difficulty: Difficulty;
  gridWidth: number;
};
