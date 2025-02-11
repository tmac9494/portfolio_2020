import React from "react";

import { TechDegreeProject, WorkProject } from ".";
import scrollHandler from "../../scrollPropagationHandler";
import {
  ProjectListTypes,
  TechDegreeProjectInstance,
  WorkInstance,
} from "../../../utils";

export const ProjectListView: React.FC<{
  headerTitle: string;
  type: ProjectListTypes;
  projects: WorkInstance[] | TechDegreeProjectInstance[];
  setExpanded?: (value: number | null) => void;
}> = ({ headerTitle, type, projects, setExpanded }) => {
  const containerClassName = "work-block";

  return (
    <>
      <div id="projects_header">
        {headerTitle && (
          <h2 className="section-title f-right" style={{ margin: 0 }}>
            {headerTitle}
          </h2>
        )}
      </div>
      <div
        id={"projects_content_" + type}
        onWheel={(e) => scrollHandler(e, "projects_content_" + type)}
        key="expanded"
        className="custom-scrollbar scrollable no-bg clearfix"
      >
        {projects.map((data, i) =>
          type === ProjectListTypes.Techdegree ? (
            <TechDegreeProject
              key={data.title}
              index={i}
              project={data as TechDegreeProjectInstance}
              className={containerClassName}
            />
          ) : (
            <WorkProject
              key={data.title}
              index={i}
              project={data as WorkInstance}
              className={containerClassName}
              onClick={() => setExpanded && setExpanded(i)}
            />
          )
        )}
      </div>
    </>
  );
};
