import React from "react";
import { SkillSorts, SkillTags } from "../../../../../utils";
import {
  useSkillContext,
  useSkillContextDispatch,
} from "../../components/SkillContext";
import { SkillTableSearch } from "../../components/SkillTableSearch";
import { SkillTableModifier } from "../../components/SkillTabModifier";

export const SkillToolbar = () => {
  const { sort, filters } = useSkillContext();
  const { handleFilter, handleSort } = useSkillContextDispatch();

  const currentSortValue = sort ? sort : "None";

  return (
    <div id="skill-toolbar">
      <SkillTableModifier
        title="Filter:"
        options={[
          {
            text: "Frontend",
            onClick: handleFilter,
            value: SkillTags.Frontend,
          },
          {
            text: "Backend",
            onClick: handleFilter,
            value: SkillTags.Backend,
          },
          {
            text: "Languages",
            onClick: handleFilter,
            value: SkillTags.Language,
          },
          {
            text: "Libraries",
            onClick: handleFilter,
            value: SkillTags.Libraries,
          },
          {
            text: "Frameworks",
            onClick: handleFilter,
            value: SkillTags.Frameworks,
          },
          {
            text: "CMS Systems",
            onClick: handleFilter,
            value: SkillTags.CMS,
          },
        ]}
        value={""}
        isCheckbox={true}
        filters={filters}
      />
      <SkillTableModifier
        title="Sort:"
        options={[
          {
            text: "A to Z",
            onClick: handleSort,
            value: SkillSorts.AtoZ,
          },
          {
            text: "Best to Worst",
            onClick: handleSort,
            value: SkillSorts.BestToWorst,
          },
          {
            text: "Worst to Best",
            onClick: handleSort,
            value: SkillSorts.WorstToBest,
          },
        ]}
        value={currentSortValue}
      />
      <SkillTableSearch />
    </div>
  );
};
