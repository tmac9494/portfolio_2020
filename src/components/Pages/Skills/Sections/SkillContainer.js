import React, {useCallback, useState} from 'react';
import { useDevice, CompanyIcon } from '../../../General';

const SkillContainer = props => {
  const device = useDevice();

  const [circHeight, setCircHeight] = useState(null);

  const skillLevels = ['Beginner', 'Familiar', 'Intermediate', 'Skilled', 'Mastered'];

  const handleMeasure = useCallback(node => {
    if (node && !circHeight) setCircHeight(node.clientWidth);
  }, [circHeight, setCircHeight])

  const circInlineStyle = {height: circHeight / 2 + 'px'};

  const setClassBasedOnLevel = desiredLevel => props.level >= desiredLevel ? skillLevels[desiredLevel - 1].toLowerCase() : '';
  const levelIndex = props.level - 1;

  return(
    <div className={`skill-container ${device === 'mobile' ? '' : 'one-fourth'}`}>
      <div className='content'>
        <img src={props.img} alt={props.title} />
        <h3>{props.title}</h3>
        <div className='skill-level clearfix'>
          <div className={`skill-circ one-fifth`}>
            <div className={setClassBasedOnLevel(1)} style={circInlineStyle} ref={handleMeasure}></div>
          </div>
          <div className={`skill-circ one-fifth`}>
            <div className={setClassBasedOnLevel(2)} style={circInlineStyle}></div>
          </div>
          <div className={`skill-circ one-fifth`}>
            <div className={setClassBasedOnLevel(3)} style={circInlineStyle}></div>
          </div>
          <div className={`skill-circ one-fifth`}>
            <div className={setClassBasedOnLevel(4)} style={circInlineStyle}></div>
          </div>
          <div className={`skill-circ one-fifth`}>
            <div className={setClassBasedOnLevel(5)} style={circInlineStyle}></div>
          </div>
        </div>
        <span className={'skill-level-text ' + (skillLevels[levelIndex].toLowerCase())} style={{background: 'none'}}>{skillLevels[levelIndex]}</span>
      </div>
    </div>
  )
}

export default SkillContainer;