export class AppleTile {
  location?: number;
  hasBoundaries: boolean;
  boundaries: Set<number>;
  gridWidth: number;
  constructor({
    location,
    hasBoundaries,
    gridWidth,
  }: {
    location?: number;
    hasBoundaries?: boolean;
    gridWidth: number;
  }) {
    this.gridWidth = gridWidth;
    this.location = location;
    this.boundaries = new Set([]);
    this.hasBoundaries = !!hasBoundaries;
    // traps
  }

  getBoundaries = () => {
    if (this.location && this.hasBoundaries) {
      const prevRow = this.location - this.gridWidth;
      const nextRow = this.location + this.gridWidth;
      if ((this.location + 1) % this.gridWidth !== 0) {
        this.boundaries.add(nextRow + 1);
        this.boundaries.add(prevRow + 1);
      }
      if (this.location % this.gridWidth !== 0) {
        this.boundaries.add(nextRow - 1);
        this.boundaries.add(prevRow - 1);
      }
    }
  };

  setAppleOnGrid = ({
    position,
    max,
    buffer,
  }: {
    position: number;
    max: number;
    buffer: number[];
  }) => {
    const generatePosition = () => Math.floor(Math.random() * max);
    const snakeBuffer = new Set(
      buffer.reduce((prev: number[], current) => {
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
    this.location = newPosition;
    this.getBoundaries();
  };

  clear = () => {
    this.location = undefined;
    this.boundaries.clear();
  };
}
