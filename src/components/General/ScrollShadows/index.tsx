import React, { useState, useLayoutEffect, useRef, useCallback, UIEvent } from 'react';
import { conditionClass } from '../../../utils';


export const ScrollShadows = (props: {
        children: any, 
        classes?: string, 
        id?: string,
    }) => {
    
    const [shadow, setShadow] = useState<null | string>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const {children, classes, id} = props;

    const handleScroll = useCallback((e: UIEvent) => {
        const target = e.target as HTMLDivElement;
        const max = target.scrollHeight - target.clientHeight - 1;
        const scrollDelta = target.scrollTop;
        let classList = '';
        if (scrollDelta < max) classList += ' end';
        if (scrollDelta > 0) classList += ' start';
        if (shadow !== classList) setShadow(classList);
    }, [shadow, setShadow])

    useLayoutEffect(() => {
        if (containerRef.current) {
            const e = containerRef.current;
            const max = e.scrollHeight - e.clientHeight - 1;
            const scrollDelta = e.scrollTop;
            let classList = '';
            if (scrollDelta < max) classList += ' end';
            if (scrollDelta > 0) classList += ' start';
            if (shadow !== classList) setShadow(classList);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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