import React from 'react';
import './styles.css';
import {homePage} from '../../../data';
import {InOutAnimation as Animation} from '../../General'


const Home = props => {
  console.log(homePage)
  return(
    <div id='home_page'>
      <h1>Test</h1>
      <p>test test test test 2</p>
    </div>
  )
}


export default Home;
