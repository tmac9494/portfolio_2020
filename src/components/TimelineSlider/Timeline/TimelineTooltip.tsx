import classNames from "classnames";
import React from "react";
import { useSpring, config, easings, animated } from "react-spring";
import { getTimelineTooltipSpring, TIMELINE_FILL_DURATION } from "../utils";

export const TimelineTooltip: React.FC<{
  hover: boolean;
  active: boolean;
  subject: string;
  hasRead: boolean;
  index: number;
}> = ({ hover, active, subject, hasRead, index }) => {
  const { opacity, y, scale } = getTimelineTooltipSpring({
    active,
    hover,
    hasRead,
    index,
  });

  const tooltip = useSpring({
    opacity,
    y,
    scale,
    delay: active ? TIMELINE_FILL_DURATION : 0,
    config: {
      ...config.gentle,
      duration: 200,
      easing: active || hover ? easings.easeOutBack : easings.easeInBack,
    },
  });

  return (
    <animated.div style={tooltip} className="subject-tooltip text-center">
      <span className={classNames("tooltip-text", hasRead && "has-read")}>
        {subject}
      </span>
    </animated.div>
  );
};
