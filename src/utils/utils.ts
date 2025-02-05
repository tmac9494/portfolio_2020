import { Skill, SkillSorts, SkillTags, SkillContextValue } from "./types";

export const conditionClass = (
  condition: boolean | undefined | null | string,
  className?: string
) => (condition ? ` ${className || condition}` : "");

export const sortAlgorithms = {
  // a to z sort
  [SkillSorts.AtoZ]: (a: Skill, b: Skill) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  },
  // best to worst sort
  [SkillSorts.BestToWorst]: (a: Skill, b: Skill) => {
    const sameLevelWithStar =
      a.level === b.level &&
      a.tags.includes(SkillTags.Star) &&
      !b.tags.includes(SkillTags.Star);
    if (sameLevelWithStar || a.level > b.level) {
      return -1;
    }
    if (a.level < b.level) {
      return 1;
    }
    return 0;
  },
  // worst to best sort
  [SkillSorts.WorstToBest]: (a: Skill, b: Skill) => {
    const sameLevelWithStar =
      a.level === b.level &&
      b.tags.includes(SkillTags.Star) &&
      !a.tags.includes(SkillTags.Star);
    if (a.level < b.level || sameLevelWithStar) {
      return -1;
    }
    if (a.level > b.level) {
      return 1;
    }
    return 0;
  },
};

// skills handler
export const prepareSkills = (update: SkillContextValue) => {
  if (!update.skillsList) return update;

  // search
  const queryFilter = (value: Skill) => {
    const skillName = value.title.toLowerCase();
    const query = update.query.toLowerCase();
    return skillName.includes(query);
  };

  // reduce active filters array and check for concurrent id mathes
  const handleFilter = (value: Skill) =>
    update.filters.reduce((isValid, activeFilter) => {
      if (isValid) {
        return value.tags.includes(activeFilter);
      }
      return isValid;
    }, true);

  // sorts
  const sortValueFromState = update.sort;
  const skillPool = update.skillsList;

  update.skillsList = skillPool
    .filter(handleFilter)
    .sort(sortAlgorithms[sortValueFromState]);

  // filter by search query if active
  if (update.query !== "" && update.skillsList) {
    update.skillsList = update.skillsList.filter(queryFilter);
  }

  return update;
};
