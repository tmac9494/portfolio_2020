import { AppleTile, GridElementEffects } from "./utils";
import { SnakeDirection } from "./utils/SnakeDirection";

export type SnakeGameConfig = {
  size: number;
  width: number;
  interval: number;
  borderOutOfBounds: boolean;
};

export interface SnakeGameState extends SnakeGameConfig {
  gameState: GameState;
  length: number;
  apple?: AppleTile;
  position: number;
  difficulty: Difficulty;
  effects: Record<GridElementEffects, number>;
}

export type UpdateSnakeGameState = (overrides: Partial<SnakeGameState>) => void;

export type DifficultySetting = {
  name: Difficulty;
  interval: number;
  borderOutOfBounds: boolean;
};

export enum Difficulty {
  Easy = "Easy",
  Normal = "Normal",
  Hard = "Hard",
}

export enum TileStates {
  Buffer = "buffer",
  Apple = "apple",
  Head = "head",
  Body = "body",
  Inactive = "inactive",
  Obstacle = "obstacle",
  Hypercube = "hypercube",
  Dimensionator = "dimensionator",
}

export enum Directions {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
}

export enum GameState {
  Idle = "idle",
  Start = "start",
  Pause = "pause",
  Dead = "Dead",
}

export enum SnakeGameDirectionKeys {
  W = "w",
  A = "a",
  S = "s",
  D = "d",
}

export type GameDeltas = Record<Directions, number>;

export type SnakeGameCache = {
  direction: SnakeDirection;
  lastPositions: Set<number>;
};

export const difficulties: Record<Difficulty, DifficultySetting> = {
  [Difficulty.Easy]: {
    name: Difficulty.Easy,
    interval: 200,
    borderOutOfBounds: false,
  },
  [Difficulty.Normal]: {
    name: Difficulty.Normal,
    interval: 200,
    borderOutOfBounds: true,
  },
  [Difficulty.Hard]: {
    name: Difficulty.Hard,
    interval: 180,
    borderOutOfBounds: true,
  },
};

export const TILE_SIZE = window.innerWidth <= 800 ? 25 : 32;
export const GRID_WIDTH = 15;
export const DEFAULT_LENGTH = 2;
export const BORDER_OUT_OF_BOUNDS = true;
export const INITIAL_DIRECTION = Directions.Right;
export const HISTORY_STORAGE_KEY = "gamehistory";
export const INITIAL_GAME_STATE: SnakeGameState = {
  size: TILE_SIZE,
  width: GRID_WIDTH,
  interval: difficulties.Normal.interval,
  gameState: GameState.Idle,
  apple: undefined,
  length: DEFAULT_LENGTH,
  borderOutOfBounds: difficulties.Normal.borderOutOfBounds,
  position: 0,
  difficulty: Difficulty.Normal,
  effects: {
    [GridElementEffects.Dimensionator]: 0,
    [GridElementEffects.Hypercube]: 0,
  },
};
export const SNAKE_GAME_ID = "snake-game";
export const SNAKE_GRID_ID = "snake_game_grid";
export const SNAKE_CONTAINER_ID = "snake_game_container";
export const MINIMUM_SWIPE_DISTANCE = 25;
