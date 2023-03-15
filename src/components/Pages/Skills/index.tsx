import React, { useState, useEffect } from 'react';
import './styles.scss';
import {Intro, ExperimentalSection} from './Sections';
import { SkillContextProvider } from './components/SkillContext';
import { Skill } from '../../../utils';

const Skills = () => {

  const [data, setData] = useState<Skill[] | null | false>(null);

  useEffect(() => {
    fetch('/data/skills-data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(res => {
      console.log(res?.body);
      return res.json();
    })
    .then(data => setData(data))
    .catch(err => {
       console.error(err);
       setData(false); 
    });
  }, [setData]);

  
  return(
    <div id='skills_page'>
      <Intro />
      {data &&<SkillContextProvider 
        skills={data}
      >
        <ExperimentalSection />
      </SkillContextProvider>}
    </div>
  )
}


export default Skills;
