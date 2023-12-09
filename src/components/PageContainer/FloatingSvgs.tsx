import React, { ReactElement, useState, useEffect } from "react";
import { PageSettingsSvgs } from "./pageSettings";

export const FloatingSvgs = (props: {
  svgs: PageSettingsSvgs;
}): ReactElement => {
  const [scrollDelta, setScrollDelta] = useState<number>(window.scrollY);
  const parallaxFactor = 25; // 100px of scrolling will be divided by this factor on each tick
  const { svgs } = props;

  // mount/unmount scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollDelta(window.scrollY);
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="floating_svg_container" className="fixed-fill">
      {svgs.map((svg, i) => {
        const SvgElement: React.FC<{ style: any }> = svg[0];
        return (
          <div key={svg[1].id} {...svg[1]}>
            <SvgElement
              style={{
                transform: `translateY(${Math.floor(
                  scrollDelta /
                    Math.floor(parallaxFactor + (svg[1].weight || 0))
                )}px)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
