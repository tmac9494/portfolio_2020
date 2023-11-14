import React, { useState } from "react";
import { StoryBlock } from "../../Pages/Home/Sections";
import { animated, useSpring, easings } from "react-spring";
import "./styles.scss";

const TimelineRadioButton: React.FC<{
  action: () => void;
  active: boolean;
  subject: string;
  index: number;
}> = ({ action, active, subject, index }) => {
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
    opacity: active ? 1 : hover ? 0.6 : 0,
    y: (active || hover ? 14 : 0) * (index % 2 ? -1 : 1),
    config: {
      duration: 200,
      easing: active || hover ? easings.easeOutBack : easings.easeInBack,
    },
  });

  return (
    <div className="relative radio-container">
      <animated.div
        style={scale}
        className="radio-circle"
        onClick={action}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      ></animated.div>

      <animated.div style={tooltip} className="subject-tooltip text-center">
        <span>{subject}</span>
      </animated.div>
    </div>
  );
};

export const Timeline: React.FC<{
  list: StoryBlock[];
  setStory: (index: number) => void;
  currentStoryIndex: number;
}> = ({ list, setStory, currentStoryIndex }) => {
  return (
    <div className="timeline padding-top-4 padding-bottom-4">
      {list.map((listItem, i) => (
        <div key={listItem.title} className="timeline-element">
          <TimelineRadioButton
            subject={listItem.subject}
            active={currentStoryIndex === i}
            action={() => setStory(i)}
            index={i}
          />
          {i !== list.length - 1 && <div className="transition-line" />}
        </div>
      ))}
    </div>
  );
};
