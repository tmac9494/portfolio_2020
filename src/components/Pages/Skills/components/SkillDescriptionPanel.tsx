import React, { useState, useEffect } from 'react';
import { useSkillContext, useSkillContextDispatch } from './SkillContext';
import { companyImages, skillImages, SkillTags } from '../../../../utils';
import { ScrollShadows, AnimationParent } from '../../../General';
import { ReactComponent as CloseSvg } from '../../../../assets/icons/close.svg';
import { SkillBar } from './SkillBar';
import { ReactComponent as StarSvg } from '../../../../assets/icons/star.svg';
import { IconAccordion } from '../../../General/IconAccordion';
import { SkillKeyTagsPanel } from './SkillKeyTagsPanel';

export const SkillDescriptionPanel = () => {
    
    const { skillDescription, skillDescriptionVisibility, skillsList } = useSkillContext();
    const { closeSkillDescription } = useSkillContextDispatch();

    if (!skillsList) return null;

    const skillInfo = skillsList.filter(val => val.id === skillDescription)[0];
    const isSpecialty = skillInfo?.tags.includes(SkillTags.Star);
    const isLove = skillInfo?.tags.includes(SkillTags.Heart);


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
                isLove={isLove}
            />
            

            <div id='skill_description_intro'>
                <div className='image-container'>
                    <img 
                        src={skillImages[skillInfo.id].img} 
                        alt={skillImages[skillInfo.id].name} 
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
                                title: companyImages[val].name,
                                image: companyImages[val].img,
                                style: companyImages[val]?.iconStyle
                            }))}
                        />
                    }
                </div>
            </>}

        </AnimationParent>
    )
}



export const SpecialtyFlare = ({ isSpecial }: { isSpecial: boolean }) => {

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


export const SpecialtyFlareItem = ({id, className, delay} : {
     id:string, 
     className:string, 
     delay:number 
}) => {

    const [movingIn, setMovingIn] = useState<boolean>(true);
    const [visibility, setVisibility] = useState<boolean | null>(null);
    const timeBetweenRecurring = 3000;
    const timeBetweenState = 5000;

    useEffect(() => {
        const totalDelay = !movingIn 
            ? timeBetweenState + delay 
            : visibility === null 
            ? delay // initial load
            : timeBetweenRecurring - delay;
        const delayTimeout = setTimeout(() => {
            setVisibility(movingIn)
        }, totalDelay);
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