import React from 'react';
import Button from '../../../Button';
import styles from './styles';
import CloseSvg from './CloseSvg';


const MultiDisplay = props => {

  const items = Array.isArray(props.options[0])
    ? props.selected.map(item => props.options.filter(option => option[1] === item)[0])
    : props.selected;

  return(
    <React.Fragment>
      {items.map((item, i) => (
        <Button
          styles={styles.selectedButton}
          hoverStyles={styles.selectedButtonHov}
          onClick={props.deSelect}
          clickParam={item}
          key={Array.isArray(item) ? item[1] : item}
        >
          {Array.isArray(item) ? item[0] : item}
          <CloseSvg styles={styles.multiSelectedSvg} />
        </Button>
      ))}
    </React.Fragment>
  )
}

export default MultiDisplay;
