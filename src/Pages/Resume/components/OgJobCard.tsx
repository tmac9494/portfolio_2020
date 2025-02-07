import React from "react";
import {
  companyImages,
  conditionClass,
  Employer,
  Skill,
  skillImages,
} from "../../../utils";
import { IconAccordion, useDevice } from "../../../components/General";

export const OriginalJobCard: React.FC<{
  data: Employer;
  skills: Skill[];
}> = ({ data, skills }) => {
  const device = useDevice();
  return (
    <div
      className="resume-content"
      id={data.company.replace(/\s/g, "")}
      key={data.title}
    >
      <div className="header clearfix">
        <img
          src={companyImages[data.id]?.fullLogo || companyImages[data.id]?.img}
          alt={data.company}
          className={
            "company-logo" +
            conditionClass(device !== "mobile", "f-right") +
            conditionClass(data.logoClass, data.logoClass)
          }
        />
        <div className="f-left">
          <h2>{data.title}</h2>
          <span className="head-text">{data.company}</span>
          <span className="head-text">{data.cityState}</span>
          <span className="head-text">
            {data.startDate} - {data.endDate}
          </span>
          <IconAccordion
            list={skills
              .filter((skill) => skill.companies.includes(data.id))
              .map((skill) => ({
                image: skillImages[skill.id].img,
                title: skillImages[skill.id].name,
              }))}
            width={38}
          />
        </div>
      </div>
      <ul className="resume-bullets">
        {data.bullets.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </ul>
    </div>
  );
};
