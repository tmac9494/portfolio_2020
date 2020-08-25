import React from 'react';
import cssImg from '../../../../assets/css.png';
import htmlImg from '../../../../assets/html.png';
import jsImg from '../../../../assets/javascript.png';
import jqImg from '../../../../assets/jquery.png';
import phpImg from '../../../../assets/php.png';
import SkillContainer from './SkillContainer';

const Languages = props => {
  return(
    <section className='section-container'>
      <h2 className='section-title tl'>My Languages</h2>
      <div id='skills_wrapper' className='clearfix abs-center'>
        <SkillContainer
          title='HTML'
          img={htmlImg}
          level={5}
        />
        <SkillContainer
          title='CSS'
          img={cssImg}
          level={5}
        />
        <SkillContainer
          title='JavaScript'
          img={jsImg}
          level={5}
        />
        <SkillContainer
          title='Jquery'
          img={jqImg}
          level={5}
        />
        <SkillContainer
          title='PHP'
          img={phpImg}
          level={3}
        />
      </div>
    </section>
  )
}

export default Languages;
