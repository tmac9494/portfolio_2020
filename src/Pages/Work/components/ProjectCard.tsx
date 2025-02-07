import React from "react";

import {
  ProjectListTypes,
  TechDegreeProjectInstance,
  WorkInstance,
} from "../../../utils";
import { ImageFill } from "./ImageFill";
import scrollHandler from "../../scrollPropagationHandler";

export const ProjectCard: React.FC<{
  project: TechDegreeProjectInstance | WorkInstance;
  type: ProjectListTypes;
  index: number;
}> = ({ project, type, index }) => {
  return (
    <>
      <div className="block-content">
        <div className="image-container relative">
          <ImageFill image={project.image} alt={project.title}>
            {(project as WorkInstance).type && (
              <span className="type-tag">{(project as WorkInstance).type}</span>
            )}
          </ImageFill>
        </div>
        <div className="content">
          <h4>{project.title}</h4>
          <p
            className="custom-scrollbar"
            id={"projects_content_item_" + type + index}
            onWheel={(e) =>
              scrollHandler(e, "projects_content_item_" + type + index)
            }
          >
            {project.brief_description}
          </p>
        </div>
      </div>
    </>
  );
};
