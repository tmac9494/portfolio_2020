import React from 'react';

const ProjectExpandedView = props => {

  const expandedData = props.projects[props.expanded];

  return(
    <div id='expanded_view_container' onWheel={e => e.stopPropagation()}>
      <div id='expanded_sidebar'>
        <div className='sidebar-header'>
          <button onClick={() => props.setExpanded(null)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-a</title><polyline points="244 400 100 256 244 112" className='svg-outline dark'/><line x1="120" y1="256" x2="412" y2="256" className='svg-outline dark'/></svg>
            <span>Back</span>
          </button>
        </div>
      </div>
      <div id='expanded_content'>
        <div className='header'>
          <div className='inner-content relative'>
          <img className='abs-center' src={expandedData.image} alt={expandedData.title} />
          </div>
        </div>
        <div className='content'>
          <div className='inner-content custom-scrollbar'>
          <h4>{expandedData.title}</h4>
          <p>{expandedData.brief_description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectExpandedView;
