import React from 'react';
import './styles.scss';
import {Intro, Projects, TechDegree} from './Sections';

const Work = props => {
  return(
    <div id='work_page'>
      <Intro />
      <Projects />
      <TechDegree />
    </div>
  )
}


export default Work;
