import React from 'react';
import './styles.scss';
import {Jobs, Education} from './Sections';


const Resume = props => {
  return(
    <div id='resume_page'>
      <Jobs />
      <Education />
    </div>
  )
}


export default Resume;
