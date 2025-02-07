import React from "react";
import scrollHandler from "../../scrollPropagationHandler";
import { Employer, Skill } from "../../../utils";
import { OriginalJobCard, PdfContainer } from "../components";

const Jobs = (props: { data: Employer[]; skills: Skill[] }) => {
  return (
    <>
      <div className="margin-bottom-5">
        <PdfContainer skills={props.skills} jobs={props.data} />
      </div>
      <section className="section-container">
        <div
          onWheel={(e) => scrollHandler(e, "resume_container")}
          id="resume_container"
          className="resume-content-wrap scrollable custom-scrollbar white-scrollbar"
        >
          {props.data.map((data: Employer) => (
            <OriginalJobCard data={data} skills={props.skills} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Jobs;
