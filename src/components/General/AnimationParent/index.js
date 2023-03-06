import React, { useState, useCallback } from 'react';

export const AnimationParent = props => {
    
    const [outHasFinished, setOutHasFinished] = useState(true);
    const { isVisible, inCallback, outCallback } = props;

    const handleAnimationEnd = useCallback(() => {  // useCallback to ensure correct variables
        if (!isVisible) {
            // hide the component after the "out" animation finishes
            setOutHasFinished(true);
            if (outCallback) outCallback();
        } else {
            setOutHasFinished(false);
            if (inCallback) inCallback();
        }
    }, [outCallback, inCallback, isVisible]);

    const shouldShowChildren = 
        (isVisible) || // if isVisible is true
        (!isVisible && !outHasFinished) // if isVisible is false & outHasFinished is false


    if (!shouldShowChildren) return null;

    return (
        <div 
            id={props.id} 
            className={`${props.className} ${isVisible ? 'in' : 'out'}`} 
            {...props.attributes}
            onAnimationEnd={handleAnimationEnd}
        >
            {props.children}
        </div>
    );
}