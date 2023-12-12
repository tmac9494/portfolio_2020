import React, { ReactElement, useState, useEffect } from "react";
import { PageSettingsSvgs } from "./pageSettings";
import { ParallaxElement } from "./ParallaxElement";
export const PARALLAX_FACTOR = 25; // 100px of scrolling will be divided by this factor on each tick

export const FloatingSvgs = (props: {
  svgs: PageSettingsSvgs;
}): ReactElement => {
  const [scrollDelta, setScrollDelta] = useState<number>(window.scrollY);
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
      {svgs.map((svg, i) => (
        <ParallaxElement key={svg[1].id} data={svg} delta={scrollDelta} />
      ))}
    </div>
  );
};
