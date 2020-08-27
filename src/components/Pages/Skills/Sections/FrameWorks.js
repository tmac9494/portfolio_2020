import React from 'react';
import sassImg from '../../../../assets/sass.png';
import reactImg from '../../../../assets/logo192.png';
import reduxImg from '../../../../assets/redux.svg';
import angImg from '../../../../assets/angular.png';
import nodeImg from '../../../../assets/nodejs.png';
import threeImg from '../../../../assets/3js.png';
import SkillContainer from './SkillContainer';
import scrollHandler from '../../scrollPropagationHandler';

const FrameWorks = props => {
  return(
    <section className='section-container' style={{transform: 'translateY(0)'}}>
      <h2 className='section-title tl'>My Frameworks</h2>
      <div onWheel={e => scrollHandler(e, 'skills_wrapper')} id='skills_wrapper' className='clearfix abs-center scrollable custom-scrollbar content-wrap'>
        <SkillContainer
          title='React'
          img={reactImg}
          level={5}
        />
        <SkillContainer
          title='Node JS'
          img={nodeImg}
          level={5}
        />
        <SkillContainer
          title='Redux'
          img={reduxImg}
          level={4}
        />
        <SkillContainer
          title='Three JS'
          img={threeImg}
          level={4}
        />
        <SkillContainer
          title='Sass'
          img={sassImg}
          level={5}
        />
        <SkillContainer
          title='Angular'
          img={angImg}
          level={2}
        />
      </div>
    </section>
  )
}

export default FrameWorks;
