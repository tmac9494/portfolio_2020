import React, { TouchEvent } from "react";
import {
  GameState,
  DEFAULT_LENGTH,
  INITIAL_DIRECTION,
  Directions,
  Difficulty,
  SnakeGameDirectionKeys,
  difficulties,
  TILE_SIZE,
  SnakeGameState,
  TileStates,
} from "../types";
import { SnakeDirection } from "./SnakeDirection";
import { saveSnakeGameHistory } from "./get-game-history";
import { SnakeGameTouchHandler } from "./SnakeGameTouchHandler";
import { AppleTile, GridElement } from "./gridElements";

type InstanceConstructorParams = {
  gridWidth: number;
  renderDispatch: React.Dispatch<
    React.SetStateAction<SnakeGameState | undefined>
  >;
  debug?: boolean;
};

export class SnakeGameInstance {
  debug: boolean;
  isMobile: boolean;
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
  apple: AppleTile;
  hyperCube?: GridElement;
  dimensionator?: GridElement;
  touch: SnakeGameTouchHandler;
  lastUpdateTimestamp: number;
  tickerInterval?: NodeJS.Timeout;
  onTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: TouchEvent<HTMLDivElement>) => void;
  renderDispatch: React.Dispatch<
    React.SetStateAction<SnakeGameState | undefined>
  >;

  constructor({ gridWidth, renderDispatch, debug }: InstanceConstructorParams) {
    this.lastUpdateTimestamp = Date.now();
    this.debug = !!debug;
    const max = gridWidth * gridWidth;
    const centerPoint = Math.ceil((max - 1) / 2);
    const deltas = {
      [Directions.Right]: 1,
      [Directions.Left]: -1,
      [Directions.Top]: -gridWidth,
      [Directions.Bottom]: gridWidth,
    };
    this.isMobile = window.innerWidth <= 800;
    this.max = max;
    this.centerPoint = centerPoint;
    this.gridWidth = gridWidth;
    this.difficulty = Difficulty.Normal;
    this.gameState = GameState.Idle;
    this.length = DEFAULT_LENGTH;
    this.position = centerPoint;
    this.lastPositions = new Set([centerPoint - 1, centerPoint - 2]);
    this.deltas = deltas;
    this.apple = new AppleTile({
      gridWidth,
    });
    this.hyperCube = new GridElement({
      gridWidth,
    });
    this.dimensionator = new GridElement({
      gridWidth,
    });
    this.direction = new SnakeDirection(
      INITIAL_DIRECTION,
      deltas,
      centerPoint,
      this.renderGame
    );
    this.touch = new SnakeGameTouchHandler(this.direction);
    this.onTouchStart = (e) => {
      this.gameStateHandler();
      this.touch.onTouchStart(e);
    };
    this.onTouchMove = this.touch.onTouchMove;
    this.onTouchEnd = this.touch.onTouchEnd;
    this.renderDispatch = renderDispatch;
    this.generateApple();
  }

  // initialize
  initialize = () => {
    this.renderGame();
    this.startGameTicker();
  };

  // -------- render event
  renderGame = (shouldTick?: boolean) => {
    if (shouldTick) {
      this.gameTick();

      this.lastUpdateTimestamp = Date.now();
    }
    this.renderDispatch(this.getCurrentGameState());
  };
  getCurrentGameState = (): SnakeGameState => {
    return {
      gameState: this.gameState,
      length: this.length,
      apple: this.apple,
      position: this.position,
      size: TILE_SIZE,
      width: this.gridWidth,
      interval: difficulties[this.difficulty].interval,
      borderOutOfBounds: difficulties[this.difficulty].borderOutOfBounds,
      difficulty: this.difficulty,
    };
  };

  // ------- render ticker callback to react
  startGameTicker = () => {
    this.clearGameTicker();
    const { interval } = difficulties[this.difficulty];
    this.tickerInterval = setInterval(() => {
      if (this.gameState === GameState.Start) {
        const requiredDelta = interval + (this.isMobile ? 50 : 0);
        if (
          Date.now() - this.lastUpdateTimestamp >=
          (this?.hyperCube?.effectIsActive
            ? requiredDelta * 0.8
            : requiredDelta)
        ) {
          this.renderGame(true);
        }
      }
    }, 17);
  };

  clearGameTicker = () => clearInterval(this.tickerInterval);

  gameTick = () => {
    let newPosition = this.position + this.deltas[this.direction.direction];
    const borderOutOfBounds = difficulties[this.difficulty].borderOutOfBounds;
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
        !this.dimensionator?.effectIsActive &&
        borderOutOfBounds &&
        (isPassedRight || isPassedBottom || isPassedLeft || isPassedTop);

      const playerHitObstacle = this.apple?.boundaries.has(newPosition);

      // end game if player died
      if (playerAteBody || playerOutOfBounds || playerHitObstacle) {
        this.endGame();
      } else {
        // border out of bounds is false pathfinder
        if (this.dimensionator?.effectIsActive || !borderOutOfBounds) {
          if (isPassedRight) newPosition = this.position - this.gridWidth + 1;
          else if (isPassedLeft)
            newPosition = this.position + this.gridWidth - 1;
          else if (isPassedTop)
            newPosition = this.position + this.max - this.gridWidth;
          else if (isPassedBottom)
            newPosition = this.position - this.max + this.gridWidth;
        }
        this.position = newPosition;
        this.direction.position = newPosition;
        if (newPosition === this.apple?.location) this.eatApple();
        if (newPosition === this.hyperCube?.location) this.hyperCube?.eat();
        if (newPosition === this.dimensionator?.location)
          this.dimensionator?.eat();
      }
      this.renderGame();
    }
    // check keys after tick for responsive controls
    this.direction.checkKeys();
  };

  // -------- core game state events
  setNewGameState = () => {
    this.gameState = GameState.Idle;
    this.length = DEFAULT_LENGTH;
    this.position = this.centerPoint;
    this.direction.reset(this.centerPoint, this.centerPoint - 1);
    this.apple.clear();
    this.cleanUpGridElements();
    this.lastPositions.clear();
    this.lastPositions.add(this.centerPoint - 1);
    this.lastPositions.add(this.centerPoint - 2);
    this.generateApple();
    this.renderGame();
  };

  restartGame = () => {
    this.setNewGameState();
    this.startGame();
  };
  startGame = () => {
    this.gameState = GameState.Start;
    this.renderGame();
  };
  pauseGame = () => {
    this.gameState = GameState.Pause;
    this.renderGame();
  };
  endGame = () => {
    saveSnakeGameHistory({
      state: this.getCurrentGameState(),
      difficulty: this.difficulty,
    });
    this.gameState = GameState.Dead;
    this.renderGame();
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

  // --------- Snake buffer for item spacing
  getSnakeBuffer = () => {
    const position = this.position;
    return [
      // create larger buffer around snake's head
      position,
      position + 1,
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
    }, []);
  };

  // -------- apple stuff
  eatApple = () => {
    this.length++;
    this.apple?.clear();
    this.generateApple();
    const value = this.length - DEFAULT_LENGTH;
    if (value === 2 || value % 10 === 0)
      this.hyperCube?.setOnGrid({
        position: this.position,
        max: this.max,
        buffer: [
          ...this.getSnakeBuffer(),
          this?.apple?.location || 0,
          this.dimensionator?.location || 0,
        ],
      });
    if (this.difficulty !== Difficulty.Easy && (value === 1 || value % 8 === 0))
      this.dimensionator?.setOnGrid({
        position: this.position,
        max: this.max,
        buffer: [
          ...this.getSnakeBuffer(),
          this.apple?.location || 0,
          this.hyperCube?.location || 0,
        ],
      });
  };
  generateApple = () =>
    this.apple?.setAppleOnGrid({
      position: this.position,
      max: this.max,
      buffer: [...this.getSnakeBuffer(), this?.hyperCube?.location || 0],
    });

  // -------- difficulty event
  changeDifficulty = (difficulty: Difficulty) => {
    this.difficulty = difficulty;
    this.apple.hasBoundaries = difficulty === Difficulty.Hard;
    this.startGameTicker();
    this.setNewGameState();
  };

  // -------- User Interaction events
  getDirectionKeyMethods = (key: string) =>
    this.direction.keyEvents[key.toLowerCase() as SnakeGameDirectionKeys];
  onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key.toLowerCase() === " ") {
      e.preventDefault();
      if (this.gameState === GameState.Start) {
        this.pauseGame();
      } else {
        this.gameStateHandler();
      }
    } else {
      const methods = this.getDirectionKeyMethods(e.key);
      methods && methods[0]();
    }
  };
  onKeyUp = (e: React.KeyboardEvent) => {
    const methods = this.getDirectionKeyMethods(e.key);
    methods && methods[1]();
  };

  // -------- get tile type by index
  getTileTypeByIndex = (index: number) => {
    let tileType: TileStates = TileStates.Inactive;

    if (this.debug && this.getSnakeBuffer().includes(index)) {
      tileType = TileStates.Buffer;
    }

    if (this.apple?.boundaries.has(index)) {
      tileType = TileStates.Obstacle;
    } else if (
      this.lastPositions.has(index) &&
      Array.from(this.lastPositions).indexOf(index) < this.length
    ) {
      tileType = TileStates.Body;
    } else {
      switch (index) {
        case this.position:
          tileType = TileStates.Head;
          break;
        case this.apple.location:
          tileType = TileStates.Apple;
          break;
        case this.hyperCube?.location:
          tileType = TileStates.Hypercube;
          break;
        case this.dimensionator?.location:
          tileType = TileStates.Dimensionator;
          break;
      }
    }
    return tileType;
  };

  // -------- cleanup
  cleanUpGridElements = () => {
    this.hyperCube?.cleanUp();
    this.dimensionator?.cleanUp();
  };
  cleanUp = () => {
    this.clearGameTicker();
    this.cleanUpGridElements();
  };
}
