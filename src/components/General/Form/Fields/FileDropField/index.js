import React, {useState, useEffect} from 'react';
import styles from './styles';
import SynthButton from './SynthButton';


const FileDropField = props => {

  let dropStyles = {...styles.dropContainer, ...props.styles};

  // focus state
  const [focus, setFocus] = useState(false);
  const focusOn = () => setFocus(true);
  const focusOff = () => setFocus(false);

  // drag events
  const [droppable, setDroppable] = useState({
    over: false,
    overChild: false,
  });
  const updateDropState = (parent, child) => {
    setDroppable({
      over: parent === null ? droppable.over : parent,
      overChild: child === null ? droppable.overChild : child
    })
  }

  const handleDragEnter = e => {
    console.log('d-enter');
    updateDropState(true, false);
  }
  // const handleDragOver = e => {
  //   console.log('d-over-child');
  //   if (!droppable.over) updateDropState(true, true);
  // }
  const handleDragLeave = e => {
    console.log('d-Leave');
    if (!droppable.overChild) updateDropState(false, false);
  }

  // drop event
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    const filePack = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    console.log(filePack[0], 'drop');
    updateDropState(false, false);
    props.setter({
      value: filePack,
      id: props.id,
      name: props.name
    })
  }

  const isDroppable = droppable.over || droppable.overChild;
  // event styles
  if (focus) dropStyles = {...dropStyles, ...styles.dropContainerFocus}
  if (isDroppable) dropStyles = {...dropStyles, ...styles.dropContainerDroppable}


  // window drop listeners
  const windowDrop = e => {
    if (e.persist) e.persist();
    e.preventDefault();
    if (droppable) handleDrop(e);
  }
  const windowDrag = e => {
    e.preventDefault();
  }
  useEffect(() => {
    window.addEventListener('drop', windowDrop);
    window.addEventListener('dragover', windowDrag);
    return (() => {
      window.removeEventListener('drop', windowDrop);
      window.removeEventListener('dragover', windowDrag)
    });
  }, [])

  return(
    <div style={{...styles.container, ...props.labelStyles}}>
      <label
        onFocus={focusOn}
        onBlur={focusOff}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={isDroppable ? null : handleDragEnter}
        style={dropStyles}
        htmlFor={props.id + '_inputElement'}
      >
        <div style={styles.textContainer}>
          <SynthButton
            btnText={props.btnText}
            styles={styles.button}
            hoverStyles={styles.buttonHov}
          />
          <span
            style={styles.bgText}
          >
              {props.bgText || 'or Drop one here'}
          </span>
        </div>
      </label>
      <input
        onChange={handleDrop}
        style={styles.input}
        onFocus={focusOn}
        onBlur={focusOff}
        id={props.id + '_inputElement'}
        name={props.id + '_inputElement'}
        type='file'
      />
    </div>
  );
}

export default FileDropField;
