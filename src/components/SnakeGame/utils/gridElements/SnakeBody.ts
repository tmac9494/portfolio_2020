import {
  Directions,
  GAME_DELTAS,
  getCoordsAsString,
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
  position: string;
  max: number;
  isNew: boolean;
  constructor({
    x,
    y,
    direction,
    index,
    gridWidth,
    lastPosition,
    from,
  }: SnakeBodyParams) {
    this.isNew = true;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.index = index || 0;
    this.from =
      from ||
      this.getFromDirectionX(x, x + 1) ||
      this.getFromDirectionY(y, y + 1);
    this.to = direction;
    this.lastPosition = lastPosition || { x: x - 1, y };
    this.max = gridWidth - 1;
    this.position = getCoordsAsString(this.getCoords());
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
  setPosition = () => {
    this.position = getCoordsAsString(this.getCoords());
  };

  public follow(nextPosition: Coords, leadingPosition?: Coords): Coords {
    this.isNew = false;
    const currentPosition = { x: this.x, y: this.y };
    this.lastPosition = currentPosition;
    const { x, y } = nextPosition;
    const xDiff = x - currentPosition.x;
    const yDiff = y - currentPosition.y;
    const jumpingX = xDiff > 1 || xDiff < -1;
    const jumpingY = yDiff > 1 || yDiff < -1;
    const isJumpingAcrossBorder = jumpingX || jumpingY;

    let isAboutToJumpAcrossBorder = false;
    const direction = this.getDirection(currentPosition, nextPosition);
    const from = OPPOSITE_DIRECTION[direction];
    this.from = from;
    this.direction = direction;
    this.to = direction;
    if (leadingPosition) {
      this.to = this.getDirection(nextPosition, leadingPosition);
      const xDiffLeading = leadingPosition.x - x;
      const yDiffLeading = leadingPosition.y - y;
      const preparingJumpingX = xDiffLeading > 1 || xDiffLeading < -1;
      const preparingJumpingY = yDiffLeading > 1 || yDiffLeading < -1;
      isAboutToJumpAcrossBorder = preparingJumpingX || preparingJumpingY;
      if (isAboutToJumpAcrossBorder) {
        this.to =
          xDiffLeading !== 0
            ? xDiffLeading < 0
              ? Directions.Right
              : Directions.Left
            : yDiffLeading < 0
            ? Directions.Bottom
            : Directions.Top;
      }
    }

    if (isJumpingAcrossBorder) {
      this.from =
        xDiff !== 0
          ? xDiff < 0
            ? Directions.Left
            : Directions.Right
          : yDiff < 0
          ? Directions.Top
          : Directions.Bottom;
    }
    this.x = x;
    this.y = y;
    this.setPosition();
    return { x, y };
  }

  // styles
  getGridXPosition = () => this.x * TILE_SIZE;
  getGridYPosition = () => this.y * TILE_SIZE;
  getCoordsInPixels = () => ({
    x: this.getGridXPosition(),
    y: this.getGridYPosition(),
  });

  getCoords = () => ({ x: this.x, y: this.y });
}
