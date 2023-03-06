import React from 'react';
import { useSkillContextDispatch, useSkillContext } from './SkillContext';
import { ReactComponent as SearchSvg } from '../../../../assets/icons/search.svg';
import { ReactComponent as CloseSvg } from '../../../../assets/icons/close.svg';
import { AnimationParent } from '../../../General/AnimationParent';

export const  SkillTableSearch = props => {
  
    const { searchSkills, clearSearch } = useSkillContextDispatch();
    const { query } = useSkillContext();

    const handleChange = e => searchSkills(e.target.value);

    return (
        <div id='skill_table_search'>

            <AnimationParent
                isVisible={query === ''}
                className='search-icon-container'
            >
                <SearchSvg className='search-icon' /> 
            </AnimationParent>

            <AnimationParent
                isVisible={query !== ''}
                className='close-icon-container'
            >
                <button
                    onClick={clearSearch}
                    className='normalize-btn close-btn'
                >
                    <CloseSvg className='close-icon' />
                </button>
            </AnimationParent>

            <input 
                type="text" 
                placeholder="Search Skills"
                value={query} 
                onChange={handleChange} 
            />
        </div>
    );
}

export default SkillTableSearch;