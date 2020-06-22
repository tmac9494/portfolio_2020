export default (settings, current={}, reset=false) => {
  let returnObj = {}, groups = {};

  settings.forEach((fieldObj, i) => {
    // console.log(fieldObj)
    if (fieldObj.type !== 'title' && fieldObj.type !== 'lineBreak') {
      // if (fieldObj.groupId) {
      //   groups[fieldObj.groupId] =
      //   typeof current[fieldObj.groupId] !== 'undefined'
      //   ? current[fieldObj.groupId]
      //   : fieldObj.initiallySelected ? fieldObj.id
      //   : (fieldObj.type === 'radio' ? '' : []);
      // } else {
        returnObj[fieldObj.id] =
        reset && fieldObj.resetValue !== undefined ? fieldObj.resetValue
        : typeof current[fieldObj.id] !== 'undefined' ? current[fieldObj.id]
        : fieldObj.value ? fieldObj.value
        : (fieldObj.type === 'checkbox' || fieldObj.type === 'multiselect') ? [] : ''
      // }
    }
  })

  returnObj = {
    ...returnObj,
    ...groups,
  }


  return returnObj;

}
