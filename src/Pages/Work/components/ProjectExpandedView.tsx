import React, { useEffect } from "react";
import { FancyButton } from "../../../components/General";
import { ReactComponent as LeftArrow } from "../../../assets/icons/arrow-back.svg";
import { ReactComponent as RightArrow } from "../../../assets/icons/arrow-forward.svg";
import { WorkInstance } from "../../../utils";

export const ProjectExpandedView: React.FC<{
  projects: WorkInstance[];
  expanded: number;
  setExpanded: (value: number | null) => void;
}> = ({ projects, expanded, setExpanded }) => {
  const expandedData = projects[expanded];

  const handleBack = () => (expanded !== 0 ? setExpanded(expanded - 1) : null);

  const handleNext = () =>
    expanded + 1 <= projects.length - 1 ? setExpanded(expanded + 1) : null;

  const handleSidebarSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    setExpanded(index);
  };

  useEffect(() => {
    document.body.classList.add("stop-scrolling");

    return () => {
      document.body.classList.remove("stop-scrolling");
    };
  }, []);

  return (
    <div id="expanded_view_container" onWheel={(e) => e.stopPropagation()}>
      <div id="expanded_sidebar">
        {/* sidebar controls in header */}
        <div className="sidebar-header">
          <FancyButton
            onClick={() => setExpanded(null)}
            hoverBackground="#eee"
            activeBackground="#dedede"
            className="goBack-btn"
          >
            <LeftArrow className="svg-outline dark" />
            <span>Back</span>
          </FancyButton>
          <div className="f-right">
            <FancyButton
              className="arrow-btn"
              onClick={handleBack}
              hoverBackground="#eee"
              activeBackground="#dedede"
            >
              <LeftArrow className="svg-outline dark" />
            </FancyButton>
            <FancyButton
              className="arrow-btn"
              onClick={handleNext}
              hoverBackground="#eee"
              activeBackground="#dedede"
            >
              <RightArrow className="svg-outline dark" />
            </FancyButton>
          </div>
        </div>
        {/* sidebar list content */}
        <div className="sidebar-list custom-scrollbar scrollable">
          {projects.map((proj, i) => (
            <button
              onClick={(e) => handleSidebarSelect(e, i)}
              className={
                "sidebar-list-item" + (expanded === i ? " active" : "")
              }
              key={proj.title}
            >
              <img src={proj.image} alt={proj.title} className="gen-img" />
              <h4>{proj.title}</h4>
            </button>
          ))}
        </div>
      </div>
      {/* Main content */}
      <div id="expanded_content">
        <div className="header">
          <div className="inner-content relative">
            <img
              className="abs-center gen-img"
              src={expandedData.image}
              alt={expandedData.title}
            />
          </div>
        </div>
        <div className="content">
          <div className="inner-content custom-scrollbar white-scrollbar">
            <h4>{expandedData.title}</h4>
            <p className="description">{expandedData.brief_description}</p>
            <ul className="description-list">
              <li className="description-list-item">
                <b>My Role:</b> <span>{expandedData.role}</span>
              </li>
              <li className="description-list-item">
                <b>Technologies Used:</b>{" "}
                <span>{expandedData.tech.join(", ")}</span>
              </li>
              <li className="description-list-item">
                <b>Company:</b> <span>{expandedData.company}</span>
              </li>
              <li className="description-list-item">
                <b>Software Type:</b> <span>{expandedData.type}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
