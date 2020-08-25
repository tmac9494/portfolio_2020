import React, {useCallback, useState} from 'react';

const SkillContainer = props => {

  const [circHeight, setCircHeight] = useState(null);

  const levelText = props.level === 2 ? 'Familiar'
    : props.level === 3 ? 'Intermediate'
    : props.level === 4 ? 'Skilled'
    : props.level === 5 ? 'Mastered'
    : 'Beginner';

  const handleMeasure = useCallback(node => {
    if (node && !circHeight) setCircHeight(node.clientWidth);
  }, [circHeight, setCircHeight])

  const circInlineStyle = {height: circHeight + 'px'};

  return(
    <div className='skill-container one-fourth'>
      <div className='content'>
        <img src={props.img} alt={props.title} />
        <h3>{props.title}</h3>
        <div className='skill-level clearfix'>
          <div className={'skill-circ one-fifth'}>
            <div className={props.level >= 1 ? 'beginner' : ''} style={circInlineStyle} ref={handleMeasure}></div>
          </div>
          <div className={'skill-circ one-fifth'}>
            <div className={props.level >= 2 ? 'familiar' : ''} style={circInlineStyle}></div>
          </div>
          <div className={'skill-circ one-fifth'}>
            <div className={props.level >= 3 ? 'intermediate' : ''} style={circInlineStyle}></div>
          </div>
          <div className={'skill-circ one-fifth'}>
            <div className={props.level >= 4 ? 'skilled' : ''} style={circInlineStyle}></div>
          </div>
          <div className={'skill-circ one-fifth'}>
            <div className={props.level >= 5 ? 'mastered' : ''} style={circInlineStyle}></div>
          </div>
        </div>
        <span className={'skill-level-text ' + (levelText.toLowerCase())} style={{background: 'none'}}>{levelText}</span>
      </div>
    </div>
  )
}

export default SkillContainer;
