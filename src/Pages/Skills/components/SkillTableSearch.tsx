import React, { ReactElement, FormEvent } from "react";
import { useSkillContextDispatch, useSkillContext } from "./SkillContext";
import { ReactComponent as SearchSvg } from "../../../assets/icons/search.svg";
import { ReactComponent as CloseSvg } from "../../../assets/icons/close.svg";
import { AnimationParent } from "../../../components/General/AnimationParent";

export const SkillTableSearch = (): ReactElement => {
  const { searchSkills, clearSearch } = useSkillContextDispatch();
  const { query } = useSkillContext();

  const handleChange = (e: FormEvent<HTMLInputElement>) =>
    searchSkills(e.currentTarget.value);

  return (
    <div id="skill_table_search">
      <AnimationParent
        isVisible={query === ""}
        className="search-icon-container"
      >
        <SearchSvg className="search-icon" />
      </AnimationParent>

      <AnimationParent
        isVisible={query !== ""}
        className="close-icon-container"
      >
        <button onClick={clearSearch} className="normalize-btn close-btn">
          <CloseSvg className="close-icon" />
        </button>
      </AnimationParent>

      <input
        type="text"
        placeholder="Search Skills"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SkillTableSearch;
