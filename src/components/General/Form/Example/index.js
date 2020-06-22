import React, {useState} from 'react';
import styles from './styles';
import Form from '../index.js';

const FeedbackForm = props => {

  const [formInput, setFormInput] = useState({type: '',subject: '', message: '',})
  const [emailInput, setEmailInput] = useState('');
  const [check, setCheck] = useState([]);
  const [toggleCheck, setToggleCheck] = useState(false);

  const handleFormInput = (res) => {
    const update = {...formInput};
    update[res.id] = res.value;
    setFormInput(update);
  }

  const handleCheckSelect = (value) => {
    let checks = check.slice();
    if (checks.includes(value)) checks = checks.filter(val => val !== value)
    else checks.push(value);
    console.log(checks)
    setCheck(checks);
  }

  // ----- field options:
  /* -----
  label: (string) - text above/beside input field
  -
  type: (string) - defines the type of input field
    + options: select, email, text, textarea, checkbox, radio, title(text break), file
  -
  options: (select type only) array of options for select component
  -
  selected: (select type only) currently selected value
  -
  setter: function to update state value(returns object with value and id of input element)
  -
  id: (string - required) unique identifier for this input field
  -
  placeholder: (text & textarea types) placeholder text attribute
  -
  validators: (array) array of IDs of validators to run on this input
  -
  hideValidatorMessages: (array) array of IDs of validators to hide the messages for
    (will still validate though)
  -
  value: current state value of this input field
  -
  styles: (object) object of styles to spread on input
    + check child components styles for specific style names for elements
  -
  labelStyles: (object) object of styles to spread on label(input container)
  -
  switchValues: (array) array of 2 strings to use as switch buttons on/off text
  -
  -------- */


  const settings = [
    {
      label: 'Please select the nature of this message.',
      type: 'select',
      options: ['Reporting a bug', 'Feedback on application'],
      setter: (val) => handleFormInput({value: val.value, id: 'type'}),
      selected: formInput.type,
      id: 'feedback_type'
    },
    {
      placeholder: 'Email Test',
      type: 'email',
      value: emailInput,
      setter: res => setEmailInput(res.value),
      id: 'test_email',
      validators: ['invalidEmail', 'fieldRequired']
    },
    {
      placeholder: 'Subject Test',
      type: 'text',
      value: formInput.subject,
      setter: handleFormInput,
      id: 'subject',
    },
    {
      label: 'Checkbox 1',
      labelStyles: {
        display: 'inline-block',
        width: 'auto',
      },
      type: 'checkbox',
      value: 'Value 1',
      selected: check,
      setter: val => {
        console.log(val)
        handleCheckSelect(val.value)
      },
      id: 'test_check'
    },
    {
      label: 'Checkbox 2',
      labelStyles: {
        display: 'inline-block',
        width: 'auto',
        marginLeft: '10px'
      },
      type: 'checkbox',
      value: 'Value 2',
      selected: check,
      setter: val => {
        console.log(val)
        handleCheckSelect(val.value)
      },
      id: 'test_check_2'
    },
    {
      label: 'Switch Test',
      type: 'switch',
      switchValues: ['On', 'Off'],
      value: toggleCheck,
      setter: val => setToggleCheck(val.value),
      id: 'test_switch'
    },
    {
      placeholder: 'Feedback Message',
      type: 'textarea',
      value: formInput.message,
      setter: handleFormInput,
      id: 'message'
    }
  ]

  const handleSubmit = () => {
    console.log(formInput, emailInput, check, toggleCheck)
  }

  return(
    <div style={styles.container}>
      <Form
        settings={settings}
        handleSubmit={handleSubmit}
      />
    </div>
  )

}

export default FeedbackForm;
