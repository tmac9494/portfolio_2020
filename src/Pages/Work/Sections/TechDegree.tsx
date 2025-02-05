import React from "react";

import { ProjectListView } from "../components";
import workInfo from "./workData";
import { ProjectListTypes } from "../../../utils";

const TechDegree = () => {
  const { techdegree } = workInfo;
  return (
    <section className="section-container">
      <ProjectListView
        headerTitle="Techdegree Projects"
        projects={techdegree}
        type={ProjectListTypes.Techdegree}
      />
    </section>
  );
};

export default TechDegree;
