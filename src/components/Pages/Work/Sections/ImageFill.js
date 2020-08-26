import React, {useCallback, useState, useRef} from 'react';

const ImageFill = props => {
  const [dimensions, setDimensions] = React.useState({
    image: null,
    container: null,
  })
  const dimensionsRef = useRef(dimensions);

  const handleDimensions = (node, type) => {
    dimensionsRef.current[type] = [node.clientWidth, node.clientHeight];
    setDimensions({...dimensionsRef.current})
  }

  const measureContainer = useCallback(node => {
    if (node && dimensions.container === null) {
      handleDimensions(node, 'container');
    }
  }, [dimensions.container])

  const measureImage = useCallback(node => {
    if (node && dimensions.image === null) {
      handleDimensions(node, 'image');
    }
  }, [dimensions.image])

  const expandHeight = dimensions.image && dimensions.container && dimensions.image[1] < dimensions.container[1];

  const imageStyles = {
    width: expandHeight ? 'auto' : '100%',
    height: expandHeight ? '100%' : 'auto'
  }

  return(
    <div className='image-container relative' ref={measureContainer}>
      <img
        style={imageStyles}
        className='abs-center'
        src={props.image}
        alt={props.alt}
        ref={measureImage}
      />
      {props.children}
    </div>
  )
}

export default ImageFill;
