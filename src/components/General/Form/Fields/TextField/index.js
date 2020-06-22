import React, {useState} from 'react';
import styles from './styles';

const TextField = props => {

  const [focus, setFocus] = useState(false);

  const focusOn = () => setFocus(true);
  const focusOff = (e) => {
    setFocus(false);
    if (props.onBlur){
      setTimeout(() => {
        props.onBlur(e);
      }, 150)
    }
  }
  const txtInputStyles = props.styles
  ? {...styles.textInput, ...props.styles}
  : styles.textInput;
  const txtareaInputStyles = props.styles
  ? {...txtInputStyles, ...styles.textarea, ...props.styles}
  : {...txtInputStyles, ...styles.textarea};

  const inputStyles = props.type === 'textarea' ? txtareaInputStyles : txtInputStyles;
  const focusStyles = props.styles
  ? {...styles.textInputFoc, ...props.styles.textInputFoc}
  : styles.textInputFoc;

  let elementStyles = focus ? {...inputStyles, ...focusStyles} : inputStyles;

  const handleUpdate = e => {
    // props.setter({
    //    value: e.target.value,
    //    id: e.target.id,
    //    name: e.target.name,
    // })

    let synthValue = null, validPhone;

    if (props.type === 'name')
    synthValue = e.target.value.replace(/[^a-zA-Z '-]/g, "");

    if (props.type === 'phone') {
      let value = e.target.value.replace(/[^0-9]/g, "");
      const length = value.length;
      // strip characters as needed
      if (length > 10 && value.charAt(0) === '1') value = value.slice(1, value.length);
      // only numbers
      validPhone = length <= 10
      && (value.match(/^[-+]?[0-9() -]+$/) || value === '');
      // synthetic value formatting
      if (length === 4) synthValue = `(${value.slice(0, 3)}) ${value.charAt(3)}`
      else if (length > 4 && length <= 6)
        synthValue = `(${value.slice(0, 3)}) ${value.slice(3, value.length)}`
      else if (length > 6)
        synthValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, value.length)}`
      else synthValue = value;
    }
    synthValue = synthValue === null ? e.target.value : synthValue;

    const validUpdate = props.type === 'phone' ? validPhone
    // : props.type === 'name' ? validName
    : true;

    if (validUpdate) {
      // console.log(e.keyCode, e);
      // if (e.keyCode === 13 && props.type === 'textarea' && props.options.submitOnEnter) {
      //   e.preventDefault();
      //   props.handleSubmit();
      // } else {
        props.setter({
          value: (synthValue || ''),
          id: e.target.id,
          name: e.target.name
        })
      // }
    }
  }


  const element = React.createElement(
    props.type === 'textarea' ? 'textarea' : 'input',
    {
      type: props.type,
      value: props.value,
      placeholder: props.placeholder,
      onFocus: focusOn,
      onBlur: focusOff,
      onChange: handleUpdate,
      onKeyPress: props.options.submitOnEnter && props.type === 'textarea' ? e => {
        if (e.nativeEvent && e.nativeEvent.keyCode === 13) {
          e.preventDefault();
          props.handleSubmit({value: e.target.value, id: e.target.id, name: e.target.name});
        }
      } : null,
      id: props.id,
      name: props.id,
      style: elementStyles,
      autoFocus: props.autoFocus,
      autoComplete: props.autoComplete,
    }
  );

  return(
    <div style={styles.container}>
      {element}
    </div>
  )
}


export default TextField;
