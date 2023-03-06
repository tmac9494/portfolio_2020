import React from 'react';

export const SkillBar = ({
    level,
}) => {

    const skillLevels = ['Beginner', 'Familiar', 'Intermediate', 'Skilled', 'Mastered'];
    const setClassBasedOnLevel = desiredLevel => level >= desiredLevel ? skillLevels[desiredLevel - 1].toLowerCase() : '';
    const levelTitle = skillLevels[level - 1];
    
    return(
        <div className={'skill-level-stat'}>
          <div className='skill-level clearfix'>
            <div className={`skill-circ-alt one-fifth`}>
              <div className={setClassBasedOnLevel(1)}></div>
            </div>
            <div className={`skill-circ-alt one-fifth`}>
              <div className={setClassBasedOnLevel(2)}></div>
            </div>
            <div className={`skill-circ-alt one-fifth`}>
              <div className={setClassBasedOnLevel(3)}></div>
            </div>
            <div className={`skill-circ-alt one-fifth`}>
              <div className={setClassBasedOnLevel(4)}></div>
            </div>
            <div className={`skill-circ-alt one-fifth`}>
              <div className={setClassBasedOnLevel(5)}></div>
            </div>
          </div>
          <span className={'skill-level-text ' + (levelTitle?.toLowerCase())} style={{background: 'none'}}>{levelTitle}</span>
        </div>
    )
}