import React from 'react';

const MyStory = props => {
  return(
    <section className='section-container' style={{transform: 'translateY(100vh)'}}>
      <div className='abs-center clearfix' id='my_story_container' >
        <div className='one-half scrollable'>
          <h2 className='section-title'>My Story</h2>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>
          <p>Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>
          <p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p>
        </div>
        <div className='one-half'>
        </div>
      </div>
    </section>
  )
}

export default MyStory;
