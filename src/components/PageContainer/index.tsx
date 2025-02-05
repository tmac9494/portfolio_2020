import React, { useEffect } from "react";
import "./styles.scss";
import { Route, useLocation, Routes } from "react-router-dom";
import pageSettings from "./pageSettings";
import { Home } from "../../Pages";
import Work from "../../Pages/Work";
import Contact from "../../Pages/Contact";
import Skills from "../../Pages/Skills";
import Resume from "../../Pages/Resume";
import { FloatingSvgs } from "./FloatingSvgs";

const PageContainer: React.FC<{
  containerStyles?: any;
}> = ({ containerStyles }) => {
  // page settings
  const location = useLocation();
  const currentPage =
    location.pathname === "/" ? "home" : location.pathname.replace("/", "");
  const currentSettings = pageSettings[currentPage];
  const { total, color, svgs } = currentSettings;
  const gradient = "linear-gradient(70deg, " + color + ")";

  // // circle nav
  const scrollStateScrollValue = 0;
  let sectionCircs = [];
  for (let i = 0; i < total; i++) {
    sectionCircs.push(
      <div
        className={
          "section-circle light " +
          (scrollStateScrollValue === i ? " active" : "")
        }
        style={{ borderColor: currentSettings.floatingColor || "#fff" }}
        key={currentPage + i}
        onClick={
          () =>
            window.scrollTo({ top: window.innerHeight * i, behavior: "smooth" })
          // () => handleIndexChange(i)
        }
      >
        <div
          style={{ background: currentSettings.floatingColor || "#fff" }}
        ></div>
      </div>
    );
  }

  // change body id and reset scroll position on page change
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.id = `${currentPage}_body`;
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <div
      id="page_container"
      style={{
        background: gradient,
        ...containerStyles,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Background svgs */}
      <FloatingSvgs svgs={svgs} />

      {/* floating nav right*/}
      {/* {<div id="section-circles" onTransitionEnd={(e) => e.stopPropagation()}>
        {sectionCircs}
      </div>} */}
    </div>
  );
};

export default PageContainer;
