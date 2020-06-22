import {absCenter} from '../../../globalStyles';
import colors from '../../../colors';
import {btn_lg, btn_c_darkToHighlight, font_s_lg} from '../../../styleGuide';

export default {
  container: {
    width: '100%',
    borderRadius: '2px',
  },
  input: {
  	width: '0.1px',
  	height: '0.1px',
  	opacity: '0',
  	overflow: 'hidden',
  	position: 'absolute',
  	zIndex: '-1',
  },
  dropContainer: {
    borderRadius: '2px',
    textAlign: 'center',
    display: 'block',
    position: 'relative',
    padding: '5px',
    width: '100%',
    height: '220px',
    maxHeight: '100%',
    background: '#f0f6f9',
    border: '1px solid',
    borderColor: 'rgba(0,22,66,0.32)'
  },
  dropContainerFocus: {
    borderColor: 'rgba(0,22,66,0.32)'
  },
  dropContainerDroppable: {
    borderColor: '#2C81D2'
  },
  button: {
    ...btn_lg,
    ...btn_c_darkToHighlight.base,
    borderRadius: '200px',
    cursor: 'pointer',
    display: 'block',
    fontWeight: 'bold',
  },
  buttonHov: {
    ...btn_c_darkToHighlight.hover,
  },
  bgText: {
    ...font_s_lg,
    marginTop: '8px',
    display: 'block',
    fontWeight: 'bold',
  },
  textContainer: {
    ...absCenter,
    color: '#4d565d',
    height: '74px',
    width: '150px',
  }
}
