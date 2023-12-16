import {
  Directions,
  GAME_DELTAS,
  OPPOSITE_DIRECTION,
  TILE_SIZE,
} from "../../types";
import { Coords, SnakeBodyParams } from "./types";

export class SnakeBody {
  x: number;
  y: number;
  direction: Directions;
  index: number;
  from: Directions | null;
  to: Directions;
  lastPosition: Coords;
  max: number;
  constructor({
    x,
    y,
    direction,
    index,
    gridWidth,
    lastPosition,
  }: SnakeBodyParams) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.index = index || 0;
    this.from =
      this.getFromDirectionX(x, x + 1) || this.getFromDirectionY(y, y + 1);
    this.to = direction;
    this.lastPosition = lastPosition || { x: x - 1, y };
    this.max = gridWidth - 1;
  }
  getDirection = (coordsA: Coords, coordsB: Coords): Directions => {
    if (coordsA.x === coordsB.x && coordsB.y === coordsA.y) {
      throw new Error(
        `Coordinates match [${coordsA.x},${coordsA.y}] [${coordsB.x},${coordsB.y}]`
      );
    }
    return (
      this.getToDirectionX(coordsA.x, coordsB.x) ||
      (this.getToDirectionY(coordsA.y, coordsB.y) as Directions)
    );
  };
  getFromDirectionX = (lastX: number, newX: number) => {
    return newX < lastX
      ? Directions.Right
      : newX > lastX
      ? Directions.Left
      : null;
  };
  getFromDirectionY = (lastY: number, newY: number) => {
    return newY < lastY
      ? Directions.Bottom
      : newY > lastY
      ? Directions.Top
      : null;
  };
  getToDirectionX = (lastX: number, newX: number) => {
    return newX < lastX
      ? Directions.Left
      : newX > lastX
      ? Directions.Right
      : null;
  };
  getToDirectionY = (lastY: number, newY: number) => {
    return newY < lastY
      ? Directions.Top
      : newY > lastY
      ? Directions.Bottom
      : null;
  };
  getNextPosition = (outOfBoundsAllowed?: boolean): Coords => {
    let next = {
      x: this.x + GAME_DELTAS[this.direction].x,
      y: this.y + GAME_DELTAS[this.direction].y,
    };

    // out of bounds pathfinder
    if (outOfBoundsAllowed) {
      if (next.x < 0) next.x = this.max;
      else if (next.y < 0) next.y = this.max;
      else if (next.y > this.max) next.y = 0;
      else if (next.x > this.max) next.x = 0;
    }

    return next;
  };

  public follow(nextPosition: Coords, leadingPosition?: Coords): Coords {
    this.lastPosition = { x: this.x, y: this.y };
    const x = nextPosition.x;
    const y = nextPosition.y;
    const direction = this.getDirection({ x: this.x, y: this.y }, nextPosition);
    const from = OPPOSITE_DIRECTION[direction];
    this.from = from;
    this.direction = direction;
    this.to = leadingPosition
      ? this.getDirection(nextPosition, leadingPosition)
      : direction;
    this.x = x;
    this.y = y;
    return { x, y };
  }

  // coord translation
  getCoordsAsArray = (): [number, number] => [this.x, this.y];
  getCoordsAsString = () => `${this.x}__${this.y}`;
  getCoordsFromArray = (
    arrayOfCoords: [number, number] | number[]
  ): Coords => ({
    x: arrayOfCoords[0],
    y: arrayOfCoords[1],
  });
  getCoordsFromString = (stringOfCoords: string): Coords => {
    return this.getCoordsFromArray(
      stringOfCoords.split("__").map((number) => parseInt(number))
    );
  };

  // styles
  getGridXPosition = () => this.x * TILE_SIZE;
  getGridYPosition = () => this.y * TILE_SIZE;
  getCoordsInPixels = () => ({
    x: this.getGridXPosition(),
    y: this.getGridYPosition(),
  });

  getCoords = () => ({ x: this.x, y: this.y });
}
