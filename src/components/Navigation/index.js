import React from 'react';
import './styles.css';


const Navigation = props => {
  return(
    <div id='navigation'>
      <button
        className={'nav-btn home-nav-btn' + (props.currentPage === 'home' ? ' active' : '')}
        onClick={() => props.setCurrentPage('home')}
      >
        <svg id='home_icon' xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M80,212V448a16,16,0,0,0,16,16h96V328a24,24,0,0,1,24-24h80a24,24,0,0,1,24,24V464h96a16,16,0,0,0,16-16V212"/><path d="M480,256,266.89,52c-5-5.28-16.69-5.34-21.78,0L32,256"/><polyline points="400 179 400 64 352 64 352 133"/></svg>
        <span>Home</span>
      </button>
      <button
        className={'nav-btn work-nav-btn' + (props.currentPage === 'work' ? ' active' : '')}
        onClick={() => props.setCurrentPage('work')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><circle cx="256" cy="256" r="26"/><circle cx="346" cy="256" r="26"/><circle cx="166" cy="256" r="26"/><polyline points="160 368 32 256 160 144"/><polyline points="352 368 480 256 352 144"/></svg>
        <span>Work</span>
      </button>
      <button
        className={'nav-btn skills-nav-btn' + (props.currentPage === 'skills' ? ' active' : '')}
        onClick={() => props.setCurrentPage('skills')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M436.67,184.11a27.17,27.17,0,0,1-38.3,0l-22.48-22.49a27.15,27.15,0,0,1,0-38.29l50.89-50.89a.85.85,0,0,0-.26-1.38C393.68,57,351.09,64.15,324.05,91c-25.88,25.69-27.35,64.27-17.87,98a27,27,0,0,1-7.67,27.14l-173,160.76a40.76,40.76,0,1,0,57.57,57.54l162.15-173.3A27,27,0,0,1,372,253.44c33.46,8.94,71.49,7.26,97.07-17.94,27.49-27.08,33.42-74.94,20.1-102.33a.85.85,0,0,0-1.36-.22Z" /><path d="M224,284c-17.48-17-25.49-24.91-31-30.29a18.24,18.24,0,0,1-3.33-21.35,20.76,20.76,0,0,1,3.5-4.62l15.68-15.29a18.66,18.66,0,0,1,5.63-3.87,18.11,18.11,0,0,1,20,3.62c5.45,5.29,15.43,15,33.41,32.52"/><path d="M317.07,291.3c40.95,38.1,90.62,83.27,110,99.41a13.46,13.46,0,0,1,.94,19.92L394.63,444a14,14,0,0,1-20.29-.76c-16.53-19.18-61.09-67.11-99.27-107"/><path d="M17.34,193.5l29.41-28.74a4.71,4.71,0,0,1,3.41-1.35,4.85,4.85,0,0,1,3.41,1.35h0a9.86,9.86,0,0,0,8.19,2.77c3.83-.42,7.92-1.6,10.57-4.12,6-5.8-.94-17.23,4.34-24.54a207,207,0,0,1,19.78-22.6c6-5.88,29.84-28.32,69.9-44.45A107.31,107.31,0,0,1,206.67,64c22.59,0,40,10,46.26,15.67a89.54,89.54,0,0,1,10.28,11.64A78.92,78.92,0,0,0,254,88.54,68.82,68.82,0,0,0,234,87.28c-13.33,1.09-29.41,7.26-38,14-13.9,11-19.87,25.72-20.81,44.71-.68,14.12,2.72,22.1,36.1,55.49a6.6,6.6,0,0,1-.34,9.16l-18.22,18a6.88,6.88,0,0,1-9.54.09c-21.94-21.94-36.65-33.09-45-38.16s-15.07-6.5-18.3-6.85a30.85,30.85,0,0,0-18.27,3.87,11.39,11.39,0,0,0-2.64,2,14.14,14.14,0,0,0,.42,20.08l1.71,1.6a4.63,4.63,0,0,1,0,6.64L71.73,246.6A4.71,4.71,0,0,1,68.32,248a4.86,4.86,0,0,1-3.41-1.35L17.34,200.22A4.88,4.88,0,0,1,17.34,193.5Z"/></svg>
        <span>Skills</span>
      </button>
      <button
        className={'nav-btn resume-nav-btn' + (props.currentPage === 'resume' ? ' active' : '')}
        onClick={() => props.setCurrentPage('resume')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect x="96" y="48" width="320" height="416" rx="48" ry="48"/><line x1="176" y1="128" x2="336" y2="128"/><line x1="176" y1="208" x2="336" y2="208"/><line x1="176" y1="288" x2="256" y2="288"/></svg>
        <span>Resume</span>
      </button>
      <button
        className={'nav-btn contact-nav-btn' + (props.currentPage === 'contact' ? ' active' : '')}
        onClick={() => props.setCurrentPage('contact')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect x="128" y="16" width="256" height="480" rx="48" ry="48"/><path d="M176,16h24a8,8,0,0,1,8,8h0a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16h0a8,8,0,0,1,8-8h24"/></svg>
        <span>Contact</span>
      </button>
    </div>
  )
}


export default Navigation;
