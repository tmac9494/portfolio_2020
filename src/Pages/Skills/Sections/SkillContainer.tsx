import React from "react";

import { useDevice } from "../../../components/General";
import { skillLevels } from "../../../utils";

const SkillContainer: React.FC<{
  level: number;
  img: string;
  title: string;
}> = ({ level, img, title }) => {
  const device = useDevice();

  const levelIndex = level - 1;

  const setClassBasedOnLevel = (desiredLevel: number) =>
    level >= desiredLevel ? skillLevels[desiredLevel - 1].toLowerCase() : "";

  return (
    <div
      className={`skill-container ${device === "mobile" ? "" : "one-fourth"}`}
    >
      <div className="content">
        <img src={img} alt={title} />
        <h3>{title}</h3>
        <div className="skill-level clearfix">
          <div className={`skill-circ one-fifth`}>
            <div className={setClassBasedOnLevel(1)}></div>
          </div>
          <div className={`skill-circ one-fifth`}>
            <div className={setClassBasedOnLevel(2)}></div>
          </div>
          <div className={`skill-circ one-fifth`}>
            <div className={setClassBasedOnLevel(3)}></div>
          </div>
          <div className={`skill-circ one-fifth`}>
            <div className={setClassBasedOnLevel(4)}></div>
          </div>
          <div className={`skill-circ one-fifth`}>
            <div className={setClassBasedOnLevel(5)}></div>
          </div>
        </div>
        <span
          className={
            "skill-level-text " + skillLevels[levelIndex].toLowerCase()
          }
          style={{ background: "none" }}
        >
          {skillLevels[levelIndex]}
        </span>
      </div>
    </div>
  );
};

export default SkillContainer;
