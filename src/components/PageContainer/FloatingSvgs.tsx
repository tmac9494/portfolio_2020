import React, { ReactElement, useState, useEffect } from 'react';


export const FloatingSvgs = (props: {
    svgs: any,
}): ReactElement => {
    
    const [scrollDelta, setScrollDelta] = useState<number>(window.scrollY);
    const parallaxFactor = 25; // 100px of scrolling will be divided by this factor on each tick
    const { svgs } = props;

    // mount/unmount scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrollDelta(window.scrollY);
        }
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [])

    return(
        <div 
          id='floating_svg_container' 
          className='fixed-fill' 
          style={{
            transform: `translateY(${Math.floor(scrollDelta / parallaxFactor)}px)`
          }}
        >
          {svgs}
        </div>

    )
}