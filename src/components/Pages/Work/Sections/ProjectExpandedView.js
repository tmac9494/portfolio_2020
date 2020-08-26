import React from 'react';
import {FancyButton} from '../../../General';
import {ReactComponent as LeftArrow} from '../../../../assets/icons/arrow-back.svg';
import {ReactComponent as RightArrow} from '../../../../assets/icons/arrow-forward.svg';

const ProjectExpandedView = props => {

  const expandedData = props.projects[props.expanded];

  const handleBack = () => props.expanded !== 0
    ? props.setExpanded(props.expanded - 1) : null;

  const handleNext = () => props.expanded + 1 <= props.projects.length - 1
    ? props.setExpanded(props.expanded + 1) : null;

  const handleSidebarSelect = (e, index) => {
    e.preventDefault();
    props.setExpanded(index);
  }

  return(
    <div id='expanded_view_container' onWheel={e => e.stopPropagation()}>
      <div id='expanded_sidebar'>
        {/* sidebar controls in header */}
        <div className='sidebar-header'>
          <FancyButton
            onClick={() => props.setExpanded(null)}
            hoverBackground='#eee'
            activeBackground='#dedede'
            className='goBack-btn'
          >
            <LeftArrow className='svg-outline dark' />
            <span>Back</span>
          </FancyButton>
          <div className='f-right'>
            <FancyButton
              className='arrow-btn'
              onClick={handleBack}
              hoverBackground='#eee'
              activeBackground='#dedede'
            >
              <LeftArrow className='svg-outline dark' />
            </FancyButton>
            <FancyButton
              className='arrow-btn'
              onClick={handleNext}
              hoverBackground='#eee'
              activeBackground='#dedede'
            >
              <RightArrow className='svg-outline dark' />
            </FancyButton>
          </div>
        </div>
        {/* sidebar list content */}
        <div className='sidebar-list custom-scrollbar scrollable'>
          {props.projects.map((proj, i) => (
            <button
              onClick={e => handleSidebarSelect(e, i)}
              className={'sidebar-list-item' + (props.expanded === i ? ' active' : '')}
              key={proj.title}
            >
              <img src={proj.image} alt={proj.title} className='gen-img' />
              <h4>{proj.title}</h4>
            </button>
          ))}
        </div>
      </div>
      <div id='expanded_content'>
        <div className='header'>
          <div className='inner-content relative'>
          <img className='abs-center gen-img' src={expandedData.image} alt={expandedData.title} />
          </div>
        </div>
        <div className='content'>
          <div className='inner-content custom-scrollbar white-scrollbar'>
          <h4>{expandedData.title}</h4>
          <p className='description'>{expandedData.brief_description}</p>
          <ul className='description-list'>
            <li className='description-list-item'>
              <b>My Role:</b> <span>{expandedData.role}</span>
            </li>
            <li className='description-list-item'>
              <b>Technologies Used:</b> <span>{expandedData.tech.join(', ')}</span>
            </li>
            <li className='description-list-item'>
              <b>Company:</b> <span>{expandedData.company}</span>
            </li>
            <li className='description-list-item'>
              <b>Software Type:</b> <span>{expandedData.type}</span>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectExpandedView;
