import React, { useRef } from "react";
import { StoryBlock } from "../../Pages/Home/Sections";
import { TimelineImages } from "../TimlineImages";
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

  const timleinePosition = useSpring({
    x: -(delta * currentStoryIndex),
    easing: easings.easeInOutBack,
  });

  return (
    <animated.div
      className="flex flex-row align-center"
      style={timleinePosition}
      ref={containerRef}
    >
      {list.map((listItem, index) => (
        <div
          className="timeline-content-block flex flex-row"
          style={{ opacity: currentStoryIndex === index ? 1 : 0 }}
        >
          <div className="timeline-copy padding-right-3">
            <h3>{listItem.title}</h3>
            <div>
              {listItem.content.map((text, i) => (
                <p key={text + i}>{text}</p>
              ))}
            </div>
          </div>
          <TimelineImages images={listItem.images} />
        </div>
      ))}
    </animated.div>
  );
};
