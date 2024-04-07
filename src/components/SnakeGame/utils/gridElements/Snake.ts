import {
  Difficulty,
  Directions,
  OPPOSITE_DIRECTION,
  difficulties,
  getCoordsAsString,
} from "../../types";
import { AppleTile } from "./AppleTile";
import { GridElement } from "./GridElement";
import { SnakeBody } from "./SnakeBody";
import { SnakeHead } from "./SnakeHead";
import { Coords, SnakeParams } from "./types";

const mapNewBodyElements = (body: Coords[], gridWidth: number) =>
  body.map(
    (position, index) =>
      new SnakeBody({
        ...position,
        direction: Directions.Right,
        gridWidth: gridWidth,
        index,
      })
  );
const mapSnakeHead = (coords: Coords, gridWidth: number) =>
  new SnakeHead({
    ...coords,
    direction: Directions.Right,
    gridWidth: gridWidth,
  });

export class SnakeController {
  body: SnakeBody[];
  head: SnakeHead;
  difficulty: Difficulty;
  initialParams: SnakeParams;

  constructor(params: SnakeParams) {
    this.body = mapNewBodyElements(params.body, params.gridWidth);
    this.head = mapSnakeHead(params.head, params.gridWidth);
    this.difficulty = params.difficulty;
    this.initialParams = params;
  }

  // move to the next direction
  move({
    direction,
    apple,
    dimensionator,
    hyperCube,
    eatApple,
    endGame,
  }: {
    direction: Directions;
    apple: AppleTile;
    dimensionator?: GridElement;
    hyperCube?: GridElement;
    eatApple: () => void;
    endGame: () => void;
  }) {
    const { borderOutOfBounds } = difficulties[this.difficulty];
    const outOfBoundsAllowed =
      !borderOutOfBounds || !!dimensionator?.effectIsActive;

    // move head
    this.head.move(direction, outOfBoundsAllowed);
    // move body
    for (let i = 0; i < this.body.length; i++) {
      this.body[i].follow(
        i > 0 ? this.body[i - 1].lastPosition : this.head.lastPosition,
        i > 0 ? this.body[i - 1].getCoords() : this.head.getCoords()
      );
    }

    // react to state
    const positionAsString = getCoordsAsString(this.head);

    // hazards
    const playerAteBody = new Set(
      this.body.map((item) => getCoordsAsString(item))
    ).has(positionAsString);

    const playerOutOfBounds =
      this.head.x > this.head.max ||
      this.head.y > this.head.max ||
      this.head.x < 0 ||
      this.head.y < 0;

    const playerHitObstacle = apple.boundaries.has(positionAsString);

    // player died
    const playerDied = playerAteBody || playerOutOfBounds || playerHitObstacle;

    if (playerDied) endGame();

    // grid elements
    switch (positionAsString) {
      case !!apple?.coords && getCoordsAsString(apple.coords):
        this.grow();
        eatApple();
        break;
      case !!dimensionator?.coords && getCoordsAsString(dimensionator.coords):
        dimensionator?.eat();
        break;
      case !!hyperCube?.coords && getCoordsAsString(hyperCube?.coords):
        hyperCube?.eat();
        break;
    }
  }

  // grow snake by 1
  grow() {
    const lastSnakeBodyElement = this.body[this.body.length - 1];
    const { lastPosition, from } = lastSnakeBodyElement;
    this.body.push(
      new SnakeBody({
        x: lastPosition.x,
        y: lastPosition.y,
        direction: from
          ? OPPOSITE_DIRECTION[from]
          : lastSnakeBodyElement.direction,
        from: lastSnakeBodyElement.from,
        index: this.body.length,
        gridWidth: this.initialParams.gridWidth,
      })
    );
  }

  // core parameters change/reset
  setCoreParameters(params: SnakeParams) {
    this.body = mapNewBodyElements(params.body, params.gridWidth);
    this.head = mapSnakeHead(params.head, params.gridWidth);
  }

  // reset snake state
  reset(centerPoint: number) {
    this.head.x = centerPoint;
    this.head.y = centerPoint;
    this.setCoreParameters(this.initialParams);
  }
}
