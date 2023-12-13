import {
  Directions,
  GameDeltas,
  INITIAL_DIRECTION,
  SnakeGameDirectionKeys,
} from "../types";
export class SnakeDirection {
  initialDirection: Directions;
  direction: Directions;
  keystore: Directions[];
  lastPosition: number;
  position: number;
  deltas: GameDeltas;
  renderGame: (tick?: boolean) => void;
  keyEvents: Record<SnakeGameDirectionKeys, [() => void, () => void]>;
  constructor(
    initialDirection: Directions,
    deltas: GameDeltas,
    position: number,
    renderGame: (tick?: boolean) => void
  ) {
    this.initialDirection = initialDirection;
    this.deltas = deltas;
    this.direction = initialDirection;
    this.lastPosition = 0;
    this.position = position;
    this.keystore = [];
    this.renderGame = renderGame;
    this.keyEvents = {
      [SnakeGameDirectionKeys.W]: [this.addTopKey, this.removeTopKey],
      [SnakeGameDirectionKeys.S]: [this.addBottomKey, this.removeBottomKey],
      [SnakeGameDirectionKeys.A]: [this.addLeftKey, this.removeLeftKey],
      [SnakeGameDirectionKeys.D]: [this.addRightKey, this.removeRightKey],
    };
  }

  // direction handler
  setDirection = (direction: Directions) => {
    this.direction = direction;
    this.renderGame();
  };

  // add/remove keyboard direction events
  addKey = (key: Directions) => {
    if (this.keystore.includes(key)) this.removeKey(key);
    this.keystore.push(key);
    this.checkKeys();
  };
  removeKey = (key: Directions) => {
    this.keystore = this.keystore.filter((value) => value !== key);
    if (this.keystore.length) {
      this.checkKeys();
    }
  };

  // direction triggers
  toTop = () => {
    if (this.lastPosition !== this.position + this.deltas[Directions.Top])
      this.setDirection(Directions.Top);
  };
  toLeft = () => {
    if (this.lastPosition !== this.position + this.deltas[Directions.Left])
      this.setDirection(Directions.Left);
  };
  toRight = () => {
    if (this.lastPosition !== this.position + this.deltas[Directions.Right])
      this.setDirection(Directions.Right);
  };
  toBottom = () => {
    if (this.lastPosition !== this.position + this.deltas[Directions.Bottom])
      this.setDirection(Directions.Bottom);
  };

  // keyboard events
  removeTopKey = () => this.removeKey(Directions.Top);
  removeLeftKey = () => this.removeKey(Directions.Left);
  removeRightKey = () => this.removeKey(Directions.Right);
  removeBottomKey = () => this.removeKey(Directions.Bottom);
  addTopKey = () => {
    this.addKey(Directions.Top);
  };
  addLeftKey = () => {
    this.addKey(Directions.Left);
  };
  addRightKey = () => {
    this.addKey(Directions.Right);
  };
  addBottomKey = () => {
    this.addKey(Directions.Bottom);
  };

  // check keys and set direction
  checkKeys = () => {
    const lastDirection = this.keystore[this.keystore.length - 1];
    if (this.direction !== lastDirection) {
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

  // reset
  reset = (position: number, lastPosition: number) => {
    this.direction = INITIAL_DIRECTION;
    this.position = position;
    this.lastPosition = lastPosition;
    this.direction = this.initialDirection;
  };
}
