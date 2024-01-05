import React from "react";
import { PageSettingSvgItem } from "./pageSettings";
import { PARALLAX_FACTOR } from "./FloatingSvgs";

export const ParallaxElement: React.FC<{
  data: PageSettingSvgItem;
  delta: number;
}> = ({ data, delta }) => {
  const [Element, elementProps] = data;
  return (
    <div key={elementProps.id} {...elementProps}>
      <Element
        style={{
          transition: "transform 1s ease-out",
          transform: `translateY(${Math.floor(
            delta / Math.floor(PARALLAX_FACTOR + (elementProps.weight || 0))
          )}px)`,
        }}
      />
    </div>
  );
};
