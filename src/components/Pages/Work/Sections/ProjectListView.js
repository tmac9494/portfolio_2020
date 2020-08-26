import React from 'react';
import ImageFill from './ImageFill';
import {useDevice} from '../../../General';

const ProjectListView = props => {

  const device = useDevice();

  return(
    <React.Fragment>
      <div id='projects_header'>
        {props.headerTitle && <h2 className='section-title f-right' style={{margin: 0}}>{props.headerTitle}</h2>}
      </div>
      <div id='projects_content' onWheel={e => e.stopPropagation()} className='custom-scrollbar scrollable no-bg clearfix'>
        {props.projects.map((data, i) =>
          React.createElement(
            props.type === 'techdegree' ? 'a' : 'div',
            {
              key: data.title,
              className:`work-block ${device !== 'mobile' ? 'one-fourth' : ''}`,
              onClick: props.type !== 'techdegree' ? () => props.setExpanded(i) : null,
              href: props.type === 'techdegree' ? data.url : null
            },
            <React.Fragment>
              <div className='block-content'>
                <div className='image-container relative'>
                  <ImageFill
                    image={data.image}
                    alt={data.title}
                  >
                  {data.type && <span className='type-tag'>{data.type}</span>}
                  </ImageFill>
                </div>
                <div className='content'>
                  <h4>{data.title}</h4>
                  <p className='custom-scrollbar' onWheel={e => {
                      e.stopPropagation()
                    }}>{data.brief_description}</p>
                </div>
              </div>
            </React.Fragment>
          )
        )}
      </div>
    </React.Fragment>
  )
}

export default ProjectListView;
