import React from "react";
import { StoryImage } from "../../../Pages/Home/Sections";
import { useSpring, animated } from "react-spring";

import "./styles.scss";
import { timelineImagePositions } from "./utils/image-positions";

export const TimelineImage: React.FC<{
  image: StoryImage;
  index: number;
  bumped: boolean;
  hover: boolean;
  setHover: (index: number | null) => void;
}> = ({ image, index, bumped, hover, setHover }) => {
  const bumpedPosition = {
    x: timelineImagePositions[index]?.x || 0,
    y: timelineImagePositions[index]?.y || 0,
  };

  const imagePosition = useSpring({
    x: bumped ? bumpedPosition.x : 0,
    y: bumped ? bumpedPosition.y : 0,
  });

  return (
    <div
      className={`timeline-image image-${index}`}
      onMouseEnter={() => setHover(index)}
      onMouseLeave={() => setHover(null)}
    >
      <animated.img style={imagePosition} {...image} />
    </div>
  );
};
