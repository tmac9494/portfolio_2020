import React, { useState } from 'react';
import { AnimationParent } from '../AnimationParent';
import { companyLegend } from '../../../utils';

 export const CompanyIcon = props => {
    
    const [hover, setHover] = useState(false);
    const { id } = props;
    const company = companyLegend[id];
    const circleBorder = { borderRadius: '100%' };
    const specificStyles = {
        gcio: {
            ...circleBorder,
        },
        ps: {
            ...circleBorder,
        },
        afm: {
            ...circleBorder,
        }
    }
    
    return(
        <div 
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='company-icon-container'
            style={props.style}
        >
            <img 
                className='company-icon'
                style={{
                    width: '32px', 
                    height: 'auto', 
                    ...specificStyles[id],
                }}
                src={company.img} 
                alt={company.name} 
            />
            <div className='company-icon-tooltip-wrap'>
                <AnimationParent
                    className='company-icon-tooltip'
                    isVisible={hover}
                >
                    <span>{company.name}</span>
                </AnimationParent>
            </div>
        </div>
    )
}