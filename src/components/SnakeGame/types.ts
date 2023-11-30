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

export const difficulties: Record<Difficulty, DifficultySetting> = {
  [Difficulty.Easy]: {
    name: Difficulty.Easy,
    interval: 160,
    borderOutOfBounds: false,
  },
  [Difficulty.Normal]: {
    name: Difficulty.Normal,
    interval: 160,
    borderOutOfBounds: true,
  },
  [Difficulty.Hard]: {
    name: Difficulty.Hard,
    interval: 140,
    borderOutOfBounds: true,
  },
};

export enum TileStates {
  Apple = "apple",
  Head = "head",
  Body = "body",
  Inactive = "inactive",
  Obstacle = "obstacle",
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

export class AppleTile {
  location: number;
  boundaries: Set<number>;
  constructor({
    location,
    hasBoundaries,
    gridWidth,
  }: {
    location: number;
    hasBoundaries?: boolean;
    gridWidth: number;
  }) {
    this.location = location;
    this.boundaries = new Set([]);
    if (hasBoundaries) {
      const prevRow = location - gridWidth;
      const nextRow = location + gridWidth;
      if ((location + 1) % gridWidth !== 0) {
        this.boundaries.add(nextRow + 1);
        this.boundaries.add(prevRow + 1);
      }
      if (location % gridWidth !== 0) {
        this.boundaries.add(nextRow - 1);
        this.boundaries.add(prevRow - 1);
      }
    }
  }
}

export type GameDeltas = Record<Directions, number>;

export const TILE_SIZE = 25;
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
};
export const SNAKE_GRID_ID = "snake_game_grid";
