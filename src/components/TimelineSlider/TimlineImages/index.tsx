import React, { useState } from "react";
import { StoryImage } from "../../Pages/Home/Sections";
import { TimelineImage } from "./TimlineImage";
import "./styles.scss";

export const TimelineImages: React.FC<{
  images: StoryImage[];
}> = ({ images }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="timeline-images relative">
      {images.map((img, i) => (
        <TimelineImage
          image={img}
          key={img.src}
          index={i}
          setHover={setHoverIndex}
          hover={hoverIndex === i}
          bumped={hoverIndex !== null && hoverIndex !== i}
        />
      ))}
    </div>
  );
};
