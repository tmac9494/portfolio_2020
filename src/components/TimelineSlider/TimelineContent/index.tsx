import React, { useRef } from "react";
import { StoryBlock } from "../../Pages/Home/Sections";
import { useSpring, animated, easings } from "react-spring";
import "./styles.scss";

export const TimelineContent: React.FC<{
  list: StoryBlock[];
  currentStoryIndex: number;
}> = ({ list, currentStoryIndex }) => {
  const containerRef = useRef<any>();
  let delta = 25;
  if (containerRef.current) {
    const { width } = containerRef.current.getBoundingClientRect();
    delta = width;
  }

  const style = { transform: `translateX(-${delta * currentStoryIndex}px)` };

  const x = useSpring({
    x: -(delta * currentStoryIndex),
    easing: easings.easeInOutBack,
  });

  return (
    <animated.div
      className="flex flex-row align-center"
      style={x}
      ref={containerRef}
    >
      {list.map((listItem, index) => (
        <div
          className="timeline-content-block flex flex-row"
          style={{ opacity: currentStoryIndex === index ? 1 : 0 }}
        >
          <div className="timeline-copy">
            <h3>{listItem.title}</h3>
            <div>
              {listItem.content.map((text, i) => (
                <p key={text + i}>{text}</p>
              ))}
            </div>
          </div>
          <div className="timeline-images"></div>
        </div>
      ))}
    </animated.div>
  );
};
