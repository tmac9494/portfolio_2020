import React from "react";

import { ImageFill } from ".";
import { useDevice } from "../../../components/General";
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
  const device = useDevice();

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
          React.createElement(
            type === "techdegree" ? "a" : "div",
            {
              key: data.title,
              className: `work-block ${
                device !== "mobile" ? "one-fourth" : ""
              }`,
              onClick:
                type !== "techdegree"
                  ? () => setExpanded && setExpanded(i)
                  : null,
              href:
                type === "techdegree"
                  ? (data as TechDegreeProjectInstance).url
                  : null,
              target: type === "techdegree" ? "_blank" : undefined,
            },
            <>
              <div className="block-content">
                <div className="image-container relative">
                  <ImageFill image={data.image} alt={data.title}>
                    {(data as WorkInstance).type && (
                      <span className="type-tag">
                        {(data as WorkInstance).type}
                      </span>
                    )}
                  </ImageFill>
                </div>
                <div className="content">
                  <h4>{data.title}</h4>
                  <p
                    className="custom-scrollbar"
                    id={"projects_content_item_" + type + i}
                    onWheel={(e) =>
                      scrollHandler(e, "projects_content_item_" + type + i)
                    }
                  >
                    {data.brief_description}
                  </p>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};
