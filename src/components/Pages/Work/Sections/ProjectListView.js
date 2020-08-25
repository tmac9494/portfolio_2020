import React from 'react';

const ProjectListView = props => {
  return(
    <React.Fragment>
      <div id='projects_header' className='clearfix'>
        {props.headerTitle && <h2 className='section-title f-right' style={{margin: 0}}>{props.headerTitle}</h2>}
      </div>
      <div id='projects_content' onWheel={e => e.stopPropagation()} className='custom-scrollbar scrollable no-bg clearfix'>
        {props.projects.map((data, i) =>
          <div key={data.title} className='work-block one-fourth' onClick={props.setExpanded ? () => props.setExpanded(i) : null}>
            <div className='block-content'>
              <div className='image-container relative'>
                <img className='abs-center' src={data.image} alt={data.title} />
                {data.type && <span className='type-tag'>{data.type}</span>}
              </div>
              <div className='content'>
                <h4>{data.title}</h4>
                <p className='custom-scrollbar' onWheel={e => {
                    e.stopPropagation()
                  }}>{data.brief_description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default ProjectListView;
