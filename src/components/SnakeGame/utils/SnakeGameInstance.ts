import { TouchEvent } from "react";
import {
  GameState,
  AppleTile,
  DEFAULT_LENGTH,
  INITIAL_DIRECTION,
  Directions,
  Difficulty,
  SnakeGameDirectionKeys,
  MINIMUM_SWIPE_DISTANCE,
  difficulties,
  HISTORY_STORAGE_KEY,
  TILE_SIZE,
} from "../types";
import { SnakeDirection } from "./SnakeDirection";
import { getSnakeGameHistory } from "./get-game-history";

export class SnakeGameInstance {
  centerPoint: number;
  gameState: GameState;
  length: number;
  position: number;
  max: number;
  gridWidth: number;
  lastPositions: Set<number>;
  direction: SnakeDirection;
  deltas: Record<Directions, number>;
  difficulty: Difficulty;
  apple?: AppleTile;
  touch: SnakeGameTouchEvents;
  onTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: TouchEvent<HTMLDivElement>) => void;

  constructor({ gridWidth }: { gridWidth: number }) {
    const max = gridWidth * gridWidth;
    const centerPoint = Math.ceil((max - 1) / 2);
    const deltas = {
      [Directions.Right]: 1,
      [Directions.Left]: -1,
      [Directions.Top]: -gridWidth,
      [Directions.Bottom]: gridWidth,
    };
    this.max = max;
    this.centerPoint = centerPoint;
    this.gridWidth = gridWidth;
    this.gameState = GameState.Idle;
    this.length = DEFAULT_LENGTH;
    this.position = centerPoint;
    this.deltas = deltas;
    this.direction = new SnakeDirection(INITIAL_DIRECTION, deltas, centerPoint);
    this.lastPositions = new Set([centerPoint - 1, centerPoint - 2]);
    this.difficulty = Difficulty.Normal;
    this.touch = new SnakeGameTouchEvents(this.direction);
    this.onTouchStart = this.touch.onTouchStart;
    this.onTouchMove = this.touch.onTouchMove;
    this.onTouchEnd = this.touch.onTouchEnd;
    this.generateApple();
  }

  // -------- render event
  getCurrentGameState = () => {
    return {
      gameState: this.gameState,
      length: this.length,
      apple: this.apple,
      position: this.position,
      size: TILE_SIZE,
      width: this.gridWidth,
      interval: difficulties[this.difficulty].interval,
      borderOutOfBounds: difficulties[this.difficulty].borderOutOfBounds,
    };
  };

  // -------- core game state events
  setNewGameState = () => {
    this.gameState = GameState.Idle;
    this.length = DEFAULT_LENGTH;
    this.position = this.centerPoint;
    this.direction = new SnakeDirection(
      INITIAL_DIRECTION,
      this.deltas,
      this.centerPoint
    );
    this.lastPositions = new Set([this.centerPoint - 1, this.centerPoint - 2]);
  };

  restartGame = () => {
    this.lastPositions.clear();
    this.lastPositions.add(this.centerPoint - 1);
    this.lastPositions.add(this.centerPoint - 2);
    this.direction.reset(this.centerPoint, this.centerPoint - 1);
    this.setNewGameState();
    this.startGame();
  };

  startGame = () => {
    this.gameState = GameState.Start;
  };
  pauseGame = () => {
    this.gameState = GameState.Pause;
  };
  endGame = () => {
    let gameHistory = getSnakeGameHistory();
    if (
      this.length - DEFAULT_LENGTH !== 0 &&
      !gameHistory.find(
        (item) =>
          item.difficulty === this.difficulty &&
          item.state.length === this.length
      )
    ) {
      gameHistory.push({
        state: this.getCurrentGameState(),
        difficulty: this.difficulty,
      });
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(gameHistory));
    }
    this.gameState = GameState.Dead;
  };

  gameStateHandler = () => {
    if (this.gameState === GameState.Dead) {
      this.restartGame();
    } else if (
      this.gameState === GameState.Pause ||
      this.gameState === GameState.Idle
    ) {
      this.startGame();
    }
  };

  // -------- Tick/Move event
  gameTick = () => {
    let newPosition = this.position + this.deltas[this.direction.direction];
    const { borderOutOfBounds } = difficulties[this.difficulty];
    if (this.gameState === GameState.Start) {
      const positionsAsArray = Array.from(this.lastPositions);
      positionsAsArray.unshift(this.position);
      if (this.lastPositions.size > this.max - 2) {
        positionsAsArray.pop();
      }
      this.lastPositions = new Set(positionsAsArray);
      this.direction.lastPosition = positionsAsArray[0];

      // out of bounds positions
      const isPassedRight =
        (this.position + 1) % this.gridWidth === 0 &&
        this.direction.direction === Directions.Right;
      const isPassedLeft =
        this.position % this.gridWidth === 0 &&
        this.direction.direction === Directions.Left;
      const isPassedTop = newPosition < 0;
      const isPassedBottom = newPosition > this.max - 1;

      // player died
      const playerAteBody =
        this.lastPositions.has(newPosition) &&
        positionsAsArray.indexOf(newPosition) < this.length;

      const playerOutOfBounds =
        borderOutOfBounds &&
        (isPassedRight || isPassedBottom || isPassedLeft || isPassedTop);

      const playerHitObstacle = this.apple?.boundaries.has(newPosition);

      // end game if player died
      if (playerAteBody || playerOutOfBounds || playerHitObstacle) {
        this.endGame();
      } else {
        // border out of bounds is false pathfinder
        if (!borderOutOfBounds) {
          if (isPassedRight) newPosition = this.position - this.gridWidth + 1;
          else if (isPassedLeft)
            newPosition = this.position + this.gridWidth - 1;
          else if (isPassedTop)
            newPosition = this.position + this.max - this.gridWidth;
          else if (isPassedBottom)
            newPosition = this.position - this.max + this.gridWidth;
        }
        this.position = newPosition;
      }
    }
  };

  // -------- apple stuff
  generateApple = () => {
    this.apple = new AppleTile({
      location: this.generateAppleLocation(),
      hasBoundaries: this.difficulty === Difficulty.Hard,
      gridWidth: this.gridWidth,
    });
  };

  generateAppleLocation = () => {
    const position = this.position;
    const generatePosition = () => Math.floor(Math.random() * this.max);
    const snakeBuffer = new Set(
      [
        // create larger buffer around snake's head
        position,
        position + 1,
        position + 2,
        position - 1,
        position - 1,
        position + this.gridWidth,
        position - this.gridWidth,
        position + this.gridWidth + 1,
        position - this.gridWidth + 1,
        position + this.gridWidth - 1,
        position - this.gridWidth - 1,
        // snake body
        ...Array.from(this.lastPositions).slice(0, this.length + 1),
      ].reduce((prev: number[], current) => {
        return [
          ...prev,
          current,
          current - this.gridWidth,
          current + this.gridWidth,
          current - 1,
          current + 1,
        ];
      }, [])
    );
    let newPosition = position;
    do {
      newPosition = generatePosition();
    } while (snakeBuffer.has(newPosition));
    return newPosition;
  };

  // -------- User Interaction events
  onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key.toLowerCase()) {
      case " ":
        if (this.gameState === GameState.Start) {
          this.pauseGame();
        } else {
          this.gameStateHandler();
        }
        break;
      case SnakeGameDirectionKeys.W:
        this.direction.addTopKey();
        break;
      case SnakeGameDirectionKeys.S:
        this.direction.addBottomKey();
        break;
      case SnakeGameDirectionKeys.A:
        this.direction.addLeftKey();
        break;
      case SnakeGameDirectionKeys.D:
        this.direction.addRightKey();
        break;
    }
  };
  onKeyUp = (e: React.KeyboardEvent) => {
    switch (e.key.toLowerCase()) {
      case SnakeGameDirectionKeys.W:
        this.direction.removeTopKey();
        break;
      case SnakeGameDirectionKeys.S:
        this.direction.removeBottomKey();
        break;
      case SnakeGameDirectionKeys.A:
        this.direction.removeLeftKey();
        break;
      case SnakeGameDirectionKeys.D:
        this.direction.removeRightKey();
        break;
    }
  };
}

