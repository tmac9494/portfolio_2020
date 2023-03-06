import React, { useState, useEffect } from 'react';
import { useSkillContext, useSkillContextDispatch } from '../../components/SkillContext';
import { SkillTableSearch } from '../../components/SkillTableSearch';
import { SkillTableModifier } from '../../components/SkillTabModifier';

export const SkillToolbar = props => {
    
    const { sort, filters } = useSkillContext();
    const {
        handleFilter,
        handleSort,
    } = useSkillContextDispatch();

    const currentSortValue = sort ? sort : 'None';



    return(
        <div id='skill-toolbar'>
            <SkillTableModifier 
                title='Filter:'
                options={[
                    {
                        text: 'Frontend',
                        onClick: handleFilter,
                        value: 'fe',
                    },
                    {
                        text: 'Backend',
                        onClick: handleFilter,
                        value: 'be'
                    },
                    {
                        text: 'Languages',
                        onClick: handleFilter,
                        value: 'lang',
                    },
                    {
                        text: 'Libraries',
                        onClick: handleFilter,
                        value: 'lib',
                    },
                    {
                        text: 'Frameworks',
                        onClick: handleFilter,
                        value: 'fw',
                    }
                ]}
                value={''}
                isCheckbox={true}
                filters={filters}
            />
            <SkillTableModifier 
                title='Sort:'
                options={[
                    {
                        text: 'A to Z',
                        onClick: handleSort,
                        value: 'aToZ',
                    },
                    {
                        text: 'Best to Worst',
                        onClick: handleSort,
                        value: 'bestToWorst',
                    },
                    {
                        text: 'Worst to Best',
                        onClick: handleSort,
                        value: 'worstToBest',
                    },
                ]}
                value={currentSortValue}
            />
            <SkillTableSearch />
        </div>
    )
}