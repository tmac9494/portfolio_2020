import React from 'react';
import TextField from './TextField';
// import DynamicSelect from '../../DynamicSelect';
import CheckCircle from '../../CheckCircle';
import ToggleSwitch from '../../ToggleSwitch';
import FileDropField from './FileDropField';
import MultiSelect from './MultiSelect';
import setters from '../utilities/setters';
import Animation from '../../AnimationWrap/InOutAnimation';

class Field {
  constructor(settings) {
    this.id = settings.id;
    this.groupId = settings.groupId;
    this.name = settings.name;
    this.onBlur = settings.onBlur;
    this.confirmPassword = settings.confirmPassword;
    this.getCurrentForm = settings.getCurrentForm;
    this.mergedStyles = settings.mergedStyles;
    this.handleSubmit = settings.handleSubmit;
    this.callback = settings.callback;
    this.valid = settings.valid === undefined
    ? (settings.validators
      ? Object.keys(settings.validators).includes('fieldRequired') && this.value === ''
      : !Object.keys(settings.validators).includes('fieldRequired'))
    : settings.valid;
    this.action =
    settings.callback
    ? (valueStore) => settings.callback(valueStore)
    : null;
    this.setter = settings.setter ? e => {
      let valueStore = {
        id: e.id || this.id,
        value: typeof e.value !== 'undefined' ? e.value : e
      }
      // validations
      const currentForm = this.confirmPassword ? this.getCurrentForm() : null;
      this.validate(valueStore, currentForm);
      this.handleSetter(valueStore, settings.setter);
    } : null;
    this.setterParam = settings.setterParam;
    this.validators = settings.validators;
    this.hideValidators = settings.hideValidators;
    this.radioCount = settings.radioCount;
    this.switchValues = settings.switchValues;
    this.validatorResult = [];
    this.confirmPassword = settings.confirmPassword;
    this.readyToValidate = typeof settings.readyToValidate !== 'undefined'
    ? settings.readyToValidate : false;
    // field
    this.type = settings.type;
    this.renderType = this.type === 'select' ? MultiSelect
    : (this.type === 'radio' || this.type === 'checkbox') ? 'div'
    : this.type === 'switch' ? ToggleSwitch
    : this.type === 'drop' ? FileDropField
    : this.type === 'title' ? 'p'
    : this.type === 'multiselect' ? MultiSelect
    : (this.type === 'lineBreak' || this.type === 'locked') ? 'div'
    : TextField;
    this.renderWrapType = (this.type === 'drop' || this.type === 'title' || this.type === 'lineBreak' || this.type === 'radio' || this.type === 'checkbox' || this.type === 'locked') ? 'div' : 'label';
    this.value = settings.value;
    this.selected = settings.selected;
    // this.condition = this.type === 'checkbox' ? this.selected.includes(this.id)
    // : this.type === 'radio' ? this.selected === this.id
    // : null;
    this.renderProps = null;
    this.styles = this.type === 'select' ? this.mergedStyles.dynamicSelect
    : (this.type === 'radio' || this.type === 'checkbox') ? this.mergedStyles.checkCircle
    : this.type === 'locked' ? this.mergedStyles.lockedElement
    : {};
    this.userStyles = settings.styles;
    this.placeholder = settings.placeholder;
    this.options = settings.options;
    this.btnText = settings.btnText;
    this.bgText = settings.bgText;
    this.userAttributes = settings.attributes;
    this.userLabelAttributes = settings.labelAttributes || {};
    // label
    this.label = settings.label;
    this.userLabelStyles = settings.labelStyles;
    this.Element = null;
  }

  // --------------------- main setter function
  handleSetter = (valueStore, settingsSetter) => {
    if (this.type !== 'title' && this.type !== 'lineBreak') {
      let modifier = setters[
        setters[this.type] ? this.type : 'general'
      ](valueStore, this.groupId);
      if (typeof valueStore.value !== 'undefined' && this.action) { return this.action(valueStore) }

      if (modifier)
      Object.keys(modifier).forEach(property => this[property] = modifier[property])

    return typeof valueStore.value !== 'undefined' && this.type !== 'drop'
      ? settingsSetter({
          id: valueStore.id,
          value: valueStore.value,
        })
      : null;
    }
  }

  // ----------------- validate function
  validate = (valueStore, currentForm) => {
    let validations = [];
    let valid = true;
    if (this.validators) {
      Object.keys(this.validators).filter(validatorId => validatorId !== 'groupRequired').forEach(validatorId => {
        let compareValue = validatorId === 'pwMatch' ? currentForm[this.confirmPassword] : null;
        const isValid = this.validators[validatorId].test(valueStore, compareValue, );
        if (!isValid) valid = false;
        validations.push({
          id: validatorId,
          valid: isValid,
          message: !isValid ? this.validators[validatorId].message : null,
          hide: (this.hideValidators && this.hideValidators.includes(validatorId)),
        })
      })
    }
    this.valid = valid;
    this.validatorResult = validations;
  }

