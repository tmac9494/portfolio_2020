import React from "react";
import classNames from "classnames";
import { easings, useSpring, animated } from "react-spring";
import { TIMELINE_FILL_DURATION, getTimlineCircleSpring } from "../utils";

const COLORS = {
  filled: "#8000FF",
  empty: "#160556",
};

export const TimelineCircle: React.FC<{
  active: boolean;
  currentStoryIndex: number;
  index: number;
  lastIndex: number;
  hasRead: boolean;
  action: () => void;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  active,
  currentStoryIndex,
  index,
  lastIndex,
  hasRead,
  setHover,
  action,
}) => {
  const easing = active ? easings.easeOutBack : easings.easeInBack;
  const difference =
    currentStoryIndex > index
      ? currentStoryIndex - index
      : index - currentStoryIndex;

  // staggered delay effect
  const staggeredDelay =
    TIMELINE_FILL_DURATION / (difference + (difference === 2 ? 0 : 0.25)); // <<-- WHYY?!

  const { scale, duration } = getTimlineCircleSpring({
    active,
    hasRead,
  });

  const transitionDelay =
    index === lastIndex ? 0 : active ? TIMELINE_FILL_DURATION : staggeredDelay;

  const circleSpring = useSpring({
    scale,
    delay: transitionDelay,
    config: {
      duration,
      easing,
    },
  });

  const focus = () => setHover(true);
  const unFocus = () => setHover(false);

  return (
    <div className="circle-container relative flex flex-center">
      <button
        onClick={action}
        onMouseEnter={focus}
        onMouseLeave={unFocus}
        onFocus={focus}
        onBlur={unFocus}
      />
      <div className="abs-center">
        <animated.div
          style={{
            backgroundColor: active || hasRead ? COLORS.filled : COLORS.empty,
            transition: `background-color 0s ${transitionDelay}ms, box-shadow .32s ease-out ${transitionDelay}ms`,
            ...circleSpring,
          }}
          className={classNames(
            "radio-circle",
            hasRead && "has-read",
            active && "active"
          )}
        ></animated.div>
      </div>
    </div>
  );
};
