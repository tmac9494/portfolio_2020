import React, { useState } from "react";
import scrollHandler from "../../scrollPropagationHandler";
import { Employer, Skill } from "../../../utils";
import { OriginalJobCard, PdfContainer } from "../components";
import { PillTabs } from "../../../components/General/PillTabs";
import { usePDF } from "@react-pdf/renderer";
import { Loader } from "../../../components/General";

enum ResumeViewType {
  PDF = "pdf",
  React = "react",
}

const Jobs = (props: { data: Employer[]; skills: Skill[] }) => {
  const [viewType, setViewType] = useState<ResumeViewType>(ResumeViewType.PDF);
  const [instance] = usePDF({
    document: <PdfContainer skills={props.skills} jobs={props.data} />,
  });

  const isLoading = instance.loading;

  return (
    <>
      <div
        className="margin-bottom-5 text-center"
        style={{ position: "relative", zIndex: 10 }}
      >
        <PillTabs<ResumeViewType>
          active={viewType}
          onClick={setViewType}
          tabs={[
            {
              id: ResumeViewType.PDF,
              text: "Static PDF",
            },
            {
              id: ResumeViewType.React,
              text: "Interactive React",
            },
          ]}
        />
      </div>

      {viewType === ResumeViewType.PDF &&
        (isLoading ? (
          <div
            style={{
              position: "relative",
              zIndex: 10,
            }}
          >
            <Loader>Generating PDF</Loader>
          </div>
        ) : (
          <div
            id="pdf_result_container"
            className="margin-bottom-5"
            style={{
              position: "relative",
              zIndex: 10,
            }}
          >
            <div className="site-content-wrap text-center">
              <a
                className="btn download-btn"
                href={instance.url ?? undefined}
                download="Trent-McDole.pdf"
              >
                Download PDF Resume
              </a>

              <iframe
                title="Resume"
                src={instance.url ?? undefined}
                style={{
                  width: "100%",
                  height: "100vh",
                }}
              />
            </div>
          </div>
        ))}

      {viewType === ResumeViewType.React && (
        <section className="section-container">
          <div
            onWheel={(e) => scrollHandler(e, "resume_container")}
            id="resume_container"
            className="resume-content-wrap scrollable custom-scrollbar white-scrollbar"
          >
            {props.data.map((data: Employer) => (
              <OriginalJobCard
                key={data.id}
                data={data}
                skills={props.skills}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
