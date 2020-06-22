export default {
  email: (valueStore, modifier) => {
    return {
      ...modifier,
      value: valueStore.value.toLowerCase(),
    }
  },
  radio: (valueStore, modifier) => {},
  general: (valueStore, modifier) => {
    return {
      ...modifier,
      value: valueStore.value
    }
  },
}
//
//
// // validations
// this.validate(valueStore);
// if (this.type !== 'select' && this.type !== 'radio' && this.type !== 'checkbox')
//   this.value = typeof e.value !== 'undefined' ? e.value : e;
// if (this.type === 'checkbox' || this.type === 'radio') {
//   this.condition = this.updateSelectGroup(this.groupId, this.id);
//   // console.log(this.condition)
// }
