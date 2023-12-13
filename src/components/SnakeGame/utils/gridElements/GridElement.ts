type HideDelay = number | false;
type EffectDuration = number | false;

type GridElementConstructorParams = {
  gridWidth: number;
  hasEffect?: boolean;
  hideDelay?: HideDelay;
  effectDuration?: EffectDuration;
};

type SetOnGridParams = {
  position: number;
  max: number;
  buffer: number[];
};

export enum GridElementEffects {
  Hypercube = "hyperCube",
  Dimensionator = "dimensionator",
}

export class GridElement {
  gridWidth: number;
  location?: number;
  timeout?: NodeJS.Timeout;
  hideTimeout?: NodeJS.Timeout;
  effectIsActive: boolean;
  lastActivatedAt: number;
  hideDelay: HideDelay;
  effectDuration: EffectDuration;

  constructor({
    gridWidth,
    hideDelay,
    effectDuration,
  }: GridElementConstructorParams) {
    this.gridWidth = gridWidth;
    this.effectIsActive = false;
    this.hideDelay = hideDelay !== false ? 5000 : hideDelay;
    this.effectDuration = effectDuration !== false ? 15000 : effectDuration;
    this.lastActivatedAt = Date.now();
  }

  setOnGrid = ({ position, max, buffer }: SetOnGridParams) => {
    if (!!!this.location) {
      const generatePosition = () => Math.floor(Math.random() * max);
      const snakeBuffer = new Set(buffer);
      let newPosition = position;
      do {
        newPosition = generatePosition();
      } while (snakeBuffer.has(newPosition));
      this.location = newPosition;
      if (this.hideDelay) {
        this.hideTimeout = setTimeout(() => {
          this.location = undefined;
        }, this.hideDelay);
      }
    }
  };

  eat = () => {
    this.location = undefined;
    this.lastActivatedAt = Date.now();
    clearTimeout(this.hideTimeout);
    clearTimeout(this.timeout);
    if (this.effectDuration) {
      this.effectIsActive = true;
      this.timeout = setTimeout(() => {
        this.effectIsActive = false;
      }, this.effectDuration);
    }
  };

  cleanUp = () => {
    this.location = undefined;
    clearTimeout(this.hideTimeout);
    if (this.effectIsActive) {
      this.effectIsActive = false;
      clearTimeout(this.timeout);
    }
  };
}
