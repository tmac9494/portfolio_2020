import React, { useRef } from "react";
import { StoryBlock } from "../../../Pages/Home/Sections";
import "./styles.scss";
import classNames from "classnames";
import { TimelineRadioButton } from "./TimelineRadioButton";
import { TIMELINE_FILL_DURATION } from "../utils";

export const Timeline: React.FC<{
  list: StoryBlock[];
  setStory: (index: number) => void;
  currentStoryIndex: number;
}> = ({ list, setStory, currentStoryIndex }) => {
  const containerRef = useRef<any>();
  const lastIndex = useRef<number>(currentStoryIndex);

  let elementWidth = 0;
  if (containerRef.current) {
    const { width } = containerRef.current.getBoundingClientRect();
    // highlight line width
    elementWidth =
      ((width + currentStoryIndex * 10) / list.length) * currentStoryIndex;
  }
  const timelineTransition = `width ${TIMELINE_FILL_DURATION}ms linear`;

  return (
    <div className="text-center">
      <div className="timeline-container relative">
        <div
          style={{ width: elementWidth + "px", transition: timelineTransition }}
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
                hasRead={currentStoryIndex > i}
                action={() => {
                  setStory(i);
                  lastIndex.current = currentStoryIndex;
                }}
                index={i}
                lastIndex={lastIndex.current}
                currentStoryIndex={currentStoryIndex}
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