class SnakeGameTouchEvents {
  touchStart: [number, number] | null;
  touchEnd: [number, number] | null;
  direction: SnakeDirection;
  constructor(direction: SnakeDirection) {
    this.touchStart = null;
    this.touchEnd = null;
    this.direction = direction;
  }

  onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    this.touchEnd = null;
    this.touchStart = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  };

  onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    this.touchEnd = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  };

  onTouchEnd = () => {
    if (!this.touchStart || !this.touchEnd) return;
    const xDistance = this.touchStart[0] - this.touchEnd[0];
    const yDistance = this.touchStart[1] - this.touchEnd[1];
    const xIsGreeater =
      (xDistance < 0 ? xDistance * -1 : xDistance) >
      (yDistance < 0 ? yDistance * -1 : yDistance);
    const isLeftSwipe = xDistance > MINIMUM_SWIPE_DISTANCE;
    const isRightSwipe = xDistance < -MINIMUM_SWIPE_DISTANCE;
    const isUpSwipe = yDistance > MINIMUM_SWIPE_DISTANCE;
    const isDownSwipe = yDistance < -MINIMUM_SWIPE_DISTANCE;
    if (xIsGreeater) {
      if (isLeftSwipe) {
        this.direction.toLeft();
      } else if (isRightSwipe) {
        this.direction.toRight();
      }
    } else {
      if (isUpSwipe) {
        this.direction.toTop();
      } else if (isDownSwipe) {
        this.direction.toBottom();
      }
    }
  };
}
