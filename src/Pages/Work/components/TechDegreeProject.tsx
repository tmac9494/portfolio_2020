import React from "react";
import { ProjectListTypes, TechDegreeProjectInstance } from "../../../utils";
import { ProjectCard } from "./ProjectCard";

export const TechDegreeProject: React.FC<{
  project: TechDegreeProjectInstance;
  className?: string;
  index: number;
}> = ({ project, className, index }) => {
  return (
    <a
      href={project.url}
      className={className}
      target="_blank"
      rel="noreferrer"
    >
      <ProjectCard
        type={ProjectListTypes.Techdegree}
        project={project}
        index={index}
      />
    </a>
  );
};
