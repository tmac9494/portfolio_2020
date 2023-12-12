import { TouchEvent } from "react";
import { MINIMUM_SWIPE_DISTANCE } from "../types";
import { SnakeDirection } from "./SnakeDirection";

export class SnakeGameTouchHandler {
  touchStart: [number, number] | null;
  touchEnd: [number, number] | null;
  direction: SnakeDirection;
  constructor(direction: SnakeDirection) {
    this.touchStart = null;
    this.touchEnd = null;
    this.direction = direction;
  }

  onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    this.touchEnd = null;
    this.touchStart = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  };

  onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    this.touchEnd = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  };

  onTouchEnd = () => {
    if (!this.touchStart || !this.touchEnd) return;
    const xDistance = this.touchStart[0] - this.touchEnd[0];
    const yDistance = this.touchStart[1] - this.touchEnd[1];
    const xIsGreeater =
      (xDistance < 0 ? xDistance * -1 : xDistance) >
      (yDistance < 0 ? yDistance * -1 : yDistance);
    const isLeftSwipe = xDistance > MINIMUM_SWIPE_DISTANCE;
    const isRightSwipe = xDistance < -MINIMUM_SWIPE_DISTANCE;
    const isUpSwipe = yDistance > MINIMUM_SWIPE_DISTANCE;
    const isDownSwipe = yDistance < -MINIMUM_SWIPE_DISTANCE;
    if (xIsGreeater) {
      if (isLeftSwipe) {
        this.direction.toLeft();
      } else if (isRightSwipe) {
        this.direction.toRight();
      }
    } else {
      if (isUpSwipe) {
        this.direction.toTop();
      } else if (isDownSwipe) {
        this.direction.toBottom();
      }
    }
  };
}
