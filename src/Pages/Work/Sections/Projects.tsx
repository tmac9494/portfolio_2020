import React from "react";
import workInfo from "./workData";
import { ProjectListView, ProjectExpandedView } from "../components";
import { ProjectListTypes } from "../../../utils";

const Projects = () => {
  const { projects } = workInfo;
  const [expanded, setExpanded] = React.useState<null | number>(null);

  return (
    <section
      className="section-container"
      style={expanded !== null ? { zIndex: 110 } : undefined}
    >
      {expanded !== null ? (
        <ProjectExpandedView
          expanded={expanded}
          setExpanded={setExpanded}
          projects={projects}
        />
      ) : (
        <ProjectListView
          setExpanded={setExpanded}
          projects={projects}
          headerTitle="Work Projects"
          type={ProjectListTypes.Projects}
        />
      )}
    </section>
  );
};

export default Projects;
