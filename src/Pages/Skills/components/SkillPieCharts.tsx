import React from "react";

import { handleSkillFilter, Skill, SkillTags } from "../../../utils";
import { PieChart } from "../../../components/General/PieChart";
import "./styles/SkillPieCharts.scss";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

const getBackendSkillsData = (skills: Skill[]) => {
  return skills.filter((skill) =>
    handleSkillFilter(skill, [SkillTags.Backend])
  );
};

const getFrontendSkillsData = (skills: Skill[]) => {
  return skills.filter((skill) =>
    handleSkillFilter(skill, [SkillTags.Frontend])
  );
};

export const SkillPieCharts = ({ skills }: { skills?: Skill[] | null }) => {
  if (!skills) return null;

  const frontendSkills = skills && getFrontendSkillsData(skills);
  const backendSkills = skills && getBackendSkillsData(skills);

  const getSkillValue = (data: Skill) => data.yearsOfExp;
  const getSkillColor = (data: Skill) => data.skillColor;
  const getSkillLabel = (data: Skill) => data.title;
  const chartTextcolor = "#fff";
  const chartMargin = {
    left: 8,
    right: 8,
  };

  return (
    <div id="skill_pie_charts" className="site-content-wrap">
      <ParentSize
        className="skill-pie-chart-wrap"
        style={{
          width: "100%",
          height: "440px",
        }}
        debounceTime={10}
      >
        {({ width: visWidth, height: visHeight }) => (
          <>
            <PieChart<Skill>
              width={visWidth / 3}
              height={visHeight}
              data={skills}
              getId={(data) => data.id}
              getLabel={(data) => getSkillLabel(data.data)}
              getValue={getSkillValue}
              getColor={getSkillColor}
              title="All Skills"
              textColor={chartTextcolor}
              className="skill-pie-chart"
              margin={chartMargin}
            />
            <PieChart<Skill>
              width={visWidth / 3}
              height={visHeight}
              data={frontendSkills}
              getId={(data) => data.id}
              getLabel={(data) => getSkillLabel(data.data)}
              getValue={getSkillValue}
              getColor={getSkillColor}
              title="Frontend Skills"
              textColor={chartTextcolor}
              className="skill-pie-chart"
              margin={chartMargin}
            />
            <PieChart<Skill>
              width={visWidth / 3}
              height={visHeight}
              data={backendSkills}
              getId={(data) => data.id}
              getLabel={(data) => getSkillLabel(data.data)}
              getValue={getSkillValue}
              getColor={getSkillColor}
              title="Backend Skills"
              textColor={chartTextcolor}
              className="skill-pie-chart"
              margin={chartMargin}
            />
          </>
        )}
      </ParentSize>
      <div className="skill-pie-footnote text-center">
        <span className="text-white">
          Visualization based on years of experience.
        </span>
      </div>
    </div>
  );
};
