import React, { useState } from "react";
import { TimelineTooltip } from "./TimelineTooltip";
import { TimelineCircle } from "./TimelineCircle";

export const TimelineRadioButton: React.FC<{
  action: () => void;
  hasRead: boolean;
  subject: string;
  index: number;
  lastIndex: number;
  currentStoryIndex: number;
}> = ({ action, subject, index, lastIndex, currentStoryIndex, hasRead }) => {
  const [hover, setHover] = useState(false);
  const active = index === currentStoryIndex;

  return (
    <div className="relative radio-container">
      <TimelineCircle
        setHover={setHover}
        active={active}
        index={index}
        lastIndex={lastIndex}
        hasRead={hasRead}
        action={action}
        currentStoryIndex={currentStoryIndex}
      />
      <TimelineTooltip
        hover={hover}
        active={active}
        subject={subject}
        index={index}
        hasRead={hasRead}
      />
    </div>
  );
};
