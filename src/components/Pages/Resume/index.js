import React from 'react';
import './styles.scss';
import {Jobs, Education, Intro} from './Sections';
import { resumeData } from '../../../utils';


const Resume = props => {
  return(
    <div id='resume_page'>
      <Intro />
      <Jobs data={resumeData.jobs} />
      <Education data={resumeData.education} />
    </div>
  )
}


export default Resume;
