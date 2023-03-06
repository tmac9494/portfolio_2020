import React from 'react';
import {useDevice} from '../../../General';
import scrollHandler from '../../scrollPropagationHandler';


const Jobs = props => {

  const device = useDevice();

  return(
    <section className='section-container'>
      <div onWheel={e => scrollHandler(e, 'resume_container')} id='resume_container' className='resume-content-wrap abs-center content-wrap scrollable custom-scrollbar white-scrollbar'>
        {props.data.map(data =>
          <div className='resume-content' id={data.company.replace(/\s/g, '')} key={data.title}>
            <div className='header clearfix'>
              <img src={data.logo} alt={data.company} className={(device !== 'mobile' ? 'f-right ' : '') + (data.logoClass ? data.logoClass : '')} />
              <div className='f-left'>
              <h2>{data.title}</h2>
                <span className='head-text'>{data.company}</span>
                <span className='head-text'>{data.cityState}</span>
                <span className='head-text'>{data.startDate} - {data.endDate}</span>
              </div>
            </div>
            <ul className='resume-bullets'>
              {data.bullets.map((text, i) => (<li key={i}>{text}</li>))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default Jobs;
