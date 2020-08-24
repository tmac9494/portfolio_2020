import React from 'react';
import './styles.css';
import {BrowserRouter, Route} from 'react-router-dom';
import pageSettings from './pageSettings';
import Home from '../Pages/Home';
import Work from '../Pages/Work';
import Contact from '../Pages/Contact';
import Skills from '../Pages/Skills';
import Resume from '../Pages/Resume';


const PageContainer = props => {
  // page settings
  const {currentPage} = props;
  const currentSettings = pageSettings[currentPage];
  const {total, color} = currentSettings;
  const gradient = 'linear-gradient(55deg, ' + color + ')';
  // state
  const [scroll, setScroll] = React.useState(0);
  const [nextScroll, setNextScroll] = React.useState(scroll);
  const lastScroll = React.useRef(scroll);
  const [scrolling, setScrolling] = React.useState(false);
  const pageRef = React.useRef(currentPage);

  // requirements before shifting to next scroll position
  const requirements = React.useRef({
    animations: 0,
    content: 0,
  })
  const updateRequirement = (property, increment) => {
    requirements.current[property] += increment;
    if (
      requirements.current.animations === currentPage.animations
      && requirements.current.content === currentPage.content
      && nextScroll !== scroll
    ) setScroll(scroll);
  }

  // scroll function
  const handleScroll = e => {
    if (e.deltaY < 0 && scroll === 0) {return;}
    if (e.deltaY > 0 && scroll === total - 1) {return;}
    setScrolling(true);
    // setNextScroll(e.deltaY > 0 ? scroll + 1 : scroll - 1);
    setScroll(e.deltaY > 0 ? scroll + 1 : scroll - 1);
    lastScroll.current = scroll;
  }

  // change on circle nav click
  const handleIndexChange = index => {
    // setNextScroll(index);
    setScroll(index);
    setScrolling(true);
    lastScroll.current = scroll;
  }

  // circle nav
  let sectionCircs = [];
  for(let i = 0;i < total;i++) {sectionCircs.push(
    <div
      className={'section-circle light ' + (scroll === i ? ' active' : '')}
      key={i}
      onClick={() => handleIndexChange(i)}
    >
      <div></div>
    </div>
  )}

  // page change catch
  if (pageRef.current !== currentPage) {
    setScrolling(false);
    setScroll(0);
    lastScroll.current = 0;
    pageRef.current = currentPage;
    requirements.current = {
      animations: 0,
      content: 0,
    }
  }

  return(
    <div
      id='page_container'
      style={{
        width: window.innerWidth - 70 + 'px',
        height: 200 * (total) + 'vh',
        top: -200 * (scroll) + 'vh',
        background: gradient,
        ...props.containerStyles
      }}
      onWheel={!scrolling ? handleScroll : null}
      onTransitionEnd={() => setScrolling(false)}
    >
      {currentPage === 'home' ? <Home updateRequirement={updateRequirement} scroll={scroll} nextScroll={nextScroll} />
        : currentPage === 'work' ? <Work updateRequirement={updateRequirement} scroll={scroll} nextScroll={nextScroll} />
        : currentPage === 'skills' ? <Skills updateRequirement={updateRequirement} scroll={scroll} nextScroll={nextScroll} />
        : currentPage === 'resume' ? <Resume updateRequirement={updateRequirement} scroll={scroll} nextScroll={nextScroll} />
        : currentPage === 'contact' ? <Contact updateRequirement={updateRequirement} scroll={scroll} nextScroll={nextScroll} />
      : null}
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
