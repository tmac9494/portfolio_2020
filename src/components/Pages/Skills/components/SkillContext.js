import React, { useMemo, createContext, useReducer, useContext, useCallback } from 'react';
import { skills, sortAlgorithms, prepareSkills } from '../../../../utils';

const SkillContext = createContext();
const SkillContextDispatch = createContext();

const stateMachine = (state, action) => {
    
    // filters
    const addFilterToState = id => {
        let filters = state.filters.slice();
        filters.push(id);
        return {
            ...state,
            filters
        }
    }
    const removeFilterFromState = id => {
        return {
            ...state,
            filters: state.filters.filter(val => val !== id)
        }
    }
    const handleFilter = id => {
        const filterFunction = state.filters.includes(action.id) 
            ? removeFilterFromState
            : addFilterToState;
        return prepareSkills(filterFunction(id));
    }

    // sort
    const editSort = property => {
        let update = ({
            ...state,
            sort: property,
        });
        update.skillsList = skills.sort(sortAlgorithms[property]);
        if (property === state.sort) { return state; }
        return prepareSkills(update);
    }

    switch(action.type) {
        case 'toggle-filter':
            return handleFilter(action.id);
        case 'sort':
            return editSort(action.id);
        case 'set-skill': 
            return {
                ...state,
                skillDescription: action.skill,
                skillDescriptionVisibility: true,
            }
        case 'clear-skill':
            return {
                ...state,
                skillDescriptionVisibility: false,
            }
        case 'search':
            return prepareSkills({...state, query: action.value});
        case 'clear-search':
            return prepareSkills({...state, query: ''});
        default: return state;
    }
}



export const SkillContextProvider = props => {

    const initialState = {
        skillDescription: 'React',
        skillDescriptionVisibility: false,
        filters: [],
        query: '',
        sort: 'bestToWorst',
        skillsList: skills,
    }

    const [state, dispatch] = useReducer(stateMachine, prepareSkills(initialState))

    // filters
    const handleFilter = useCallback(filterId => dispatch({type: 'toggle-filter', id: filterId}), [dispatch]);

    // sorts
    const handleSort = useCallback(sortId => dispatch({type: 'sort', id: sortId}), [dispatch]);

    // skill description panel
    const setSkillDescription = useCallback(skill => dispatch({type: 'set-skill', skill}), [dispatch]);
    const closeSkillDescription = useCallback(() => dispatch({type: 'clear-skill'}), [dispatch]);

    // search function
    const searchSkills = useCallback(value => dispatch({type: 'search', value}), [dispatch]);
    const clearSearch = useCallback(() => dispatch({type: 'clear-search'}), [dispatch]);


    // optimized dispatch payload
    const dispatchPayload = useMemo(() => ({
        handleFilter,
        setSkillDescription,
        closeSkillDescription,
        searchSkills,
        clearSearch,
        handleSort
    }), [
        handleFilter,
        setSkillDescription,
        closeSkillDescription,
        searchSkills,
        clearSearch,
        handleSort
    ]);


    return(
        <SkillContext.Provider value={state}>
            <SkillContextDispatch.Provider value={dispatchPayload}>
                {props.children}
            </SkillContextDispatch.Provider>
        </SkillContext.Provider>
    )
}


export const useSkillContext = () => {
    const context = useContext(SkillContext);
    if (context === undefined) {throw new Error('useSkillContext must be used within SkillContextProvider')}
    return context;
}
export const useSkillContextDispatch = () => {
    const context = useContext(SkillContextDispatch);
    if (context === undefined) {throw new Error('useSkillContextDispatch must be used within SkillContextDispatch.Provider')}
    return context;
}
  


export const SkillContextConumer = SkillContext.Consumer;