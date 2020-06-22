import React, {useState} from 'react';
import styles from './styles';
import Animation from '../AnimationWrap/InOutAnimation';
import ClickOverlay from '../ClickOverlay';

const ModalContainer = props => {

  const [show, setShow] = useState(false);
  if (props.open && !show) setShow(true);

  const ovAnimation = {
    in: [['opacity', {0: 0, 100: 1}, 280]],
    out: [['opacity', {0: 1, 100: 0}, 280]]
  }
  const defaultAnim = {
    in: [
      ['opacity', {0: 0, 100: 1}, 360],
      ['transform', {0: 10, 80: -52, 100: -50}, 420, {valueMap: 'translateY($v%)', easing: 'easeOut'}]
    ],
    out: [
      ['opacity', {0: 1, 100: 0}, 360, {easing: 'easeIn'}],
      ['transform', {0: -50, 30: -52, 100: 10}, 420, {valueMap: 'translateY($v%)', easing: 'easeIn'}]
    ]
  }
  const modalAnimation = {
    in: props.in || defaultAnim.in,
    out: props.out || defaultAnim.out,
  }

  const animCallback = () => setShow(false);

  let modalMaxHeight = Math.floor(window.innerHeight * .9);
  if (modalMaxHeight % 2 !== 0) modalMaxHeight++;
  let modalMaxWidth = Math.floor(window.innerWidth * .9);
  if (modalMaxWidth % 2 !== 0) modalMaxWidth++;

  return(
    (show || props.showOverlay)
    ? <React.Fragment>
        <Animation
          animation={ovAnimation}
          condition={props.showOverlay}
          wrapStyles={styles.ovWrap}
        >
          <ClickOverlay event={props.close} />
        </Animation>
        {show && <Animation
          animation={modalAnimation}
          condition={props.open}
          wrapStyles={{
            ...styles.modal,
            maxHeight: props.maxHeight || modalMaxHeight,
            height: props.height || styles.modal.height,
            maxWidth: props.maxWidth || modalMaxWidth,
            width: props.width || styles.modal.width,
            ...props.wrapStyles,
          }}
          fixedTransform={'translateX(-50%)'}
          callback={!props.open ? animCallback : null}
        >
          {props.children || props.modalContent}
        </Animation>}
      </React.Fragment>
    : null
  )

}


export default ModalContainer;
