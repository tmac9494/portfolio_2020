import React, {useState} from 'react';


const SynthButton = props => {
  const [hover, setHover] = useState(false);
  const hoverOn = () => setHover(true);
  const hoverOff = () => setHover(false);

  let styles = {...props.styles};
  if (hover) styles = {...styles, ...props.hoverStyles};

  return(
    <span
      onMouseEnter={hoverOn}
      onMouseLeave={hoverOff}
      style={styles}
    >
      {props.btnText || 'Choose a File'}
    </span>
  );
}

export default SynthButton;
