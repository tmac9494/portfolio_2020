import React from 'react';
import './styles.scss';
import {Intro, Projects} from './Sections';

const Work = props => {
  return(
    <div id='work_page'>
      <Intro />
      <Projects />
    </div>
  )
}


export default Work;
