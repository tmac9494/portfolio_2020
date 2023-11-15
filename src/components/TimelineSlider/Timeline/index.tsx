import React, { useRef, useState } from "react";
import { StoryBlock } from "../../Pages/Home/Sections";
import { animated, useSpring, easings } from "react-spring";
import "./styles.scss";
import classNames from "classnames";

const TimelineRadioButton: React.FC<{
  action: () => void;
  active: boolean;
  hasRead: boolean;
  subject: string;
  index: number;
}> = ({ action, active, subject, index, hasRead }) => {
  const easing = active ? easings.easeOutBack : easings.easeInBack;

  const [hover, setHover] = useState(false);

  const scale = useSpring({
    scale: active ? 1.5 : 1,
    config: {
      duration: 280,
      easing,
    },
  });

  const tooltip = useSpring({
    opacity: active ? 1 : hover || hasRead ? 0.6 : 0,
    y: (active ? 14 : hover || hasRead ? 10 : 0) * (index % 2 ? -1 : 1),
    scale: active ? 1 : hover ? 0.8 : 0.7,
    config: {
      duration: 200,
      easing: active || hover ? easings.easeOutBack : easings.easeInBack,
    },
  });

  return (
    <div className="relative radio-container">
      <animated.div
        style={scale}
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

export const Timeline: React.FC<{
  list: StoryBlock[];
  setStory: (index: number) => void;
  currentStoryIndex: number;
}> = ({ list, setStory, currentStoryIndex }) => {
  const containerRef = useRef<any>();
  let elementWidth = 0;
  if (containerRef.current) {
    const { width } = containerRef.current.getBoundingClientRect();
    elementWidth =
      (width / list.length) * currentStoryIndex + currentStoryIndex * 6;
  }

  return (
    <div className="text-center">
      <div className="timeline-container relative">
        <div
          style={{ width: elementWidth + "px" }}
          className="timeline-fill abs-center"
        />
        <div
          className="timeline padding-top-4 padding-bottom-4 relative"
          ref={containerRef}
        >
          {list.map((listItem, i) => (
            <div key={listItem.title} className="timeline-element">
              <TimelineRadioButton
                subject={listItem.subject}
                active={currentStoryIndex === i}
                hasRead={currentStoryIndex > i}
                action={() => setStory(i)}
                index={i}
              />
              {i !== list.length - 1 && (
                <div
                  className={classNames(
                    "transition-line",
                    currentStoryIndex > i && "has-read"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
