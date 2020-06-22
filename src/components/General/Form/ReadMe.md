A component to easily build forms out using an array of objects which refer to each field in the form. Accepts custom validators and takes in state from outside the component to allow for custom effects based on the state of the form.


## Example:
	
	import React, {useState} from 'react';
	import Form from '../general/Form';
	

	const SomeComponent = props => {
		
		const [exampleFormState, setExampleFormState] = useState({});
		
		const fieldSettings = [
			{
				label: 'Label text input',
				type: 'text',
				id: 'text_input_id'
			},
			{
				label: 'Label for email input',
				type: 'email',
				id: 'email_input_id'
			}
		]
		
		const handleFormSubmit = () => {
			console.log(exampleFormState, 'this is the current form state');
		}
		
		
		
		return (
			<Form
				state={{
					formState: exampleFormState,
					setFormState: setExampleFormState,
				}}
				settings={formSettings}
				handleSubmit={handleFormSubmit}
			/>
		)
	}
	
	export default SomeComponent;
	
	
	


## Component Props:

### Required props:

##### state - *Object*
*the state should be an empty object created in React's UseState hook*

	state: {
		formState: *variable that refers to formState*,
		setFormState: *variable that refers for formState setter*,
	}

##### handleSubmit - *Function*
	handleSubmit: *function to run when for is valid and user hits submit*

##### settings - *Array* of *Object*
	settings: *Array of objects that dictate each field in the form*	


### Optional Props:

##### submitText - *String*
	submitText: *String to change the text of the submit button(Default=SEND)*

##### submitable - *Boolean*
	submitable: *Boolean that tells the form whether or not to render submit button*

##### validators - *Object*
	validators: *Object that adds custom validators to the validator options(most used validators like email are built in the the field types)*

##### memo - *String*
	memo: *String that will force the fields to re-render whenever it changes(for special use cases)*

##### showValidators - *Boolean*
	showValidators: *Boolean that tells the form whether or not to show error messages from validators(Default=True)*

##### title - *String*
	title: *Title to display above form(Default None)*

##### action, method, id - *String*
	action, method, id: *props to add to default form attributes*

##### returnEvent - *Boolean*
	returnEvent: *Used to force form to return the browser event for submitting a form instead of the react synthetic event*

##### styles - *Object*
	styles: *Object to merge styles on top of the default styles for the form container(each field accepts its own styles prop in settings as well)*



## Field Settings:

The fields are created by passing an Array of Objects into the settings prop of the form component.

### Required Properties of a field setting object:

##### id - *String*
	id: *string that should be unique across all elements on the page(this is also the property that the form will use to name the field value in FormState)*

##### type - *String*
	type: *String that tells the form what type of input this is*


### Optional Properties of setting object:

##### label - *String*
	label: *String that dictates the label for this input*

##### placeholder - *String*
	placeholder: *String that dictates the placeholder for this input*
	
##### labelStyles - *Object*
	labelStyles: *Object to style the wrapping label around the input*

##### styles - *Object*
	styles: *Object to style the input element itself.(for select, checkboxes, upload, and other custom components - refer to the corrosponding components style ids to target the desired elements)*

##### validators - *Array* of *String*
	validators: *Array of validator ids to apply to this element(some validators are default)*

##### hideValidators - *Array* of *String*
	hideValidators: *Array of validator ids that you want to hide the messages for if they fail*

##### name - *String*
	name: *String to fill name attribute on input*

##### for - *String*
	for: *String to fill for attribute on input*

##### required - *Boolean*
	required: *Boolean that tells the form whether or not this field is required to be filled in order to submit.(Default=True)*

##### confirmPassword - *String*
*refers to id of password that you want to compare for match*

	confirmPassword: *ID of password element you would like to compare to this input for validation.(Confirm Password Field - should refer to the main password field id)
	
	
### Field Types:

text: *text input*

email: *email input*(default validator: email formating)

drop: *Upload componet that will take in files*(Still Experimental)

phone: *phone input*(default validator: phone formating)

password: *password input*(default validator: password formatting)

select: *Select Input*

checkbox: *Checkbox input*(uses checkCircle component)

radio: *radio button*(uses checkCircle component)

switch: *on/off switch*(uses ToggleSwitch component)

title: *displays a title in the form*

lineBreak: *forces a linebreak in the form to deal with floating element errors*



### Field Type Specific Properties:

title:
	
	value: *String that dictates the text of the title*

drop: 

	setter: *function to run when file is dropped/uploaded into field(passes files and id as parameters).*

options: 
*for types: checkbox, radio, select, multiSelect*

	options: [
		[<option_1_text>, <option_1_id>],
		[<option_2_test>, <option_2_id>]
	]
	
	options: [
		['Yes, I Agree', 'user_has_agreed'],
		['No, I Disagree', 'user_has_disagreed']
	]




## Custom Validators: 
custom validators can be added in the validators prop on the Form Component.

### The Validtors Object:

	{
		<ValidatorID>: {
			message: *String to display in error box when this validator fails*,
			test: *Function to test the input for validation, return true if valid, false if invalid. The value and id of the input is passed as an object parameter*
		}
	}

	{
		isFilled: {
			message: 'This field is required'
			test: input => {
				if (input.value.trim() === '') {
					return false;
				} else {
					return true;
				}
			}
		}
	}
	
### To Add a custom validator to input:

	[
		...,
		...,
		{
			type: 'text',
			label: 'Example Label',
			validators: [<Validator1ID>, <Validator2ID>],
		}
	
	]

	
	
	
	