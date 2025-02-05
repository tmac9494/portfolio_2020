import { Directions } from "../../types";
import { SnakeBody } from "./SnakeBody";
import { Coords } from "./types";

export class SnakeHead extends SnakeBody {
  look = (direction: Directions) => {
    this.direction = direction;
  };

  move = (direction: Directions, outOfBoundsAllowed: boolean): Coords => {
    this.look(direction);
    this.follow(this.getNextPosition(outOfBoundsAllowed));
    return this.lastPosition;
  };

  isHeadOutOfBounds = () => {
    const outOfBoundValues = new Set([this.max + 1, -1]);
    return outOfBoundValues.has(this.x) || outOfBoundValues.has(this.y);
  };
}
