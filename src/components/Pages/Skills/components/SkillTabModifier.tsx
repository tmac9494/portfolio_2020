import React, { useEffect, useState } from "react";
import { ReactComponent as FilterSvg } from "../../../../assets/icons/filter.svg";
import { AnimationParent } from "../../../General/AnimationParent";
import { SkillSorts, SkillTags, conditionClass } from "../../../../utils";

export type SkillTabModifierOption = {
  text: string;
  onClick: (sort: SkillSorts) => void;
  value: SkillSorts | SkillTags;
};

export const SkillTableModifier: React.FC<{
  isCheckbox?: boolean;
  value: string;
  options: SkillTabModifierOption[];
  title: string;
  filters?: SkillTags[];
}> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isCheckbox, value, options, title, filters } = props;
  const sortText =
    !isCheckbox && options.filter((val) => val.value === value)[0]?.text;

  useEffect(() => {
    setIsOpen(false);
  }, [value]);

  const titleElement = isCheckbox ? (
    <button
      className={"filter-btn normalize-btn" + (isOpen ? " active" : "")}
      onClick={() => setIsOpen(!isOpen)}
    >
      {filters && filters.length > 0 && (
        <span className="skill-filter-count">{filters.length}</span>
      )}
      <FilterSvg className="filter-svg" />
    </button>
  ) : (
    <div className="skill-control-title">
      <span>{title}</span>
    </div>
  );

  return (
    <div className="skill-table-control">
      {titleElement}

      {!isCheckbox && (
        <div className="skill-control-value-container">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={"skill-control-value" + conditionClass(isOpen, "active")}
          >
            <span>{sortText || "None"}</span>
          </button>
        </div>
      )}

      <AnimationParent
        className="skill-control-options"
        attributes={{
          onMouseLeave: () => setIsOpen(false),
          style: {
            right: isCheckbox ? "auto" : 0,
            left: isCheckbox ? 0 : "auto",
          },
        }}
        isVisible={isOpen}
      >
        {options.map((val, i) => {
          const isActive =
            isCheckbox && filters && filters.includes(val.value as SkillTags);
          return (
            <button
              key={val.text}
              onClick={() => val.onClick(val.value as SkillSorts)}
              className={
                "skill-control-option" + conditionClass(isActive, "active")
              }
            >
              <span>{val.text}</span>
            </button>
          );
        })}
      </AnimationParent>
    </div>
  );
};
