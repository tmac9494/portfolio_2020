import React from 'react';
import './styles.scss';
import {Top, SetsApart, MyStory} from './Sections';

const Home = props => {
  return(
  <div id='home_page'>
    <Top index={1} />
    <SetsApart index={2} />
    <MyStory index={3} />
  </div>
  )
}


export default Home;
