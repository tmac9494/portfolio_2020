import { TILE_SIZE, getCoordsAsString, getCoordsFromString } from "../../types";
import { Coords } from "./types";

export class AppleTile {
  hasBoundaries: boolean;
  boundaries: Set<string>;
  coords?: Coords;
  gridWidth: number;
  position?: string;
  constructor({
    coords,
    hasBoundaries,
    gridWidth,
  }: {
    coords?: Coords;
    hasBoundaries?: boolean;
    gridWidth: number;
  }) {
    this.gridWidth = gridWidth;
    this.boundaries = new Set([]);
    this.coords = coords;
    this.hasBoundaries = !!hasBoundaries;
    this.position = coords && getCoordsAsString(coords);
  }

  getBoundaries = () => {
    if (this.coords && this.hasBoundaries) {
      if (this.coords.x > 0) {
        if (this.coords.y > 0) {
          this.boundaries.add(
            getCoordsAsString({ x: this.coords.x - 1, y: this.coords.y - 1 })
          );
        }
        if (this.coords.y < this.gridWidth - 1) {
          this.boundaries.add(
            getCoordsAsString({ x: this.coords.x - 1, y: this.coords.y + 1 })
          );
        }
      }
      if (this.coords.x < this.gridWidth - 1) {
        if (this.coords.y > 0) {
          this.boundaries.add(
            getCoordsAsString({ x: this.coords.x + 1, y: this.coords.y - 1 })
          );
        }
        if (this.coords.y < this.gridWidth - 1) {
          this.boundaries.add(
            getCoordsAsString({ x: this.coords.x + 1, y: this.coords.y + 1 })
          );
        }
      }
    }
  };

  setAppleOnGrid = ({
    coords,
    bufferCoords,
  }: {
    bufferCoords: Coords[];
    coords: Coords;
  }) => {
    this.clear();
    const generateCoords = (): Coords => ({
      x: Math.floor(Math.random() * this.gridWidth),
      y: Math.floor(Math.random() * this.gridWidth),
    });
    const snakeBufferCoords = new Set(
      bufferCoords.map((coord) => getCoordsAsString(coord))
    );

    let newCoords = getCoordsAsString(coords);
    do {
      newCoords = getCoordsAsString(generateCoords());
    } while (snakeBufferCoords.has(newCoords));
    this.coords = getCoordsFromString(newCoords);
    this.position = newCoords;
    this.getBoundaries();
  };

  getGridXPosition = (x?: number) =>
    (x !== undefined ? x : (this.coords && this.coords.x) || 0) * TILE_SIZE;
  getGridYPosition = (y?: number) =>
    (y !== undefined ? y : (this.coords && this.coords.y) || 0) * TILE_SIZE;

  clear = () => {
    this.coords = undefined;
    this.boundaries.clear();
  };
}
