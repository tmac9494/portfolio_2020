import React from 'react';
import {NavLink} from 'react-router-dom';

const Top = props => {
  return(
    <section className='section-container'>
      <div className='top-content'>
        <h1 className='section-title'>Trent McDole</h1>
        <span className='pos-title'>Full-Stack Javascript Engineer</span>
        <p className='description'>Welcome to my portfolio! Built using React and Sass, this applicaiton strives to showcase my creativity, experience, and love for unique user experiences. Please navigate through the application to learn more about myself and what I value in technology and work life. Thanks for visiting!</p>
        <NavLink
          to='/work'
          className='cool-btn c2a-btn home-btn'
        >
          Show Me Your Work
        </NavLink>
        <NavLink
          to='/skills'
          className='warm-btn c2a-btn home-btn'
        >
          What Are You Good At?
        </NavLink>
      </div>
    </section>
  )
}

export default Top;
