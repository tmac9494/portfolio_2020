import { Directions, GameDeltas } from "../types";
export class SnakeDirection {
  initialDirection: Directions;
  direction: Directions;
  keystore: Directions[];
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
    this.keystore = [];
  }

  // add/remove keyboard direction events
  addKey = (key: Directions) => {
    if (this.keystore.includes(key)) this.removeKey(key);
    this.keystore.push(key);
  };
  removeKey = (key: Directions) => {
    this.keystore = this.keystore.filter((value) => value !== key);
    if (this.keystore.length) {
      const lastDirection = this.keystore[this.keystore.length - 1];
      switch (lastDirection) {
        case Directions.Top:
          this.toTop();
          break;
        case Directions.Left:
          this.toLeft();
          break;
        case Directions.Right:
          this.toRight();
          break;
        case Directions.Bottom:
          this.toBottom();
          break;
      }
    }
  };

  // direction triggers
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

  // keyboard events
  removeTopKey = () => this.removeKey(Directions.Top);
  removeLeftKey = () => this.removeKey(Directions.Left);
  removeRightKey = () => this.removeKey(Directions.Right);
  removeBottomKey = () => this.removeKey(Directions.Bottom);
  addTopKey = () => {
    this.addKey(Directions.Top);
    this.toTop();
  };
  addLeftKey = () => {
    this.addKey(Directions.Left);
    this.toLeft();
  };
  addRightKey = () => {
    this.addKey(Directions.Right);
    this.toRight();
  };
  addBottomKey = () => {
    this.addKey(Directions.Bottom);
    this.toBottom();
  };

  // reset
  reset = (position: number, lastPosition: number) => {
    this.position = position;
    this.lastPosition = lastPosition;
    this.direction = this.initialDirection;
  };
}
