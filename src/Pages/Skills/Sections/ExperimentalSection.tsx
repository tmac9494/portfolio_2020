import React from "react";
import scrollHandler from "../../scrollPropagationHandler";
import { SkillToolbar } from "./skillColumns/SkillToolbar";
import { Skills } from "./skillColumns/Skills";
import { SkillDescriptionPanel } from "../components/SkillDescriptionPanel";

export const ExperimentalSection: React.FC = () => {
  return (
    <section className="section-container">
      <h2 className="section-title tl">What can I do?</h2>

      <div
        onWheel={(e) => scrollHandler(e, "skills_table")}
        id="skills_table"
        className="clearfix abs-center content-wrap custom-scrollbar scrollable"
      >
        <SkillToolbar />

        <div className="skill-column">
          <Skills />
        </div>

        <SkillDescriptionPanel />
      </div>
    </section>
  );
};
