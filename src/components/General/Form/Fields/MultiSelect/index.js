import React, {useState, useCallback, useRef} from 'react';
import Button from '../../../Button';
import MultiDisplay from './MultiDisplay';
import SingleDisplay from './SingleDisplay';
import styles from './styles';
import Animation from '../../../AnimationWrap/InOutAnimation';
import Options from './Options';
import CloseSvg from './CloseSvg';
import Search from './Search';
const animation = {
  in: [
    ['opacity', {0: 0, 100: 1}, 180],
    ['transform', {0: 100, 80: -3, 100: 0}, 320, {easing: 'easeOut', valueMap: 'translateY($vpx)'}]
  ],
  out: [
    ['opacity', {0: 1, 100: 0}, 180, {delay: 100}],
    ['transform', {0: 0, 20: -3, 100: 100}, 320, {easing: 'easeIn', valueMap: 'translateY($vpx)'}]
  ]
};

const MultiSelect = props => {
  const selectType = props.type || 'select';
  const Display = selectType === 'multiselect' ? MultiDisplay : SingleDisplay;
  const waitingForSelect = useRef(false);
  const fromContainer = useRef(false);
  const [optionsView, setOptionsView] = useState(false);
  const [optionsRender, setOptionsRender] = useState(false);
  const [blurEffect, setBlurEffect] = useState(false);
  const [contentHeight, setContentHeight] = useState(null);
  const [options, setOptions] = useState(() => props.options);
  if (optionsView && !optionsRender) setOptionsRender(true);
  const [widths, setWidths] = useState({
    display: '80%',
    options: '95%',
    selected: '100%',
  })

  const selected = props.selected || (selectType === 'multiselect' ? [] : '');
  const selectedDisplay = (props.selected
    ? (selectType === 'select' && Array.isArray(props.options[0])
      ? props.options.filter(option => option[1] === props.selected)[0][0]
      : props.selected)
    : false
  );
  const handleSelect = (val) => {
    let update;
    if (selectType === 'multiselect') {
      fromContainer.current = true;
      update = selected.slice();
      if (selected.includes(val)) update = update.filter(option => option !== val)
      else update.push(val);
    } else update = val;
    props.setter({
      value: update,
      id: props.id || null,
    })
    if (selectType === 'select') {
      setOptionsView(false);
    }
    waitingForSelect.current = false;
  }

  const measureDisplay = useCallback(node => {
    if (node) {
      const dw = Math.floor(node.clientWidth * .95);
      setWidths({
        display: node.clientWidth - 37 + 'px',
        options: dw % 2 ? dw + 1 + 'px' : dw,
        selected: node.clientWidth - 62 + 'px',
      })
    }
  }, [])

  if (blurEffect && !waitingForSelect.current && !fromContainer.current) {
    setOptions(props.options);
    setOptionsView(false)
    setBlurEffect(false)
  }

  const measureDisplayHeight = useCallback(node => {
    if (node && contentHeight !== node.clientHeight + 2) {
      setContentHeight(node.clientHeight + 2);
    }
  })

  const toggleOptionsView = e => {
    e.preventDefault();
    e.stopPropagation();
    setOptionsView(!optionsView);
    if (optionsView) setOptions(props.options)
  }

  const clearSelection = () => {
    props.setter({
      value: selectType === 'multiselect' ? [] : '',
      id: props.id || null,
    })
    if (optionsView) {
      setOptions(props.options)
      setOptionsView(false);
    }
  }

  const filterOptions = value => {
    if (value === '') setOptions(props.options)
    else setOptions(props.options.filter(option =>
      (Array.isArray(option) ? option[0] : option).toLowerCase().includes(value.toLowerCase())
    ))
  }

  let buttonStyles = {...styles.button};
  if (contentHeight) buttonStyles.height = contentHeight + 'px';
  if (optionsView) buttonStyles = {...buttonStyles, ...styles.buttonAct};

  const searchIsHidden = props.hiddenSearch || (props.options && props.options.length <= 5);

  return(
    <div style={styles.container} id={props.id} ref={measureDisplay}>

      <Button
        styles={buttonStyles}
        hoverStyles={optionsView ? null : styles.buttonHov}
        onMouseDown={() => fromContainer.current = optionsView}
        onClick={() => setOptionsView(!optionsView)}
      >
        {props.btnText || <svg style={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"/></svg>}
      </Button>

      <div
        style={{...styles.displayContainer, width: widths.display}}
        onClick={toggleOptionsView}
        onMouseDown={() => fromContainer.current = optionsView}
        ref={measureDisplayHeight}
      >
        {selected !== null &&
        (selected.length > 0 || typeof selected === 'number')
          ? <div style={{width: widths.selected, padding: '0 1px 3px'}}>
              <Display
                width={widths.selected}
                selected={selected}
                selectedDisplay={selectedDisplay}
                options={props.options}
                value={selectType === 'multiselect'
                  ? selected
                  : (selected === '' ? null : selected)
                }
                type={props.displayType || 'inline'}
                selectType={selectType}
                deSelect={(option) => handleSelect(Array.isArray(option) ? option[1] : option)}
              />
              <Button
                onClick={clearSelection}
                styles={styles.clearSelectionBtn}
                hoverStyles={styles.clearSelectionBtnHov}
              >
                <CloseSvg styles={styles.clearSelectionSvg} />
              </Button>
            </div>
          : <span style={styles.placeholder}>{props.placeholder || 'N/A'}</span>
        }
      </div>

      {optionsRender &&
        <Animation
          condition={optionsView}
          callback={!optionsView ? () => setOptionsRender(false) : null}
          wrapStyles={{...styles.listContainer, width: widths.options}}
          fixedTransform='translateX(-50%)'
          animation={animation}
        >
            <Search
              setBlurEffect={setBlurEffect}
              blurEffect={blurEffect}
              fromContainer={fromContainer}
              waitingForSelect={waitingForSelect}
              hiddenSearch={searchIsHidden}
              styles={styles}
              filterOptions={filterOptions}
              selectType={selectType}
              selected={selected}
            />
            <Options
              options={options || []}
              hiddenSearch={searchIsHidden}
              mouseDown={() => waitingForSelect.current = true}
              fromContainer={fromContainer}
              handleSelect={handleSelect}
              selected={selected}
              selectType={selectType}
            />
        </Animation>
      }
    </div>
  )
}

export default MultiSelect;
