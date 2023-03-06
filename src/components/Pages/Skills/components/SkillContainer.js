import React from 'react';
import { ReactComponent as StarIcon } from '../../../../assets/icons/star.svg';
import { useSkillContextDispatch } from './SkillContext';
import { SkillBar } from './SkillBar';
import { conditionClass } from '../../../../utils';

const SkillContainer = props => {

  const { setSkillDescription } = useSkillContextDispatch();

  const isSpecialty = props?.tags?.includes('star');

  return(
    <div className='skill-container-alt'>
      <div 
        className={'content' + conditionClass(props.isSelected, 'active')}
        onClick={() => setSkillDescription(props.title)}
      >
        <h3>{props.title}</h3>
        {isSpecialty &&
          <div className='skill-star'>
            <StarIcon 
              className='skill-star-icon'
            />
          </div>
        }
        <div className={'skill-level-badge'}>
          <img src={props.img} alt={props.title} />
        </div>

        <SkillBar level={props.level} />
      
      </div>
    </div>
  )
}

export default SkillContainer;