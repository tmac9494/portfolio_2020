import React, { ReactElement, useState, useEffect } from 'react';


export const FloatingSvgs = (props: {
    svgs: any,
}): ReactElement => {
    
    const [scrollDelta, setScrollDelta] = useState<number>(window.scrollY);
    const { svgs } = props;

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
            transform: `translateY(${Math.floor(scrollDelta / 25)}px)`
          }}
        >
          {svgs}
        </div>

    )
}