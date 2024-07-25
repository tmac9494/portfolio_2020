import {
  Difficulty,
  Directions,
  OPPOSITE_DIRECTION,
  difficulties,
} from "../../types";
import { AppleTile } from "./AppleTile";
import { mapNewBodyElements, mapSnakeHead } from "./grid-element-utils";
import { GridElement } from "./GridElement";
import { SnakeBody } from "./SnakeBody";
import { SnakeHead } from "./SnakeHead";
import { SnakeParams } from "./types";

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
    const bodyPositionSet = new Set<string>();
    for (let i = 0; i < this.body.length; i++) {
      this.body[i].follow(
        i > 0 ? this.body[i - 1].lastPosition : this.head.lastPosition,
        i > 0 ? this.body[i - 1].getCoords() : this.head.getCoords()
      );
      bodyPositionSet.add(this.body[i].position);
    }

    // player died
    const playerDied =
      this.isPlayerOutOfBounds() ||
      this.hasPlayerAteBody(bodyPositionSet) ||
      this.hasPlayerHitObstacle(apple);

    if (playerDied) endGame();

    // grid elements
    const gridElementEffects = {
      [apple?.position ?? ""]: () => {
        this.grow();
        eatApple();
      },
      [dimensionator?.position ?? ""]: () => dimensionator?.eat(),
      [hyperCube?.position ?? ""]: () => hyperCube?.eat(),
    };

    gridElementEffects[this.head.position]?.();
  }

  // death checks
  isPlayerOutOfBounds = () => this.head.isHeadOutOfBounds();

  hasPlayerAteBody = (bodyPositionSet: Set<string>) =>
    bodyPositionSet.has(this.head.position);

  hasPlayerHitObstacle = (apple: AppleTile) =>
    apple.boundaries.has(this.head.position);

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
  mapParameterInput(params: SnakeParams) {
    this.body = mapNewBodyElements(params.body, params.gridWidth);
    this.head = mapSnakeHead(params.head, params.gridWidth);
  }

  // reset snake state
  reset(centerPoint: number) {
    this.head.x = centerPoint;
    this.head.y = centerPoint;
    this.mapParameterInput(this.initialParams);
  }
}
