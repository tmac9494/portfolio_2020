export class HyperCube {
  location?: number;
  timeout?: NodeJS.Timeout;
  hideTimeout?: NodeJS.Timeout;
  gridWidth: number;
  buffActive: boolean;
  constructor({ gridWidth }: { gridWidth: number }) {
    this.gridWidth = gridWidth;
    this.buffActive = false;
  }

  setCubeOnGrid = ({
    position,
    max,
    buffer,
  }: {
    position: number;
    max: number;
    buffer: number[];
  }) => {
    if (!(!!this.location || this.buffActive)) {
      const generatePosition = () => Math.floor(Math.random() * max);
      const snakeBuffer = new Set(buffer);
      let newPosition = position;
      do {
        newPosition = generatePosition();
      } while (snakeBuffer.has(newPosition));
      this.location = newPosition;
      this.hideTimeout = setTimeout(() => {
        this.location = undefined;
      }, 5000);
    }
  };

  eatCube = () => {
    this.location = undefined;
    this.buffActive = true;
    clearTimeout(this.hideTimeout);
    this.timeout = setTimeout(() => {
      this.buffActive = false;
    }, 15000);
  };

  cleanUp = () => {
    this.location = undefined;
    clearTimeout(this.hideTimeout);
    if (this.buffActive) {
      this.buffActive = false;
      clearTimeout(this.timeout);
    }
  };
}
