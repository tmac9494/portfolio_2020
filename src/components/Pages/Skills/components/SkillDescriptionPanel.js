import React, { useState, useEffect } from 'react';
import { useSkillContext, useSkillContextDispatch } from './SkillContext';
import { skills, companyLegend } from '../../../../utils';
import { CompanyIcon, ScrollShadows, AnimationParent } from '../../../General';
import { ReactComponent as CloseSvg } from '../../../../assets/icons/close.svg';
import { SkillBar } from './SkillBar';
import { ReactComponent as StarSvg } from '../../../../assets/icons/star.svg';
import { IconAccordion } from '../../../General/IconAccordion';
import { SkillKeyTagsPanel } from './SkillKeyTagsPanel';

export const SkillDescriptionPanel = () => {
    
    const { skillDescription, skillDescriptionVisibility } = useSkillContext();
    const { closeSkillDescription } = useSkillContextDispatch();

    const skillInfo = skills.filter(val => val.title === skillDescription)[0];
    const isSpecialty = skillInfo?.tags.includes('star');
    const isLove = skillInfo?.tags.includes('hrt');


    return(
        <AnimationParent 
            isVisible={skillDescriptionVisibility}
            id="skill_description_panel"
        >
            <div className='close-btn'>
                <button 
                    className='normalize-btn'
                    onClick={closeSkillDescription}
                >
                    <CloseSvg className='close-icon' />
                </button>
            </div>

            <SkillKeyTagsPanel 
                extensiveExperience={isSpecialty}
                love={isLove}
            />
            

            <div id='skill_description_intro'>
                <div className='image-container'>
                    <img 
                        src={skillInfo?.img} 
                        alt={skillInfo ? skillInfo.title : ''} 
                    />
                    <SpecialtyFlare 
                        key={skillDescription} 
                        isSpecial={isSpecialty} 
                    />
                </div>
                <h2>{skillInfo?.title}</h2>
                <SkillBar level={skillInfo?.level} />
            </div>

            <ScrollShadows
                key={skillInfo?.title || 'nothing'}
                id='skill_description_body'
                classes='white-scrollbar'
            >

                <div className='description'>
                    <p>{skillInfo?.description}</p>
                </div>

                <div className='accolades'>
                    <ul>
                    {skillInfo?.accolades.map((val, i) => 
                        <li key={val}>{val}</li>
                    )}
                    </ul>
                </div>

            </ScrollShadows>
            {skillInfo?.companies.length > 0 && <>
                <h3>Where:</h3>
                <div className='companies-list'>
                    {skillInfo &&
                        <IconAccordion
                            key={skillDescription}
                            list={skillInfo?.companies.map((val, i) => ({
                                title: companyLegend[val].name,
                                image: companyLegend[val].img,
                                style: companyLegend[val]?.iconStyle
                            }))}
                        />
                    }
                </div>
            </>}

        </AnimationParent>
    )
}



export const SpecialtyFlare = ({ isSpecial }) => {

    if (!isSpecial) {
        return null;
    }
    
    return(
        <div id='star-svg-container'>
            <SpecialtyFlareItem 
                key='star_1'
                id='star_1'
                className='flare-star'
                delay={300}
            />
            <SpecialtyFlareItem  
                key='star_2'
                id='star_2'
                className='flare-star'
                delay={550}
            />
            <SpecialtyFlareItem 
                key='star_3' 
                id='star_3'
                className='flare-star'
                delay={450}
            />
        </div>
    )
}


export const SpecialtyFlareItem = ({ id, className, delay }) => {

    const [movingIn, setMovingIn] = useState(true);
    const [visibility, setVisibility] = useState(null);
    const timeBetweenRecurring = 3000;
    const timeBetweenState = 5000;

    useEffect(() => {
        const delayTimeout = setTimeout(() => {
            setVisibility(movingIn)
        }, [!movingIn 
            ? timeBetweenState + delay 
            : visibility === null 
                ? delay // initial load
                : timeBetweenRecurring - delay // proceeding animations
            ]);
        return () => clearTimeout(delayTimeout);
    }, [movingIn, delay, visibility])



    return (
        <AnimationParent 
            id={id}
            className={className}
            inCallback={() => setMovingIn(false)}
            outCallback={() => setMovingIn(true)}
            isVisible={visibility}
        >
            <StarSvg />
        </AnimationParent>

    )
}