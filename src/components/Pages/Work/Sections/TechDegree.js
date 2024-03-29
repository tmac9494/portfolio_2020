import React from 'react';
import ProjectListView from './ProjectListView';
import workInfo from './workData';

const TechDegree = props => {
  const {techdegree} = workInfo;
  return(
    <section className='section-container'>
      <ProjectListView
        headerTitle='Techdegree Projects'
        projects={techdegree}
        type='techdegree'
      />
    </section>
  )
}

export default TechDegree;
