import React, {useEffect, useMemo, useCallback, useState, useLayoutEffect} from 'react';
import './styles.scss';
import {Route, useLocation} from 'react-router-dom';
import {addToCache, getCache} from '../General/CacheManager';
import {useDevice} from '../General';
import pageSettings from './pageSettings';
import Home from '../Pages/Home';
import Work from '../Pages/Work';
import Contact from '../Pages/Contact';
import Skills from '../Pages/Skills';
import Resume from '../Pages/Resume';


const PageContainer = props => {
  const device = useDevice();

  // page settings
  const cache = getCache();
  const location = useLocation();
  const currentPage = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');
  const currentSettings = pageSettings[currentPage];
  const {total, color} = currentSettings;
  const gradient = 'linear-gradient(70deg, ' + color + ')';
  const storedScrollPosition = cache[currentPage + '_scroll']
    ? parseInt(cache[currentPage + '_scroll']) : 0;
  const wih = window.innerHeight;
  const wihhh = Math.floor(window.innerHeight * 1.5);

  // state
  const [scrollState, setScrollState] = useState({
    scroll: storedScrollPosition,
    scrolling: false,
    nextScroll: storedScrollPosition,
  })
  const handleScrollUpdate = useCallback(update => {
    if (update.scroll !== undefined) addToCache(currentPage + '_scroll', update.scroll)
    setScrollState({
      ...scrollState,
      ...update
    })
  }, [scrollState, setScrollState, currentPage])
  const pageRef = React.useRef(currentPage);

  const scrollStateScrollValue = scrollState.scroll;

  // scroll function
  const handleScroll = useCallback((e) => {
    if (e.deltaY < 0 && scrollStateScrollValue === 0) {return;}
    if (e.deltaY > 0 && scrollStateScrollValue === total - 1) {return;}
    handleScrollUpdate({
      scrolling: true,
      scroll: e.deltaY > 0 ? scrollStateScrollValue + 1 : scrollStateScrollValue - 1
    })
  }, [scrollStateScrollValue, handleScrollUpdate, total])

  // change on circle nav click
  const handleIndexChange = index => {
    // setNextScroll(index);
    handleScrollUpdate({
      scroll: index,
      scrolling: true,
    })
  }

  // circle nav
  let sectionCircs = [];
  for(let i = 0;i < total;i++) {sectionCircs.push(
    <div
      className={'section-circle light ' + (scrollStateScrollValue === i ? ' active' : '')}
      style={{borderColor: currentSettings.floatingColor || '#fff'}}
      key={currentPage + i}
      onClick={() => handleIndexChange(i)}
    >
      <div style={{background: currentSettings.floatingColor || '#fff'}}></div>
    </div>
  )}

  // page change catch
  useLayoutEffect(() => {
    if (pageRef.current !== currentPage) {
      handleScrollUpdate({
        scroll: 0,
        nextScroll: 1,
        scrolling: false,
      })
      pageRef.current = currentPage;
      // requirements.current = {
      //   animations: 0,
      //   content: 0,
      // }
    }
  }, [currentPage, handleScrollUpdate])

  const pageProps = {
    nextScroll: scrollState.nextScroll,
    scroll: scrollStateScrollValue,
    // updateRequirement,
  }

  // const heightVar = window.innerHeight * 1.5;

  const floatingSvgs = useMemo(() => (
    <div 
      id='floating_svg_container' 
      className='fixed-fill' 
      style={{
        transform: `translateY(${((total - 1) * 50) - (scrollStateScrollValue * 50)}px)`
      }}
    >
      {pageSettings[currentPage].svgs}
    </div>
  ), [currentPage, scrollStateScrollValue, total])

  return(
    <div
      id='page_container'
      className={scrollState.scrolling ? 'scrolling' : null}
      style={{
        width: '100%',
        height: Math.floor(wihhh * (total)) + 'px',
        top: Math.floor(-wihhh * (scrollStateScrollValue)) + 'px',
        background: gradient,
        ...props.containerStyles
      }}
      onWheel={!scrollState.scrolling ? handleScroll : null}
      onTransitionEnd={() => handleScrollUpdate({scrolling: false})}
    >
      <Route path='/' exact component={Home} />
      <Route path='/work' exact component={Work} />
      <Route path='/skills' exact component={Skills} />
      <Route path='/resume' exact component={Resume} />
      <Route path='/contact' exact component={Contact} />
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
