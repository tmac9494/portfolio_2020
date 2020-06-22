import React, {useRef} from 'react';
import defaultStyles from './styles';
import Button from '../Button';
import errorMaster from './utilities/errorMaster';
import fieldController from './Fields/fieldController';
import constructFormState from './utilities/constructFormState';
import checkIfNeedsReInit from './utilities/checkIfNeedsReInit';
import defaultValidators from './utilities/defaultValidators';

const Form = props => {

  // style merge
  let styles = {...defaultStyles};
  if (props.styles) {
    Object.keys(props.styles).forEach(key => {
      styles[key] = {...styles[key], ...props.styles[key]}
    })
  }

  // merge custom validators into pre built
  const errorSheet = {...errorMaster, ...props.validators};

  // get form state from props and initialize Ref for value tracking
  const formRef = useRef({});
  const {formState, setFormState} = props.state;

  // check if fields need to reconstruct
  const refreshMemo = useRef(props.memo || false);
  const needsInit = useRef(true);
  needsInit.current = checkIfNeedsReInit(
    needsInit.current,
    formRef.current,
    props.settings,
  )
  if (typeof props.memo !== 'undefined' && props.memo !== refreshMemo.current) {
    needsInit.current = true;
    // refreshMemo.current = props.memo;
  }

  // update function
  const updateFormState = res => {
    formRef.current = {
      ...formRef.current,
      [res.id]: res.value,
    }
    setFormState(formRef.current)
  }

  // returns current form values(for controllers to get updated values if needed)
  const getCurrentForm = () => formRef.current;

  // intialize values to state in props on mount only
  if (needsInit.current) {
    const initial = constructFormState(props.settings, formRef.current, props.memo !== refreshMemo.current)
    setFormState({...initial})
    formRef.current = {...initial}
    refreshMemo.current = props.memo;
  }


  // initialize fields on mount only
  const fields = useRef([]);
  if (needsInit.current) {
    // map state/validators into fields
    let mapValuesToSettings = props.settings.slice();
    Object.keys(formRef.current).forEach(id => {
      mapValuesToSettings = mapValuesToSettings.map(obj => {
        // map state value
        if (obj.groupId === id) obj.selected = formRef.current[id]
        else if (obj.id === id) obj.value = formRef.current[id];
        obj.hideValidators = obj.hideValidators || [];
        obj.validators = obj.validators || [];
        const noHiddenValidators = typeof obj.hideValidators === 'undefined'
        || obj.validators.length === 0;
        // console.log(obj.validators, obj.id)
        if (Array.isArray(obj.validators) && (noHiddenValidators
        || !obj.hideValidators.includes('fieldRequired'))
        && obj.notRequired !== true && obj.type !== 'lineBreak' && obj.type !== 'title')
          obj.validators.push('fieldRequired');
        // map validator
        let initiallyValid = true;
        let validators = {};
        if (obj.validators && Array.isArray(obj.validators)) {
          initiallyValid = (noHiddenValidators || obj.validators.includes('fieldRequired'))
          obj.validators.forEach(validatorId => validators[validatorId] = errorSheet[validatorId]);
          const validatorType = obj.confirmPassword ? 'confirmPassword' : obj.type;
          if (defaultValidators[validatorType]) defaultValidators[validatorType]
          .forEach(validatorId => validators[validatorId] = errorSheet[validatorId]);
          obj.validators = validators;
          // obj.hideValidators = obj.hideValidators;
          // console.log(obj.validators, obj.type)
        }
        obj.valid = Object.keys(obj.validators).includes('fieldRequired') && (!obj.value || obj.value === '')
          ? false : initiallyValid;
        obj.mergedStyles = styles;
        if (typeof props.showErrors !== 'undefined') obj.readyToValidate = props.showErrors;
        // console.log(obj)
        if (obj.type === 'title' || obj.type === 'lineBreak') obj.valid = true;
        return obj;
      });
    })
    fields.current = mapValuesToSettings.map(settings => fieldController({
      ...settings,
      getCurrentForm: getCurrentForm,
      setter: updateFormState
    }));
  }


  const valid = fields.current.filter(field => field.valid === false).length === 0;

  const handleSubmit = e => {
    if (!fields.current[0].readyToValidate)
      fields.current.forEach(field => {
        if (typeof field.groupId === 'undefined' || formRef.current[field.groupId] !== '') {
          field.readyToValidate = true;
          field.validate({id: field.id, value: formRef.current[field.id]}, formRef.current);
          field.handleSetter({id: field.id, value: formRef.current[field.id]}, updateFormState)
        }
      });
    if (props.returnEvent) e.persist();
    if (!props.action) {
      if (e && e.stopPropagation) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
      }
      if (valid && props.submitable !== false) props.handleSubmit(e);
    }
  }

  if (!fields.current[0].handleSubmit) fields.current.forEach(field => field.handleSubmit = handleSubmit);

  return(
    <div style={styles.container}>
      {props.title && <h2 style={styles.title}>{props.title}</h2>}
      <form
        style={styles.form}
        action={props.action}
        method={props.method}
        id={props.id}
        key={props.id}
        onSubmit={handleSubmit}
        autoComplete={props.autoComplete}
      >
        {
          fields.current.map(field => field.construct())
        }
        <div style={styles.lineBreakLabel}></div>
        {props.submitable !== false && <Button
          styles={valid ? {...styles.submit, ...styles.submitValid} : styles.submit}
          hoverStyles={valid ? styles.submitHov : styles.submit}
          activeStyles={valid ? styles.submitAct : styles.submit}
          focusStyles={styles.submitFoc}
          type={'submit'}
        >
          {props.submitText || 'SEND'}
        </Button>}
      </form>
    </div>
  )
}

export default Form;
