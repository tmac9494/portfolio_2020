import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import resumeData from "../public/data/resume-data.json";
import skillsData from "../public/data/skills-data.json";
import { CompanyIds, SkillTags } from "./utils";

describe("app render", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
});

describe("json data validation", () => {
  const companyIds = new Set(Object.values(CompanyIds));

  describe("resume-data.json", () => {
    it("should only use ids that correlate to companyId enum", () => {
      resumeData.jobs.forEach((job) => {
        expect(companyIds.has(job.id as CompanyIds));
      });
    });
  });

  describe("skills-data.json", () => {
    it("should only use tags that correlate to SkillTags enum", () => {
      const skillTags = new Set(Object.values(SkillTags));
      skillsData.forEach((skill) => {
        expect(
          skill.tags.every((tag) => skillTags.has(tag as SkillTags))
        ).toEqual(true);
      });
    });

    it("should only use companies that correlate to companyId enum", () => {
      skillsData.forEach((skill) => {
        expect(
          skill.companies.every((company) =>
            companyIds.has(company as CompanyIds)
          )
        );
      });
    });
  });
});
