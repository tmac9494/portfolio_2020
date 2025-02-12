import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Intro, ExperimentalSection } from "./Sections";
import { SkillContextProvider } from "./components/SkillContext";
import { handleSkillFilter, Skill, skillImages, SkillTags } from "../../utils";
import { mockPieChartData, PieChart } from "../../components/General/PieChart";
import { SkillPieCharts } from "./components";

const Skills = () => {
  const [data, setData] = useState<Skill[] | null | false>(null);

  useEffect(() => {
    fetch("/data/skills-data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => {
        console.error(err);
        setData(false);
      });
  }, [setData]);

  return (
    <div id="skills_page">
      <Intro />
      {data && (
        <SkillContextProvider skills={data}>
          <>
            <div
              style={{
                position: "relative",
                zIndex: 10,
                textAlign: "center",
              }}
            >
              <SkillPieCharts skills={data} />
            </div>
            <ExperimentalSection />
          </>
        </SkillContextProvider>
      )}
    </div>
  );
};

export default Skills;