  // ----------------- main construct function
  construct = () => {

    if (this.readyToValidate && typeof this.value !== 'undefined') {
      const currentForm = this.confirmPassword ? this.getCurrentForm() : null;
      this.validate({value: this.value, id: this.id}, currentForm)
    }

    let labelStyles = {
      ...this.mergedStyles.label,
      ...this.userLabelStyles,
      ...this.mergedStyles[
        this.type === 'title' ? 'titleLabel'
        : this.type === 'lineBreak' ? 'lineBreakLabel'
        : this.type === 'locked' ? 'lockedLabel'
        : '0'
      ]
    }

    let totalInvalid = 0;
      let validators = this.validatorResult.map(result => {
        if (!result.valid && result.message && !result.hide && this.readyToValidate) {
          totalInvalid++;
          return <p key={result.id} style={this.mergedStyles.error}>{result.message}</p>;
        } else {
          return null;
        }
      });

    // error styles for label
    if (totalInvalid) {
      labelStyles = {
        ...labelStyles,
        ...this.mergedStyles.errorLabel,
      };
    }
    let wrapperProps = {
      id: this.id,
      style: labelStyles,
      key: this.id,
      ...this.userLabelAttributes
    };
    if (this.renderWrapType === 'label') wrapperProps.htmlFor = this.id;

    const labelText = this.constructLabelText();
    const inputElement = this.constructElement();
    let children = [inputElement];
    if (this.label)
      children.unshift(labelText);
    return (
      React.createElement(
        this.renderWrapType,
        wrapperProps,
        children
      )
    )
  }

  // ---------------- construct dom element
  constructElement = () => React.createElement(
    this.renderType,
    this.constructProps(),
    (this.type === 'title' || this.type === 'locked')
    ? [this.value]
    : this.type === 'radio' || this.type === 'checkbox'
    ? this.constructChildren()
    : []
  )

  // ---------------- construct label text
  constructLabelText = () => {
    let totalInvalid = 0;
    let validators = this.validatorResult.map(result => {
      if (!result.valid && result.message && !result.hide && this.readyToValidate) {
        totalInvalid++;
        return <p key={result.id} style={this.lightValidation
            ? {...this.mergedStyles.error, ...this.mergedStyles.warning}
            : this.mergedStyles.error
          }
          >
            {result.message}
          </p>;
      } else {
        return null;
      }
    }).filter(val => val !== null);

    return(
      <span key='label_text'
        style={this.mergedStyles.labelText}
      >
        {this.label}
        {this.validators && Object.keys(this.validators).includes('fieldRequired') &&
          <span style={{color: '#ff0000'}}>*</span>
        }
        <div style={this.mergedStyles.errorWrap}>
          {validators[0]}
        </div>
      </span>
    );
  }

  // ---------- construct children for this field
  constructChildren = () => {
    let childStyles = {...this.styles};
    if (this.userStyles) Object.keys(this.userStyles).forEach(property =>
        childStyles[property] = {...childStyles[property], ...this.userStyles[property]}
      );

    const childSetters = {
      radio: optionId => {
        this.value = optionId;
        this.setter({id: this.id, value: optionId})
      },
      checkbox: optionId => {
        let value = this.value || [];
        if (value.includes(optionId)) {
          value = value.filter(id => id !== optionId);
        } else {
          value.push(optionId);
        }
        this.value = value;
        this.setter({id: this.id, value: value})
      }
    }
    const children = this.options.map(option => {
      const optionId = option[1];
      const optionText = option[0];
      const setter = childSetters[this.type];
        return (
          <label style={{
            ...this.mergedStyles.label,
            // ...this.userLabelStyles,
            ...this.mergedStyles[this.type === 'radio' ? 'inlineLabel' : 'optionLabel']
          }}
          id={optionId}
          key={optionId}
          >
            <CheckCircle
              styles={childStyles}
              key={optionId}
              id={this.id}
              condition={
                this.type === 'checkbox'
                ? this.value.includes(optionId)
                : this.value === optionId
              }
              setter={setter}
              setterParam={optionId}
            />
            <span style={this.mergedStyles.inlineLabelText}>{optionText}</span>
          </label>
        )
    })
    return children;
  }

  // --------------- construct props based on type
  constructProps = () => {
    let elemStyles = this.styles;
    if (typeof this.renderType !== 'string' && this.userStyles) {
      Object.keys(this.userStyles).forEach((property,i) => {
        elemStyles = {...elemStyles[property], ...this.userStyles[property]}
      })
    } else {
      elemStyles = {...elemStyles, ...this.userStyles}
    }
    const shared = {
      type: this.type,
      value: this.value,
      setter: this.type !== 'checkbox' && this.type !== 'radio' ? this.setter : null,
      style: elemStyles,
      onBlur: this.onBlur,
      styles: elemStyles,
      id: this.id,
      placeholder: this.placeholder,
      key: this.id,
      options: this.options || {},
      ...this.userAttributes
    }
    let returnProps = {...shared};
    if (this.type === 'textarea' && this.options && this.options.submitOnEnter)
      returnProps.handleSubmit = (valueStore) => {
        if (this.callback) this.callback(valueStore);
        this.handleSubmit(valueStore)
      };

    if (this.type === 'select' || this.type === 'multiselect') returnProps = {
      ...returnProps,
      options: this.options,
      selected: this.value,
    }; else if (this.type === 'checkbox' || this.type === 'radio') returnProps = {
      ...returnProps,
      // condition: this.condition,
    }; else if (this.type === 'drop') returnProps = {
      ...returnProps,
      btnText: this.btnText,
      bgText: this.bgText,
      styles: this.userStyles,
    }; else if (this.type === 'switch') returnProps = {
      condition: this.value,
      switchValues: this.switchValues,
    }; else if (this.type === 'title' || this.type === 'lineBreak' || this.type === 'locked') {
      delete returnProps.setter;
    }

    return returnProps;
  }



}





const fieldController = settings => new Field(settings);
export default fieldController;
