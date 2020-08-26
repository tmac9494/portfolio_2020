import React from 'react';
import workInfo from './workData';
import ProjectListView from './ProjectListView';
import ProjectExpandedView from './ProjectExpandedView';

const Projects = props => {
  const {projects} = workInfo;
  const [expanded, setExpanded] = React.useState(null);


  return(
    <section className='section-container' style={expanded !== null ? {zIndex: 110} : null}>
        {expanded !== null
          ? <ProjectExpandedView
              expanded={expanded}
              setExpanded={setExpanded}
              projects={projects}
            />
          : <ProjectListView
              setExpanded={setExpanded}
              projects={projects}
              headerTitle='Work Projects'
            />
        }
    </section>
  )
}

export default Projects;
