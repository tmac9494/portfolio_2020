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
  effectIsActive: boolean;
  hideDelay: HideDelay;
  effectDuration: EffectDuration;
  duration?: number;
  visibleDuration?: number;

  constructor({
    gridWidth,
    hideDelay,
    effectDuration,
  }: GridElementConstructorParams) {
    this.gridWidth = gridWidth;
    this.effectIsActive = false;
    this.hideDelay = hideDelay !== false ? 5000 : hideDelay;
    this.effectDuration = effectDuration !== false ? 15000 : effectDuration;
  }

  tick(ms: number) {
    if (this.location && this.hideDelay) {
      const hideDelay = this.visibleDuration || 0;
      console.log(hideDelay);
      if (hideDelay !== 0) {
        if (hideDelay > ms) {
          this.visibleDuration = hideDelay - ms;
        } else {
          this.visibleDuration = 0;
        }
      } else {
        this.location = undefined;
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

  setOnGrid = ({ position, max, buffer }: SetOnGridParams) => {
    if (!!!this.location) {
      const generatePosition = () => Math.floor(Math.random() * max);
      const snakeBuffer = new Set(buffer);
      let newPosition = position;
      do {
        newPosition = generatePosition();
      } while (snakeBuffer.has(newPosition));
      if (this.hideDelay) {
        this.visibleDuration = this.hideDelay;
      }
      this.location = newPosition;
    }
  };

  eat = () => {
    this.location = undefined;
    this.duration = this.effectDuration || 0;
    if (this.effectDuration) {
      this.effectIsActive = true;
      this.duration = this.effectDuration;
    }
  };

  cleanUp = () => {
    this.location = undefined;
    this.effectIsActive = false;
  };
}
