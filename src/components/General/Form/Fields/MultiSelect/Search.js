import React, {useState} from 'react';


const Search = props => {

  const [value, setValue] = useState('');
  const selectedRef = React.useRef(props.selectType === 'multiselect' ? props.selected.join() : null);
  const needsUpdate = React.useRef(false);
  const autofocusEvent = React.useCallback(node => {
    if (node) node.focus();
  })
  if (props.selectType === 'multiselect' && needsUpdate.current && selectedRef.current === props.selected) {
    props.fromContainer.current = false;
    props.setBlurEffect(true);
    needsUpdate.current = false;
  }
  if (props.selectType === 'multiselect' && selectedRef.current !== props.selected) {
    selectedRef.current = props.selected;
  }

  const handleChange = e => {
    setValue(e.target.value);
    props.filterOptions(e.target.value);
  }
  const input = <input
    style={props.hiddenSearch ? props.styles.hidden : props.styles.search}
    autoFocus
    type='text'
    onBlur={() => {
      if (!props.fromContainer.current) {
        console.log('blur')
        props.setBlurEffect(true)
      } else {
        console.log('no blur')
        props.fromContainer.current = false;
        needsUpdate.current = true;
      }
    }}
    onChange={handleChange}
    onKeyDown={e => {
      if (e.keyCode === 13) {
        e.preventDefault();
        e.stopPropagation();
      }
    }}
    value={value}
    ref={autofocusEvent}
   />

  return(
    props.hiddenSearch
      ? input
      : <div style={props.styles.searchContainer}>{input}</div>

  );
}

export default Search;
