import React from 'react';
import aiImg from '../../../../assets/illustrator.svg';
import psImg from '../../../../assets/ps.svg';
import xdImg from '../../../../assets/xd.svg';
import mongoImg from '../../../../assets/mongo.png';
import wpImg from '../../../../assets/webpack.svg';
import wordpressImg from '../../../../assets/wordpress.png';
import SkillContainer from './SkillContainer';
import scrollHandler from '../../scrollPropagationHandler';

const Technology = props => {
  return(
    <section className='section-container' style={{transform: 'translateY(250vh)'}}>
      <h2 className='section-title tl'>My Technologies</h2>
      <div onWheel={e => scrollHandler(e, 'tech_wrapper')} id='tech_wrapper' className='clearfix abs-center scrollable custom-scrollbar content-wrap'>
        <SkillContainer
          title='MongoDB'
          img={mongoImg}
          level={4}
        />
        <SkillContainer
          title='Webpack'
          img={wpImg}
          level={3}
        />
        <SkillContainer
          title='Wordpress'
          img={wordpressImg}
          level={5}
        />
        <SkillContainer
          title='Illustrator'
          img={aiImg}
          level={5}
        />
        <SkillContainer
          title='Adobe XD'
          img={xdImg}
          level={5}
        />
        <SkillContainer
          title='Photoshop'
          img={psImg}
          level={4}
        />
      </div>
    </section>
  )
}

export default Technology;
