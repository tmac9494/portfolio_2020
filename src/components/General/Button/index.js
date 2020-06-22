
/* required props:
---------------------
None
  optional props:
---------------------
- onClick: func = clieck event function
- styles: obj = style object to apply to button
- hoverStyles: obj = style object for hover event
- activeStyles: obj = style object for click event
- focustStyles: obj = style object for focus event
- className: str = css className for buttonStyle
- type: str = type attribute for button
*/



import React, {useState} from 'react';
import defaultStyles from './styles';
import PropTypes from 'prop-types';

function Button(props) {
  // default styles
  const styles = {
    ...defaultStyles,
    ...(props.styles ? props.styles : {})
  }

  // synthetic event state
  const [synEvents, setSynEvents] = useState({
    focus: false,
    hover: false,
    active: false,
  });

  // click event handler

  const propBuiltClickEvent = props.onClick && props.clickParam !== null
    ? (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();
        return props.onClick(props.clickParam)
      }
    : null;

  // cancel events in special conditions
  const eventChecks = type => {
    let synState = {};
    // on click down and mouse out set active to false
    if (type === 'hover' && !synState[type]) {
      synState.active = false;
    }

    return synState;
  }
  // interaction functions for changing event state
  const interact = (type, force=null) => {
    const overrides = eventChecks(type);
    let events = {...synEvents};
    events[type] = !events[type];
    if (force !== null) overrides[type] = force;
    // special cases
    if (type === 'active' && props.onMouseDown){
      props.onMouseDown(props.clickParam);
    }
    Object.assign(events, overrides);
    setSynEvents(events);
  }

  const handleHoverOver = () => {
    interact('hover', true);
    if (props.onMouseOver) props.onMouseOver(props.mouseOverParam);
    if (props.onMouseEnter) props.onMouseEnter(props.mouseOverParam);
  };
  const handleHoverOut = () => {
    interact('hover', false);
    if (props.onMouseOut) props.onMouseOut(props.mouseOutParam)
    if (props.onMouseLeave) props.onMouseLeave(props.mouseOutParam)
  };
  const handleActive = () => interact('active');
  const handleFocus = () => {
    interact('focus');
    if (synEvents.focus && props.onBlur) props.onBlur();
  };

  // merge style objects based on event state
  let eventStyles = {};
  Object.keys(synEvents).forEach(event => {
    const propId = event + 'Styles';
    if (props[propId] && synEvents[event])
      eventStyles = {...eventStyles, ...props[propId]};
  })
  const buttonStyles = {...styles, ...eventStyles};

  return(
    <button
      onMouseOverCapture={props.onMouseEnter ? null : handleHoverOver}
      onMouseOutCapture={props.onMouseLeave ? null : handleHoverOut}
      onMouseEnter={handleHoverOver}
      onMouseLeave={handleHoverOut}
      onMouseDownCapture={handleActive}
      onMouseUpCapture={handleActive}
      onFocus={handleFocus}
      onBlur={handleFocus}
      onClick={propBuiltClickEvent || props.onClick || null}
      className={props.className}
      style={buttonStyles}
      type={props.type || null}
      title={props.title || null}
      onAnimationEnd={props.onAnimationEnd || null}
      id={props.id || null}
    >
      {props.children}
    </button>
  )
}

Button.propTypes = {
  hoverStyles: PropTypes.object,
  focusStyles: PropTypes.object,
  activeStyles: PropTypes.object,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
}

export default Button;
