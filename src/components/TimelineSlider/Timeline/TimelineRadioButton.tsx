import classNames from "classnames";
import React, { useState } from "react";
import { easings, useSpring, animated, config } from "react-spring";
import { getTimelineRadioSpring } from "../utils";

export const TimelineRadioButton: React.FC<{
  action: () => void;
  active: boolean;
  hasRead: boolean;
  subject: string;
  index: number;
}> = ({ action, active, subject, index, hasRead }) => {
  const easing = active ? easings.easeOutBack : easings.easeInBack;

  const [hover, setHover] = useState(false);

  const circleSpring = useSpring({
    scale: active ? 1.5 : 1,
    config: {
      duration: 280,
      easing,
    },
  });

  const { opacity, y, scale } = getTimelineRadioSpring({
    active,
    hover,
    hasRead,
    index,
  });

  const tooltip = useSpring({
    opacity,
    y,
    scale,
    config: {
      ...config.gentle,
      duration: 200,
      easing: active || hover ? easings.easeOutBack : easings.easeInBack,
    },
  });

  return (
    <div className="relative radio-container">
      <animated.div
        style={circleSpring}
        className={classNames(
          "radio-circle",
          hasRead && "has-read",
          active && "active"
        )}
        onClick={action}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      ></animated.div>

      <animated.div style={tooltip} className="subject-tooltip text-center">
        <span className={classNames("tooltip-text", hasRead && "has-read")}>
          {subject}
        </span>
      </animated.div>
    </div>
  );
};
