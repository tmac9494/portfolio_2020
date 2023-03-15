import React, { useState, useLayoutEffect, useRef, useCallback, UIEvent } from 'react';
import { conditionClass } from '../../../utils';

type ShadowState = null | string;

export const ScrollShadows = (props: {
        children: any, 
        classes?: string, 
        id?: string,
    }) => {
    
    const [shadow, setShadow] = useState<ShadowState>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const {children, classes, id} = props;

    const handleShadowState = (
        target: HTMLDivElement,
        currentValue: ShadowState,
    ) => {
        const max = target.scrollHeight - target.clientHeight - 1;
        const scrollDelta = target.scrollTop;
        let classList = '';
        if (scrollDelta < max) classList += ' end';
        if (scrollDelta > 0) classList += ' start';
        if (currentValue !== classList) setShadow(classList);
    }

    // handle scroll change
    const handleScroll = useCallback((e: UIEvent) => {
        handleShadowState(e.target as HTMLDivElement, shadow);
    }, [shadow])


    // handle on load
    useLayoutEffect(() => {
        if (containerRef.current) 
            handleShadowState(containerRef.current, shadow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div
            className={'scrollable custom-scrollbar shadow-scroll' 
                + conditionClass(classes, classes) 
                + conditionClass(shadow)
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