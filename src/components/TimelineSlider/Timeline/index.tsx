import React from "react";
import { StoryBlock } from "../../Pages/Home/Sections";
import { animated, useSpring, easings } from "react-spring";
import "./styles.scss";

const TimelineRadioButton: React.FC<{
  action: () => void;
  active: boolean;
  subject: string;
}> = ({ action, active, subject }) => {
  const easing = active ? easings.easeOutBack : easings.easeInBack;

  const scale = useSpring({
    scale: active ? 1.5 : 1,
    config: {
      duration: 280,
      easing,
    },
  });

  const tooltip = useSpring({
    opacity: active ? 1 : 0,
    y: active ? 14 : 0,
    config: {
      duration: 240,
      easing,
    },
  });

  return (
    <div className="relative radio-container">
      <animated.div
        style={scale}
        className="radio-circle"
        onClick={action}
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
    <div className="timeline">
      {list.map((listItem, i) => (
        <div key={listItem.title} className="timeline-element">
          <TimelineRadioButton
            subject={listItem.subject}
            active={currentStoryIndex === i}
            action={() => setStory(i)}
          />
          {i !== list.length - 1 && <div className="transition-line" />}
        </div>
      ))}
    </div>
  );
};
