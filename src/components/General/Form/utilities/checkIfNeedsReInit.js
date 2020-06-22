export default (needsInit, currentForm, propSettings, groups) => {
  const currentKeys = Object.keys(currentForm);
  // check if state has been set and length of state based fields match length of state
  return (
    currentKeys.length === 0
    || currentKeys.length !== (
      propSettings.filter(
        obj => obj.type !== 'title' && obj.type !== 'lineBreak'
      ).length
    )
  );
}
