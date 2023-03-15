import React, { useMemo, createContext, useReducer, useContext, useCallback, ReactElement } from 'react';
import { prepareSkills, SkillIds, SkillTags, SkillSorts, Skill, SkillContextValue } from '../../../../utils';

interface SkillContextDispatchValue {
    handleFilter?: () => void,
    setSkillDescription?: () => void,
    closeSkillDescription?: () => void,
    searchSkills?: () => void,
    clearSearch?: () => void,
    handleSort?: () => void,
}

enum SkillActions {
    ToggleFilter = 'toggle-filter',
    Sort = 'sort',
    SetSkill = 'set-skill',
    ClearSkill = 'clear-skill',
    Search = 'search',
    ClearSearch = 'clear-search',
    Default = '',
}

const defaultSort = SkillSorts.BestToWorst;
const initialState: SkillContextValue = {
    skillDescription: SkillIds.React,
    skillDescriptionVisibility: false,
    filters: [],
    query: '',
    sort: defaultSort,
    skillsList: null,
}

const SkillContext = createContext<any>({});
const SkillContextDispatch = createContext<any>({}); 

const stateMachine = (
    state:SkillContextValue,
    action: any,
) => {
    
    // filters
    const addFilterToState = (id:SkillTags) => {
        let filters = state.filters.slice();
        filters.push(id);
        return {
            ...state,
            filters
        }
    }
    const removeFilterFromState = (id:SkillTags) => {
        return {
            ...state,
            filters: state.filters.filter(val => val !== id)
        }
    }
    const handleFilter = (id: SkillTags) => {
        const filterFunction = state.filters.includes(action.filter) 
            ? removeFilterFromState
            : addFilterToState;
        return prepareSkills(filterFunction(id));
    }

    // sort
    const editSort = (property: SkillSorts) => {
        let update = ({
            ...state,
            sort: property,
        });
        if (property === state.sort) { return state; }
        return prepareSkills(update);
    }


    switch(action.type) {
        case SkillActions.ToggleFilter:
            return handleFilter(action.filter);
        case SkillActions.Sort:
            return editSort(action.sort);
        case SkillActions.SetSkill: 
            return {
                ...state,
                skillDescription: action.skill,
                skillDescriptionVisibility: true,
            }
        case SkillActions.ClearSkill:
            return {
                ...state,
                skillDescriptionVisibility: false,
            }
        case SkillActions.Search:
            return {
                ...prepareSkills({...state, query: action.value}),
                skillDescriptionVisibility: false,
            }
        case SkillActions.ClearSearch:
            return {
                ...prepareSkills({...state, query: ''}),
                skillDescriptionVisibility: false,
            }
        default: return state;
    }
}



export const SkillContextProvider = (props: {
    skills: Skill[], 
    children: ReactElement
}) => {
    
    const [state, dispatch] = useReducer(stateMachine, prepareSkills({
        ...initialState,
        skillsList: props.skills || [],
    }))

    // filters 
    const handleFilter = useCallback((filter:SkillTags) => 
        dispatch({type: SkillActions.ToggleFilter, filter})
    , [dispatch]);

    // sorts
    const handleSort = useCallback((sort: SkillSorts) => 
        dispatch({type: SkillActions.Sort, sort})
    , [dispatch]);

    // skill description panel
    const setSkillDescription = useCallback((skill: SkillIds) => 
        dispatch({type: SkillActions.SetSkill, skill})
    , [dispatch]);
    
    const closeSkillDescription = useCallback(() => 
        dispatch({type: SkillActions.ClearSkill})
    , [dispatch]);

    // search function
    const searchSkills = useCallback((value: string) => 
        dispatch({type: SkillActions.Search, value})
    , [dispatch]);

    const clearSearch = useCallback(() =>
         dispatch({type: SkillActions.ClearSearch})
    , [dispatch]);


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
            <SkillContextDispatch.Provider 
                value={dispatchPayload}
            >
                {props.children}
            </SkillContextDispatch.Provider>
        </SkillContext.Provider>
    )
}


export const useSkillContext = (): SkillContextValue => {
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