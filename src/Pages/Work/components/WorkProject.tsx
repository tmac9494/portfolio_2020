import React from "react";
import { ProjectListTypes, WorkInstance } from "../../../utils";
import { ProjectCard } from "./ProjectCard";

export const WorkProject: React.FC<{
  project: WorkInstance;
  className?: string;
  onClick: () => void;
  index: number;
}> = ({ project, className, onClick, index }) => {
  return (
    <div onClick={onClick} className={className}>
      <ProjectCard
        project={project}
        index={index}
        type={ProjectListTypes.Projects}
      />
    </div>
  );
};
