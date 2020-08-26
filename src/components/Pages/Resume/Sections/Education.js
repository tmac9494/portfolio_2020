import React from 'react';

const Education = props => {
  return(
    <section className='section-container' style={{transform: 'translateY(100vh)'}}>
      <div onWheel={e => e.stopPropagation()} className='abs-center content-wrap scrollable custom-scrollbar white-scrollbar'>
        {props.data.map(data =>
          <div className='resume-content' key={data.title}>
            <div className='header'>
                <h2>{data.title}</h2>
                <span className='head-text'>{data.issuer}</span>
                <span className='head-text'>{data.type}</span>
                <span className='head-text'>{data.startDate} - {data.endDate}</span>
            </div>
            {data.url &&
              <a href={data.url}>View Certificate</a>
            }
          </div>
        )}
      </div>
    </section>
  );
}

export default Education;
