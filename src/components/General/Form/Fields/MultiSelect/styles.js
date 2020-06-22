import {absCenter, absCenterY, absCenterX} from '../../../globalStyles';
import colors from '../../../colors';
const height = '36px'
export default {
  container: {
    borderRadius: '2px',
    minHeight: height,
    fontSize: '1.4rem',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 50,
  },
  placeholder: {
    ...absCenterY,
    left: '5px', right: 'auto',
    color: '#ababab',
    fontWeight: 'normal',
  },
  button: {
    width: '36px',
    maxWidth: '110px',
    padding: '0',
    minHeight: height,
    background: '#fafdfe',
    color: '#3c3e48',
    fill: colors.xdDarkBlue,
    verticalAlign: 'top',
    borderTopLeftRadius: '2px',
    borderBottomLeftRadius: '2px',
    border: '1px solid rgba(0,22,66,0.32)',
    position: 'relative'
  },
  buttonAct: {
    background: colors.xdHighlight,
    color: '#fff',
    fill: '#fff',
    boxShadow: 'inset 1px 2px 3px rgba(0,0,0,0.24)'
  },
  buttonHov: {
    background: '#f0f6f9',
    fill: colors.xdDarkBlue,
  },
  buttonText: {
    ...absCenter,
  },
  svg: {
    ...absCenter,
    display: 'block',
    width: '15px',
    height: '15px'
  },
  listContainer: {
    ...absCenterX,
    top: '95%',
    zIndex: 21,
    width: '95%',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    border: '1px solid rgba(0,22,66,0.32)',
    background: '#fafdfe',
  },
  optionsContainer: {
    overflowY: 'auto',
    maxHeight: '250px',
    paddingTop: '31px',
    fontWeight: 'normal',
  },
  listItem: {
    background: 'none',
    color: '#3c3e48',
    display: 'block',
    textAlign: 'left',
    // border: '1px solid rgba(0,22,66,0.32)',
    width: '100%',
    padding: '8px',
    fontWeight: 'normal',
  },
  listItemHov: {
    background: '#f0f6f9',
    // background: colors.xdHighlight,
    // color: '#fff'
  },
  displayContainer: {
    position: 'relative',
    color: '#3c3e48',
    border: '1px solid rgba(0,22,66,0.32)',
    background: '#fff',
    minHeight: height,
    width: '80%',
    display: 'inline-block',
    verticalAlign: 'top',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    borderLeft: 'none',
    fontWeight: 'normal',
  },
  multiSelectedSvg: {
    display: 'block',
    width: '20px',
    height: '20px',
    float: 'right',
  },
  clearSelectionBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 'auto',
    height: '100%',
    width: 'auto',
    zIndex: 3,
    background: '#fafdfe',
    fill: 'rgba(0,22,66,0.42)',
    padding: 0,
    // background: 'none',
    borderLeft: '1px solid rgba(0,22,66,0.32)'
    // background: 'rgba(255,255,255,.7)',
  },
  clearSelectionBtnHov: {
    fill: colors.xdDarkBlue,
    background: '#f0f6f9'
  },
  clearSelectionSvg: {
    display: 'block',
    width: '25px',
    height: '25px'
  },
  selectedButton: {
    display: 'inline-block',
    padding: '4px',
    marginLeft: '3px',
    marginTop: '3px',
    borderRadius: '4px',
    background: colors.xdDarkBlue,
    fill: '#fff',
    color: '#fff',
  },
  selectedButtonHov: {
    background: colors.xdHighlight
  },
  selectedDisplay: {
    ...absCenterY,
    color: colors.black,
    padding: '0 2px 0 4px',
    width: '100%',
  },
  hidden: {
    width: '0px',
    height: '0px',
    maxWidth: '0px',
    maxHeight: '0px',
    display: 'inherit',
    opacity: 0,
    border: 0,
    outline: 0,
    margin: 0,
    padding: 0,
  },
  search: {
    border: 0,
    // borderBottom: '1px solid rgba(0,22,66,0.32)',
    width: '100%',
    padding: '6px',
  },
  searchContainer: {
    position:'absolute',
    top: '0',
    width: '100%',
    boxShadow: '0 2px 4px -2px rgba(0,0,0,0.32)'
  }
}
