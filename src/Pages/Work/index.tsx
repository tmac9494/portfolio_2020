import React from "react";
import "./styles.scss";
import { Intro, Projects, TechDegree } from "./Sections";

const Work: React.FC = () => {
  return (
    <div id="work_page">
      <Intro />
      {/* <WorkProjects /> */}
      <Projects />
      <TechDegree />
    </div>
  );
};

export default Work;
