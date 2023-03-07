import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';
import { conditionClass } from '../../../utils';


export const ScrollShadows = ({children, classes, id}) => {

    const [shadow, setShadow] = useState(null);
    const containerRef = useRef();

    const handleScroll = useCallback((e) => {
        const max = e.target.scrollHeight - e.target.clientHeight;
        const scrollDelta = e.target.scrollTop;
        let classList = '';
        if (scrollDelta < max) classList += ' end';
        if (scrollDelta > 0) classList += ' start';
        if (shadow !== classList) setShadow(classList);
    }, [shadow, setShadow])

    useLayoutEffect(() => {
        if (containerRef.current) {
            const e = containerRef.current;
            const max = e.scrollHeight - e.clientHeight;
            const scrollDelta = e.scrollTop;
            let classList = '';
            if (scrollDelta < max) classList += ' end';
            if (scrollDelta > 0) classList += ' start';
            if (shadow !== classList) setShadow(classList);
        }
    }, [shadow])


    return (
        <div
            className={'scrollable custom-scrollbar shadow-scroll' 
                + conditionClass(classes, classes) 
                + conditionClass(shadow !== null, shadow)
            }
            id={id}
            onScroll={handleScroll}
            onWheel={e => e.stopPropagation()}
            ref={containerRef}
        >
            {children}
        </div>
    );
}