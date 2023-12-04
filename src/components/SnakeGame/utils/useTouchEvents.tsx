import { TouchEvent, useState } from "react";
import { SnakeDirection } from "./SnakeDirection";
import { MINIMUM_SWIPE_DISTANCE } from "../types";

export const useSnakeGameTouchEvents = ({
  direction,
}: {
  direction: SnakeDirection;
}) => {
  const [touchStart, setTouchStart] = useState<[number, number] | null>(null);
  const [touchEnd, setTouchEnd] = useState<[number, number] | null>(null);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart([e.targetTouches[0].clientX, e.targetTouches[0].clientY]);
  };
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) =>
    setTouchEnd([e.targetTouches[0].clientX, e.targetTouches[0].clientY]);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const xDistance = touchStart[0] - touchEnd[0];
    const yDistance = touchStart[1] - touchEnd[1];
    const xIsGreeater =
      (xDistance < 0 ? xDistance * -1 : xDistance) >
      (yDistance < 0 ? yDistance * -1 : yDistance);
    const isLeftSwipe = xDistance > MINIMUM_SWIPE_DISTANCE;
    const isRightSwipe = xDistance < -MINIMUM_SWIPE_DISTANCE;
    const isUpSwipe = yDistance > MINIMUM_SWIPE_DISTANCE;
    const isDownSwipe = yDistance < -MINIMUM_SWIPE_DISTANCE;
    if (xIsGreeater) {
      if (isLeftSwipe) {
        direction.toLeft();
      } else if (isRightSwipe) {
        direction.toRight();
      }
    } else {
      if (isUpSwipe) {
        direction.toTop();
      } else if (isDownSwipe) {
        direction.toBottom();
      }
    }
  };

  return {
    onTouchEnd,
    onTouchMove,
    onTouchStart,
  };
};
