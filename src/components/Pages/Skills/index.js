import React from 'react';
import './styles.scss';
import {Intro, ExperimentalSection} from './Sections';
import { SkillContextProvider } from './components/SkillContext';

const Skills = props => {
  return(
    <div id='skills_page'>
      <Intro />
      <SkillContextProvider>
        <ExperimentalSection />
      </SkillContextProvider>
    </div>
  )
}


export default Skills;
