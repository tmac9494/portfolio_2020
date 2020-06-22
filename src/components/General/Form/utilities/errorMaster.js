export default {
  invalidEmail: {
    message: 'The email entered is invalid.',
    test: input => {
      let atTest = input.value.split('@');
      let dotTest = input.value.split('.')
      if (atTest.length <= 1
        || dotTest[dotTest.length - 1].length === 0
        || dotTest[dotTest.length - 1].length > 3
      ) return false;

      return true;
    },
  },
  fieldRequired: {
    message: 'This field is required.',
    test: input => (input.value && input.value.length > 0),
  },
  groupRequired: {
    message: 'This field is required',
    test: (value) => {
      return typeof value !== 'undefined' && typeof value !== '';
    },
  },
  pwLength: {
    message: 'Password length should be 6 to 16.',
    test: input => input.value.length > 6 && input.value.length < 16,
  },
  pwUpCase: {
    message: 'Must have at-least 1 uppercase letter.',
    test: input => (/^(?=.*[A-Z])/).test(input.value)
  },
  pwLowCase: {
    message: 'Must have at-least 1 lowercase letter.',
    test: input => (/^(?=.*[a-z])/).test(input.value)
  },
  pwSpecial: {
    message: 'Must have at-least special character.',
    test: input => (/^(?=.*[!@#$%^&*])/).test(input.value)
  },
  pwNum: {
    message: 'Must have at-least 1 number.',
    test: input => (/^(?=.*\d)/).test(input.value)
  },
  pwMatch: {
    message: 'Passwords do not match.',
    test: (input, confirmPassword) => input.value === confirmPassword,
  },
  invalidPhone: {
    message: 'The number entered is not a valid telephone number.',
    test: input => {
      if (input.value === '') {
        console.log(input.value)
        return true;
      } else {
        const val = input.value.replace(')','')
        .replace(')','')
        .replace('(','')
        .replace(' ','')
        .replace('-','');
        return val.match(/^[-+]?[0-9]+$/) && val.length === 10;
      }
    }
  }

}
