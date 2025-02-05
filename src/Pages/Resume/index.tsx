import React, { ReactElement, useState, useEffect } from "react";
import "./styles.scss";
import { Jobs, Education, Intro } from "./Sections";
import { ResumeData, Skill } from "../../utils";

const Resume = (): ReactElement => {
  const [data, setData] = useState<ResumeData | null | false>(null);
  const [skills, setSkills] = useState<Skill[] | null | false>(null);

  useEffect(() => {
    fetch("/data/resume-data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(res?.body);
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => {
        console.error(err);
        setData(false);
      });
  }, []);

  useEffect(() => {
    fetch("/data/skills-data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(res?.body);
        return res.json();
      })
      .then((data) => setSkills(data))
      .catch((err) => {
        console.error(err);
        setSkills(false);
      });
  }, [setSkills]);

  return (
    <div id="resume_page">
      <Intro />
      {data && skills && (
        <>
          <Jobs data={data.jobs} skills={skills} />
          <Education data={data.education} />
        </>
      )}
    </div>
  );
};

export default Resume;
