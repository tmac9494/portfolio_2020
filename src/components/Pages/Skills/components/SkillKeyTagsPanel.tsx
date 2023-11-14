import React, { ReactElement } from 'react';
import { ReactComponent as StarIcon } from '../../../../assets/icons/star.svg';


export const SkillKeyTagsPanel = (props: {
    isLove: boolean;
    extensiveExperience: boolean;
}): ReactElement => {
    


    return (
        <div id='skill_key_tags'>
            {props.extensiveExperience && 
                <div className='tag star'>
                    <StarIcon 
                        className='icon star gen-img'
                    />
                    <span>Pro</span>
                </div>
            }
        </div>
    )
}