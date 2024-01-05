import { Coords } from "./gridElements/types";

export const getSnakeHeadBuffer = (position: Coords): Coords[] => [
  position,
  {
    x: position.x + 1,
    y: position.y,
  },
  {
    x: position.x - 1,
    y: position.y,
  },
  {
    x: position.x,
    y: position.y + 1,
  },
  {
    x: position.x,
    y: position.y - 1,
  },
  {
    x: position.x - 1,
    y: position.y + 1,
  },
  {
    x: position.x + 1,
    y: position.y + 1,
  },
  {
    x: position.x - 1,
    y: position.y - 1,
  },
  {
    x: position.x + 1,
    y: position.y - 1,
  },
];

export const coordToBuffer = (position: Coords) => [
  position,
  { x: position.x, y: position.y + 1 },
  { x: position.x, y: position.y - 1 },
  { x: position.x + 1, y: position.y },
  { x: position.x - 1, y: position.y },
];
