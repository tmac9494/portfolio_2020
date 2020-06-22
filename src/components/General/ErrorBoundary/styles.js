import {absCenter} from '../globalStyles.js';
import colors from '../colors';


export default {
  container: {
    minWidth: '100%',
    height: '100%',
    minHeight: '500px',
    position: 'relative',
    background: colors.background,
  },
  content: {
    ...absCenter,
    width: '90%',
    textAlign: 'center'
  },
  svg: {
    display: 'block',
    width: '140px',
    height: '140px',
    fill: colors.xdDarkBlue,
    margin: '0 auto',
  },
  message: {
    margin: '0 auto',
    textAlign: 'center',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: colors.black,
  },
  link: {
    background: colors.xdDarkBlue,
    color: '#fff',
    display: 'inline-block',
    width: 'auto',
    textAlign: 'center',
    padding: '10px 28px',
    margin: '24px auto 0'
  },
  linkHover: {
    background: colors.xdHighlight,
  }

}
