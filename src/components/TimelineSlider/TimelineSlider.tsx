import React, { useState } from "react";
import { StoryBlock } from "../Pages/Home/Sections";
import { Timeline } from "./Timeline";
import "./styles.scss";
import { TimelineContent } from "./TimelineContent";

export const TimelineSlider: React.FC<{
  list: StoryBlock[];
}> = ({ list }) => {
  const [currentStory, setCurrentStory] = useState<number>(0);

  return (
    <div className="timeline-slider">
      <Timeline
        list={list}
        setStory={(index: number) => setCurrentStory(index)}
        currentStoryIndex={currentStory}
      />
      <div className="padding-top-5 margin-top-5">
        <TimelineContent list={list} currentStoryIndex={currentStory} />
      </div>
    </div>
  );
};
