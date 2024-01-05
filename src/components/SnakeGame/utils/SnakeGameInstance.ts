import React, { TouchEvent } from "react";
import {
  InstanceConstructorParams,
  SnakeGameSetup,
  GameState,
  DEFAULT_LENGTH,
  INITIAL_DIRECTION,
  Difficulty,
  SnakeGameDirectionKeys,
  difficulties,
  TILE_SIZE,
  SnakeGameState,
  SNAKE_GAME_ID,
  getCoordsFromString,
} from "../types";
import {
  SnakeDirection,
  saveSnakeGameHistory,
  SnakeGameTouchHandler,
  getSnakeGameHistory,
} from "./";
import { GridElementEffects } from "./gridElements";
import { Coords } from "./gridElements/types";
import {
  shouldShowDimensionator,
  shouldShowHypercube,
} from "./gridElements/grid-element-utils";
import { coordToBuffer, getSnakeHeadBuffer } from "./buffer-utils";

export class SnakeGameInstance extends SnakeGameSetup {
  direction: SnakeDirection;
  touch: SnakeGameTouchHandler;
  onTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: TouchEvent<HTMLDivElement>) => void;

  constructor({ gridWidth, renderDispatch, debug }: InstanceConstructorParams) {
    super({ gridWidth, renderDispatch });
    this.direction = new SnakeDirection(
      INITIAL_DIRECTION,
      { x: this.centerPoint, y: this.centerPoint },
      this.renderGame
    );
    this.touch = new SnakeGameTouchHandler(this.direction);
    this.onTouchStart = this.touch.onTouchStart;
    this.onTouchMove = this.touch.onTouchMove;
    this.onTouchEnd = this.touch.onTouchEnd;
  }

  // initialize
  initialize = () => {
    this.generateApple();
    this.renderGame();
    this.startGameTicker();
  };
  focus = () => {
    if (!this.focused) {
      const element = document.getElementById(SNAKE_GAME_ID);
      if (element) {
        this.focused = true;
        element.focus();
      }
    }
  };

  // -------- render event
  renderGame = () => {
    this.renderDispatch(this.getCurrentGameState());
  };
  getCurrentGameState = (): SnakeGameState => {
    return {
      gameState: this.gameState,
      length: this.length,
      apple: this.apple,
      size: TILE_SIZE,
      width: this.gridWidth,
      interval: difficulties[this.difficulty].interval,
      borderOutOfBounds: difficulties[this.difficulty].borderOutOfBounds,
      difficulty: this.difficulty,
      effects: {
        [GridElementEffects.Hypercube]: this.hyperCube?.duration || 0,
        [GridElementEffects.Dimensionator]: this.dimensionator?.duration || 0,
      },
      snake: this.snake,
    };
  };

  // ------- render ticker callback to react
  startGameTicker = () => {
    requestAnimationFrame(this.tickerInterval);
  };

  tickerInterval = (time: number) => {
    !this.focused && this.focus();
    const renderDelta = time - this.lastUpdateTimestamp;
    const tickDelta = time - this.time;
    this.time = time;
    const { interval } = difficulties[this.difficulty];
    // render logic at 30fps & game state start
    if (renderDelta >= 33 && this.gameState === GameState.Start) {
      this.hyperCube?.tick(tickDelta);
      this.dimensionator?.tick(tickDelta);
      const requiredDelta = interval + (this.isMobile ? 50 : 0);
      const isPassedDelta =
        renderDelta >=
        (this?.hyperCube?.effectIsActive ? requiredDelta * 0.8 : requiredDelta);
      if (isPassedDelta) {
        this.gameTick();
        this.lastUpdateTimestamp = time;
      }
      this.renderGame();
    }
    this.animationFrame = requestAnimationFrame(this.tickerInterval);
  };

  gameTick = () => {
    if (this.gameState === GameState.Start) {
      this.snake.move({
        direction: this.direction.direction,
        dimensionator: this.dimensionator,
        hyperCube: this.hyperCube,
        apple: this.apple,
        eatApple: this.eatApple,
        endGame: this.endGame,
      });
      this.direction.lastPosition = this.direction.position;
      this.direction.position = this.snake.head.getCoords();

      this.renderGame();
    }
    // check keys after tick for responsive controls
    this.direction.checkKeys();
  };

  // -------- core game state events
  setNewGameState = () => {
    this.gameState = GameState.Idle;
    this.length = DEFAULT_LENGTH;
    this.snake.head.x = this.centerPoint;
    this.snake.head.y = this.centerPoint;
    this.direction.reset();
    this.snake.reset();
    this.apple.clear();
    this.cleanUpGridElements();
    this.generateApple();
    this.renderGame();
  };

  restartGame = () => {
    this.setNewGameState();
    this.startGame();
  };
  startGame = () => {
    this.gameState = GameState.Start;
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

  // -------- snake elements buffer
  getSnakeBufferCoords = (): Coords[] => {
    return [
      // create larger buffer around snake's head
      ...getSnakeHeadBuffer(this.snake.head.getCoords()),
      // snake body
      ...Array.from(
        this.snake.body.map((element) => ({ x: element.x, y: element.y }))
      ),
    ].reduce((prev: Coords[], current: Coords): Coords[] => {
      return [...prev, ...coordToBuffer(current)];
    }, []);
  };

  // -------- apple stuff
  eatApple = () => {
    this.length++;
    this.generateApple();
    this.setPowerUps();
  };
  generateApple = () =>
    this.apple?.setAppleOnGrid({
      bufferCoords: [
        ...this.getSnakeBufferCoords(),
        this.hyperCube?.coords || this.snake.head.getCoords(),
        this.dimensionator?.coords || this.snake.head.getCoords(),
      ],
      coords: this.snake.head.getCoords(),
    });

  // -------- grid elements
  setPowerUps = () => {
    const value = this.length - DEFAULT_LENGTH;
    const showHyperCube = shouldShowHypercube(value);
    const showDimensionator = shouldShowDimensionator(value, this.difficulty);
    if (showHyperCube || showDimensionator) {
      const obstacleBuffer = Array.from(this.apple.boundaries).map((boundary) =>
        getCoordsFromString(boundary)
      );
      const snakeHeadCoords = this.snake.head.getCoords();
      const gridParams = {
        max: this.max,
        bufferCoords: [
          this.apple.coords as Coords,
          ...obstacleBuffer,
          ...this.getSnakeBufferCoords(),
          this.hyperCube?.coords || snakeHeadCoords,
          this.dimensionator?.coords || snakeHeadCoords,
        ],
        coords: snakeHeadCoords,
      };
      if (showHyperCube) this.hyperCube?.setOnGrid(gridParams);
      if (showDimensionator) this.dimensionator?.setOnGrid(gridParams);
    }
  };

  // -------- difficulty event
  changeDifficulty = (difficulty: Difficulty) => {
    this.difficulty = difficulty;
    this.apple.hasBoundaries = difficulty === Difficulty.Hard;
    this.snake.difficulty = difficulty;
    this.startGameTicker();
    this.setNewGameState();
  };

  // -------- User Interaction events
  getDirectionKeyMethods = (key: string) =>
    this.direction.keyEvents[key.toLowerCase() as SnakeGameDirectionKeys];

  onKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key.toLowerCase() === " ") {
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

  //--------- history
  getGameHistory = () => {
    const gameHistory = getSnakeGameHistory();
    const history = gameHistory.filter(
      (item) => item.difficulty === this.difficulty
    );
    return history;
  };

  // -------- cleanup
  cleanUpGridElements = () => {
    this.hyperCube?.cleanUp();
    this.dimensionator?.cleanUp();
  };
  cleanUp = () => {
    this.cleanUpGridElements();
  };
}
