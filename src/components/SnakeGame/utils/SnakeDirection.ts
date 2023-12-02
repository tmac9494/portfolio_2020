import { Directions, GameDeltas } from "../types";

export class SnakeDirection {
  initialDirection: Directions;
  direction: Directions;
  lastPosition: number;
  position: number;
  deltas: GameDeltas;
  constructor(
    initialDirection: Directions,
    deltas: GameDeltas,
    position: number
  ) {
    this.initialDirection = initialDirection;
    this.deltas = deltas;
    this.direction = initialDirection;
    this.lastPosition = 0;
    this.position = position;
  }

  // direction events
  toTop = () => {
    if (this.lastPosition !== this.position + this.deltas[Directions.Top])
      this.direction = Directions.Top;
  };
  toLeft = () => {
    if (this.lastPosition !== this.position + this.deltas[Directions.Left])
      this.direction = Directions.Left;
  };
  toRight = () => {
    if (this.lastPosition !== this.position + this.deltas[Directions.Right])
      this.direction = Directions.Right;
  };
  toBottom = () => {
    if (this.lastPosition !== this.position + this.deltas[Directions.Bottom])
      this.direction = Directions.Bottom;
  };

  // reset
  reset = (position: number, lastPosition: number) => {
    this.position = position;
    this.lastPosition = lastPosition;
    this.direction = this.initialDirection;
  };
}
