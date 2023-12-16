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
  SNAKE_GAME_ID,
  GameDeltas,
  getCoordsFromString,
} from "../types";
import {
  SnakeDirection,
  saveSnakeGameHistory,
  SnakeGameTouchHandler,
} from "./";
import { AppleTile, GridElement, GridElementEffects } from "./gridElements";
import { SnakeController } from "./gridElements/Snake";
import { Coords } from "./gridElements/types";

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
  max: number;
  gridWidth: number;
  direction: SnakeDirection;
  difficulty: Difficulty;
  apple: AppleTile;
  hyperCube?: GridElement;
  dimensionator?: GridElement;
  touch: SnakeGameTouchHandler;
  lastUpdateTimestamp: number;
  time: number;
  focused: boolean;
  onTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: TouchEvent<HTMLDivElement>) => void;
  renderDispatch: React.Dispatch<
    React.SetStateAction<SnakeGameState | undefined>
  >;
  snake: SnakeController;

  constructor({ gridWidth, renderDispatch, debug }: InstanceConstructorParams) {
    this.focused = false;
    this.time = 0;
    this.lastUpdateTimestamp = 0;
    this.debug = !!debug;
    const max = gridWidth * gridWidth;
    const centerPoint = Math.ceil((gridWidth - 1) / 2);
    this.isMobile = window.innerWidth <= 800;
    this.max = max;
    this.centerPoint = centerPoint;
    this.gridWidth = gridWidth;
    this.difficulty = Difficulty.Normal;
    this.gameState = GameState.Idle;
    this.length = DEFAULT_LENGTH;
    this.apple = new AppleTile({
      gridWidth,
    });
    this.hyperCube = new GridElement({
      gridWidth,
    });
    this.dimensionator = new GridElement({
      gridWidth,
    });
    const testpoint = Math.ceil((gridWidth - 1) / 2);
    this.snake = new SnakeController({
      head: { x: testpoint, y: testpoint },
      body: [
        { x: testpoint - 1, y: testpoint },
        { x: testpoint - 2, y: testpoint },
      ],
      difficulty: Difficulty.Normal,
      gridWidth: gridWidth,
    });
    this.direction = new SnakeDirection(
      INITIAL_DIRECTION,
      { x: testpoint, y: testpoint },
      this.renderGame
    );
    this.touch = new SnakeGameTouchHandler(this.direction);
    this.onTouchStart = this.touch.onTouchStart;
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
    const tickDelta = time - this.time;
    this.time = time;
    const { interval } = difficulties[this.difficulty];
    if (this.gameState === GameState.Start) {
      this.hyperCube?.tick(tickDelta);
      this.dimensionator?.tick(tickDelta);
      const requiredDelta = interval + (this.isMobile ? 50 : 0);
      const isPassedDelta =
        time - this.lastUpdateTimestamp >=
        (this?.hyperCube?.effectIsActive ? requiredDelta * 0.8 : requiredDelta);
      if (isPassedDelta) {
        this.gameTick();

        this.lastUpdateTimestamp = time;
      }
      this.renderGame();
    }
    requestAnimationFrame(this.tickerInterval);
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

  getSnakeBufferCoords = (): Coords[] => {
    const position = this.snake.head.getCoords();
    return [
      // create larger buffer around snake's head
      position,
      {
        x: position.x + 1,
        y: position.y,
      },
      {
        x: position.x - 1,
        y: position.y,
      },
      {
        x: position.x,
        y: position.y + 1,
      },
      {
        x: position.x,
        y: position.y - 1,
      },
      {
        x: position.x - 1,
        y: position.y + 1,
      },
      {
        x: position.x + 1,
        y: position.y + 1,
      },
      {
        x: position.x - 1,
        y: position.y - 1,
      },
      {
        x: position.x + 1,
        y: position.y - 1,
      },
      // snake body
      ...Array.from(
        this.snake.body.map((element) => ({ x: element.x, y: element.y }))
      ),
    ].reduce((prev: Coords[], current: Coords): Coords[] => {
      return [
        ...prev,
        current,
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 },
        { x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
      ];
    }, []);
  };

  // -------- apple stuff
  eatApple = () => {
    this.length++;
    this.generateApple();
    const value = this.length - DEFAULT_LENGTH;
    const obstacleBuffer = Array.from(this.apple.boundaries).map((boundary) =>
      getCoordsFromString(boundary)
    );
    if (value === 2 || value % 10 === 0)
      this.hyperCube?.setOnGrid({
        max: this.max,
        bufferCoords: [
          this.apple.coords as Coords,
          ...obstacleBuffer,
          ...this.getSnakeBufferCoords(),
          this.hyperCube?.coords || this.snake.head.getCoords(),
          this.dimensionator?.coords || this.snake.head.getCoords(),
        ],
        coords: this.snake.head.getCoords(),
      });
    if (this.difficulty !== Difficulty.Easy && (value === 1 || value % 8 === 0))
      this.dimensionator?.setOnGrid({
        max: this.max,
        bufferCoords: [
          this.apple.coords as Coords,
          ...obstacleBuffer,
          ...this.getSnakeBufferCoords(),
          this.hyperCube?.coords || this.snake.head.getCoords(),
          this.dimensionator?.coords || this.snake.head.getCoords(),
        ],
        coords: this.snake.head.getCoords(),
      });
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

  // -------- cleanup
  cleanUpGridElements = () => {
    this.hyperCube?.cleanUp();
    this.dimensionator?.cleanUp();
  };
  cleanUp = () => {
    this.cleanUpGridElements();
  };
}
