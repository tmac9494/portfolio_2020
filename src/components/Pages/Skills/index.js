import React from 'react';
import './styles.scss';
import {Intro, Languages, Technology, FrameWorks} from './Sections';


const Skills = props => {
  return(
    <div id='skills_page'>
      <Intro />
      <Languages />
      <Technology />
      <FrameWorks />
    </div>
  )
}


export default Skills;
