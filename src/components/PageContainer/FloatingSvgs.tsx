import React, { ReactElement, useState, useEffect } from 'react';

interface scrollState {
    value: number;
}

export const FloatingSvgs = (props: {
    total: number,
    svgs: any,
}): ReactElement => {
    
    const [scrollDelta, setScrollDelta] = useState(window.scrollY);
    const { total, svgs } = props;
    const scrollStateScrollValue = 0;

    // mount/unmount scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrollDelta(window.scrollY);
        }
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [])

    console.log(scrollDelta)

    return(
        <div 
          id='floating_svg_container' 
          className='fixed-fill' 
          style={{
            transform: `translateY(${Math.floor(scrollDelta / 10)}px)`
          }}
        >
          {svgs}
        </div>

    )
}