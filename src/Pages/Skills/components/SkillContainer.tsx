import React from "react";
import { ReactComponent as StarIcon } from "../../../assets/icons/star.svg";
import { useSkillContextDispatch } from "./SkillContext";
import { SkillBar } from "./SkillBar";
import { conditionClass, Skill, skillImages, SkillTags } from "../../../utils";

interface SkillContainerProps extends Skill {
  isSelected: boolean;
}

const SkillContainer = (props: SkillContainerProps) => {
  const { setSkillDescription } = useSkillContextDispatch();

  const isSpecialty = props.tags.includes(SkillTags.Star);

  return (
    <div className="skill-container-alt">
      <div
        className={"content" + conditionClass(props.isSelected, "active")}
        onClick={() => setSkillDescription(props.id)}
      >
        <h3>{props.title}</h3>
        {isSpecialty && (
          <div className="skill-star">
            <StarIcon className="skill-star-icon" />
          </div>
        )}
        <div className={"skill-level-badge"}>
          <img
            src={skillImages[props.id].img}
            alt={skillImages[props.id].name}
          />
        </div>

        <SkillBar level={props.level} />
      </div>
    </div>
  );
};

export default SkillContainer;
