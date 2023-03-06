import React from 'react';

import SkillContainer from '../../components/SkillContainer';
import { useSkillContext } from '../../components/SkillContext';

export const Skills = props => {

  const { 
    skillsList, 
    skillDescription, 
    skillDescriptionVisibility
  } = useSkillContext();

  return skillsList.map((val, i) => 
    <SkillContainer
      key={val.title}
      isSelected={
        val.title === skillDescription 
        && skillDescriptionVisibility
      }
      {...val}  
    />
  )
}
