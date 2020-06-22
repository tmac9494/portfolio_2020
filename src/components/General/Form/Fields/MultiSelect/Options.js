import React from 'react';
import styles from './styles';
import Button from '../../../Button';


const Options = props => {
  return(
    <div style={{...styles.optionsContainer, paddingTop: props.hiddenSearch ? 0 : styles.optionsContainer.paddingTop}}>
      {props.options.filter(option =>
        Array.isArray(option)
        ? (props.selectType === 'multiselect'
            ? !props.selected.includes(option[1])
            : props.selected !== option[1]
          )
        : (props.selectType === 'multiselect'
            ? !props.selected.includes(option)
            : props.selected !== option
          )
      ).map((option, i) => {
        const isArray = Array.isArray(option)
        return(
          <Button
            key={isArray ? option[1] : option}
            styles={styles.listItem}
            hoverStyles={styles.listItemHov}
            activeStyles={styles.listItemActive}
            onMouseDown={props.mouseDown}
            onClick={props.handleSelect}
            clickParam={isArray ? option[1] : option}
          >
            {isArray ? option[0] : option}
          </Button>
        )
      })}

    </div>
  )
}


export default Options;
