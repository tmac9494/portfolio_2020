import { TILE_SIZE, getCoordsAsString, getCoordsFromString } from "../../types";
import { Coords } from "./types";

type HideDelay = number | false;
type EffectDuration = number | false;

type GridElementConstructorParams = {
  gridWidth: number;
  hasEffect?: boolean;
  hideDelay?: HideDelay;
  effectDuration?: EffectDuration;
  coords?: Coords;
};

type SetOnGridParams = {
  max: number;
  coords: Coords;
  bufferCoords: Coords[];
};

export enum GridElementEffects {
  Hypercube = "hyperCube",
  Dimensionator = "dimensionator",
}

export class GridElement {
  gridWidth: number;
  coords?: Coords;
  effectIsActive: boolean;
  hideDelay: HideDelay;
  effectDuration: EffectDuration;
  duration?: number;
  visibleDuration?: number;
  position?: string;

  constructor({
    gridWidth,
    hideDelay,
    effectDuration,
    coords,
  }: GridElementConstructorParams) {
    this.coords = coords;
    this.gridWidth = gridWidth;
    this.effectIsActive = false;
    this.hideDelay = hideDelay !== false ? 5000 : hideDelay;
    this.effectDuration = effectDuration !== false ? 15000 : effectDuration;
    this.position = coords && getCoordsAsString(coords);
  }

  tick(ms: number) {
    if (this.coords && this.hideDelay) {
      const hideDelay = this.visibleDuration || 0;
      if (hideDelay !== 0) {
        if (hideDelay > ms) {
          this.visibleDuration = hideDelay - ms;
        } else {
          this.visibleDuration = 0;
        }
      } else {
        this.clearCoordinates();
      }
    }

    if (this.effectIsActive && this.effectDuration) {
      const duration = this.duration || 0;
      if (duration !== 0) {
        if (duration > ms) {
          this.duration = duration - ms;
        } else {
          this.duration = 0;
        }
      } else {
        this.effectIsActive = false;
      }
    }
  }

  setOnGrid = ({ coords, bufferCoords }: SetOnGridParams) => {
    if (!!!this.coords) {
      const generateCoords = (): Coords => ({
        x: Math.floor(Math.random() * this.gridWidth),
        y: Math.floor(Math.random() * this.gridWidth),
      });
      const snakeCoordsBuffer = new Set(
        bufferCoords.map((cord) => getCoordsAsString(cord))
      );
      let newCoords = getCoordsAsString(coords);

      do {
        newCoords = getCoordsAsString(generateCoords());
      } while (snakeCoordsBuffer.has(newCoords));

      if (this.hideDelay) {
        this.visibleDuration = this.hideDelay;
      }

      this.position = newCoords;
      this.coords = getCoordsFromString(newCoords);
    }
  };

  eat = () => {
    this.coords = undefined;
    this.position = undefined;
    this.duration = this.effectDuration || 0;
    if (this.effectDuration) {
      this.effectIsActive = true;
      this.duration = this.effectDuration;
    }
  };
  getGridXPosition = () => ((this.coords && this.coords.x) || 0) * TILE_SIZE;
  getGridYPosition = () => ((this.coords && this.coords.y) || 0) * TILE_SIZE;

  cleanUp = () => {
    this.effectIsActive = false;
    this.clearCoordinates();
    this.duration = 0;
    this.visibleDuration = 0;
  };
  clearCoordinates = () => {
    this.coords = undefined;
    this.position = undefined;
  };
}
