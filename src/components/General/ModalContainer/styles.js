import {fixedFill, fixedCenter} from '../globalStyles';
import colors from '../colors';

export default {
  ovWrap: {
    ...fixedFill,
    background: 'rgba(0,0,0,0.18)',
    zIndex: 1100,
  },
  modal: {
    ...fixedCenter,
    background: '#fff',
    boxShadow: '0 3px 18px rgba(0,0,0,0.25)',
    borderBottom: '1px solid ' + colors.gray,
    zIndex: 1101,
    transformOrigin: '0 0',
    width: '326px',
    maxWidth: '90%',
    borderRadius: '4px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
}
