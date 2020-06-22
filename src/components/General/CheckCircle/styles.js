import {absCenter} from '../globalStyles';

export default {
  container: {
    width: '32.5px',
    height: '32.5px',
    borderRadius: '200px',
    position: 'relative',
    display: 'block',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    padding: 0,
    margin: '0 auto',
    opacity: .75,
    fill: '#2C81D2',
  },
  containerHov: {
    opacity: 1,
  },
  containerFoc: {
    opacity: 1,
  },
  svg: {
    ...absCenter,
    display: 'block',
    height: '25px',
    width: '25px'
  },
  check: {
    animation: 'zoom-in .2s ease-out',
    transformOrigin: '50% 50%'
  },
  circle: {
    width: '40px',
  }
}
