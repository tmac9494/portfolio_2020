import { skills } from "./skills";

export const conditionClass = (condition, className) => condition ? ` ${className}` : '';

export const sortAlgorithms = {
    aToZ: (a, b) => {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
    },
    bestToWorst: (a, b) => {
        const sameLevelWithStar = (a.level === b.level && (a.tags.includes('star') && !b.tags.includes('star')));
        if (sameLevelWithStar || a.level > b.level) { return -1; }
        if (a.level < b.level) { return 1; }
        return 0;
    },
    worstToBest: (a, b) => {
        const sameLevelWithStar = (a.level === b.level && (b.tags.includes('star') && !a.tags.includes('star')));
        if (a.level < b.level || sameLevelWithStar) { return -1; }
        if (a.level > b.level) { return 1; }
        return 0;
    }
  }

// skills handler
export const prepareSkills = update => {

    // search
    const queryFilter = value => {
        const skillName = value.title.toLowerCase();
        const query = update.query.toLowerCase();
        return skillName.includes(query);
    }

    // reduce active filters array and check for concurrent id mathes
    const handleFilter = (value) => update.filters.reduce(
        (isValid, activeFilter) => {
        if (isValid) {
            return value.tags.includes(activeFilter);
        }
        return isValid;
        },
        true
    );
    // sorts
    const sortValueFromState = Object.keys(update.sort).filter(val => update.sort[val])[0];
    const skillPool = update.skillList || skills;

    update.skillsList = skillPool
        .filter(handleFilter)
        .sort(sortAlgorithms[sortValueFromState]);
    
    // filter by search query if active
    if (update.query !== '') {
        update.skillsList = update.skillsList.filter(queryFilter);
    }

    return update;

}
