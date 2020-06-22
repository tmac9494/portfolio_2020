import React from 'react';
import styles from './styles';

const SingleDisplay = props => <span style={styles.selectedDisplay}>{props.selectedDisplay || props.selected}</span>;

export default SingleDisplay;
