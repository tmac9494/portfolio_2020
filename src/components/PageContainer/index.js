import React, {useEffect } from 'react';
import './styles.scss';
import {Route, useLocation} from 'react-router-dom';
import pageSettings from './pageSettings';
import Home from '../Pages/Home';
import Work from '../Pages/Work';
import Contact from '../Pages/Contact';
import Skills from '../Pages/Skills';
import Resume from '../Pages/Resume';
import { FloatingSvgs } from './FloatingSvgs';


const PageContainer = props => {

  // page settings
  const location = useLocation();
  const currentPage = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');
  const currentSettings = pageSettings[currentPage];
  const {total, color, svgs} = currentSettings;
  const gradient = 'linear-gradient(70deg, ' + color + ')';

  // // circle nav
  const scrollStateScrollValue = 0;
  let sectionCircs = [];
  for(let i = 0;i < total;i++) {sectionCircs.push(
    <div
      className={'section-circle light ' + (scrollStateScrollValue === i ? ' active' : '')}
      style={{borderColor: currentSettings.floatingColor || '#fff'}}
      key={currentPage + i}
      onClick={() => window.scrollTo({ top: window.innerHeight * i, behavior: 'smooth'})
        // () => handleIndexChange(i)
      
      }
    >
      <div style={{background: currentSettings.floatingColor || '#fff'}}></div>
    </div>
  )}


  // change body id and reset scroll position on page change
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.id = `${currentPage}_body`;
    window.scrollTo({ top: 0 })
  }, [currentPage]);

  return(
    <div
      id='page_container'
      style={{
        background: gradient,
        ...props.containerStyles
      }}
    >
      <Route path='/' exact component={Home} />
      <Route path='/work' exact component={Work} />
      <Route path='/skills' exact component={Skills} />
      <Route path='/resume' exact component={Resume} />
      <Route path='/contact' exact component={Contact} />

      {/* Background svgs */}
      <FloatingSvgs 
        svgs={svgs}
      />
      
      {/* floating nav right*/}
      <div
        id='section-circles'
        onTransitionEnd={(e) => e.stopPropagation()}
      >
        {sectionCircs}
      </div>

    </div>
  )
}

export default PageContainer;
