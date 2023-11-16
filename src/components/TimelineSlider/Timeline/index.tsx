import React, { useRef } from "react";
import { StoryBlock } from "../../Pages/Home/Sections";
import "./styles.scss";
import classNames from "classnames";
import { TimelineRadioButton } from "./TimelineRadioButton";

export const Timeline: React.FC<{
  list: StoryBlock[];
  setStory: (index: number) => void;
  currentStoryIndex: number;
}> = ({ list, setStory, currentStoryIndex }) => {
  const containerRef = useRef<any>();

  let elementWidth = 0;
  if (containerRef.current) {
    const { width } = containerRef.current.getBoundingClientRect();
    // highlihg line width
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
