import {
  Directions,
  GAME_DELTAS,
  INITIAL_DIRECTION,
  SnakeGameDirectionKeys,
} from "../types";
import { Coords } from "./gridElements/types";
export class SnakeDirection {
  initialDirection: Directions;
  direction: Directions;
  keystore: Directions[];
  lastPosition: Coords;
  position: Coords;
  renderGame: (tick?: boolean) => void;
  keyEvents: Record<SnakeGameDirectionKeys, (() => void)[]>;
  directionEvents: Record<Directions, () => void>;
  initialPositions: Coords[];

  constructor(
    initialDirection: Directions,
    position: Coords,
    renderGame: (tick?: boolean) => void
  ) {
    this.initialDirection = initialDirection;
    const initialPositions = [position, { x: position.x - 1, y: position.y }];
    this.initialPositions = initialPositions;
    this.direction = initialDirection;
    this.lastPosition = initialPositions[1];
    this.position = initialPositions[0];
    this.keystore = [];
    this.renderGame = renderGame;

    const arrowEventsTop = [this.addTopKey, this.removeTopKey];
    const arrowEventsBottom = [this.addBottomKey, this.removeBottomKey];
    const arrowEventsLeft = [this.addLeftKey, this.removeLeftKey];
    const arrowEventsRight = [this.addRightKey, this.removeRightKey];

    this.keyEvents = {
      [SnakeGameDirectionKeys.W]: arrowEventsTop,
      [SnakeGameDirectionKeys.S]: arrowEventsBottom,
      [SnakeGameDirectionKeys.A]: arrowEventsLeft,
      [SnakeGameDirectionKeys.D]: arrowEventsRight,
      [SnakeGameDirectionKeys.ArrowUp]: arrowEventsTop,
      [SnakeGameDirectionKeys.ArrowLeft]: arrowEventsLeft,
      [SnakeGameDirectionKeys.ArrowDown]: arrowEventsBottom,
      [SnakeGameDirectionKeys.ArrowRight]: arrowEventsRight,
    };
    this.directionEvents = {
      [Directions.Top]: this.toTop,
      [Directions.Left]: this.toLeft,
      [Directions.Bottom]: this.toBottom,
      [Directions.Right]: this.toRight,
    };
  }

  // direction handler
  setDirection = (direction: Directions) => {
    if (this.directionIsNotLastPosition(direction)) {
      this.direction = direction;
      this.renderGame();
    }
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

  directionIsNotLastPosition(direction: Directions) {
    const lastPosition = this.lastPosition;
    const nextPosition = {
      x: this.position.x + GAME_DELTAS[direction].x,
      y: this.position.y + GAME_DELTAS[direction].y,
    };
    return (
      lastPosition.x !== nextPosition.x || lastPosition.y !== nextPosition.y
    );
  }

  // direction triggers
  toTop = () => this.setDirection(Directions.Top);
  toLeft = () => this.setDirection(Directions.Left);
  toRight = () => this.setDirection(Directions.Right);
  toBottom = () => this.setDirection(Directions.Bottom);

  // keyboard events
  removeTopKey = () => this.removeKey(Directions.Top);
  removeLeftKey = () => this.removeKey(Directions.Left);
  removeRightKey = () => this.removeKey(Directions.Right);
  removeBottomKey = () => this.removeKey(Directions.Bottom);

  addTopKey = () => this.addKey(Directions.Top);
  addLeftKey = () => this.addKey(Directions.Left);
  addRightKey = () => this.addKey(Directions.Right);
  addBottomKey = () => this.addKey(Directions.Bottom);

  // check keys and set direction
  checkKeys = () => {
    const lastDirection = this.keystore[this.keystore.length - 1];
    if (lastDirection && this.direction !== lastDirection)
      this.directionEvents[lastDirection]();
  };

  // reset
  reset = () => {
    this.direction = INITIAL_DIRECTION;
    this.position = this.initialPositions[0];
    this.lastPosition = this.initialPositions[1];
    this.direction = this.initialDirection;
  };
}
