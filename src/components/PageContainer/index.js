import React from 'react';
import './styles.css';
import {BrowserRouter, Route} from 'react-router-dom';
import pageSettings from './pageSettings';
import Home from '../Pages/Home';


const PageContainer = props => {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [scroll, setScroll] = React.useState(0);
  const [scrolling, setScrolling] = React.useState(false);

  const currentSettings = pageSettings[currentPage];
  const {total, color} = currentSettings;

  const handleScroll = e => {
    console.log(e.deltaY)
    if (e.deltaY < 0 && scroll === 0) {return;}
    if (e.deltaY > 0 && scroll === total - 1) {return;}
    setScrolling(true);
    setScroll(e.deltaY > 0 ? scroll + 1 : scroll - 1);
  }

  let sectionCircs = [];
  for(let i = 0;i < total;i++) {
    sectionCircs.push(<div className={'section-circle' + (scroll === i ? ' active' : '')}></div>)
  }


  let gradient = 'linear-gradient(55deg, ' + color + ')';
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
      <BrowserRouter>
        <Route exact path='/' component={(props) => <Home {...props} setCurrentPage={setCurrentPage} />} />

      </BrowserRouter>
      <div id='section-circles'>
        {sectionCircs}
      </div>
    </div>
  )
}

export default PageContainer;
