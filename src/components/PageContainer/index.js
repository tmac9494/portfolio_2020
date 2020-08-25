import React, {useEffect, useMemo} from 'react';
import './styles.scss';
import {Route, useLocation} from 'react-router-dom';
import pageSettings from './pageSettings';
import Home from '../Pages/Home';
import Work from '../Pages/Work';
import Contact from '../Pages/Contact';
import Skills from '../Pages/Skills';
import Resume from '../Pages/Resume';


const PageContainer = props => {
  // page settings
  const location = useLocation();
  const currentPage = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');
  const currentSettings = pageSettings[currentPage];
  const {total, color} = currentSettings;
  const gradient = 'linear-gradient(70deg, ' + color + ')';
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
    lastScroll.current = scroll;
    setScrolling(true);
    // setNextScroll(e.deltaY > 0 ? scroll + 1 : scroll - 1);
    setScroll(e.deltaY > 0 ? scroll + 1 : scroll - 1);
  }

  // change on circle nav click
  const handleIndexChange = index => {
    // setNextScroll(index);
    lastScroll.current = scroll;
    setScroll(index);
    setScrolling(true);
  }

  // circle nav
  let sectionCircs = [];
  for(let i = 0;i < total;i++) {sectionCircs.push(
    <div
      className={'section-circle light ' + (scroll === i ? ' active' : '')}
      style={{borderColor: currentSettings.floatingColor || '#fff'}}
      key={currentPage + i}
      onClick={() => handleIndexChange(i)}
    >
      <div style={{background: currentSettings.floatingColor || '#fff'}}></div>
    </div>
  )}

  // page change catch
  useEffect(() => {
    if (pageRef.current !== currentPage) {
      setScroll(0);
      setNextScroll(1);
      setScrolling(false);
      lastScroll.current = 0;
      pageRef.current = currentPage;
      requirements.current = {
        animations: 0,
        content: 0,
      }
    }
  }, [currentPage, setScroll, setNextScroll, setScrolling])

  const pageProps = {
    nextScroll,
    scroll,
    updateRequirement,
  }

  const heightVar = window.innerHeight * 1.5;

  const floatingSvgs = useMemo(() => (
    <div id='floating_svg_container' className='fixed-fill' style={{transform: `translateY(${((total - 1) * 50) - (scroll * 50)}px)`}}>
      {pageSettings[currentPage].svgs}
    </div>
  ), [currentPage, scroll])

  return(
    <div
      id='page_container'
      className={scrolling ? 'scrolling' : null}
      key={currentPage}
      style={{
        width: window.innerWidth - 70 + 'px',
        height: heightVar * (total) + 'px',
        top: -heightVar * (scroll) + 'px',
        background: gradient,
        ...props.containerStyles
      }}
      onWheel={!scrolling ? handleScroll : null}
      onTransitionEnd={() => setScrolling(false)}
    >
      <Route path='/' exact component={() => <Home {...pageProps} />} />
      <Route path='/work' exact component={() => <Work {...pageProps} />} />
      <Route path='/skills' exact component={() => <Skills {...pageProps} />} />
      <Route path='/resume' exact component={() => <Resume {...pageProps} />} />
      <Route path='/contact' exact component={() => <Contact {...pageProps} />} />
      {/* Background svgs */}
      {floatingSvgs}
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
