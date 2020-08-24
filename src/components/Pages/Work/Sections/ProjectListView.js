import React from 'react';

const ProjectListView = props => {
  return(
    <React.Fragment>
      <div id='projects_header'>

      </div>
      <div id='projects_content' className='scrollable no-bg clearfix'>
        {props.projects.map((data, i) =>
          <div key={data.title} className='work-block one-fourth' onClick={() => props.setExpanded(i)}>
            <div className='block-content'>
              <div className='image-container relative'>
                <img className='abs-center' src={data.image} alt={data.title} />
                <span className='type-tag'>Website</span>
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
