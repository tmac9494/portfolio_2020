import React, { PropsWithChildren, useCallback, useState } from "react";

enum ImageFillElements {
  Image = "image",
  Container = "container",
}

// force image element to fill its container

export const ImageFill: React.FC<
  PropsWithChildren<{
    image: string;
    alt: string;
  }>
> = ({ image, alt, children }) => {
  const [dimensions, setDimensions] = useState<
    Record<ImageFillElements, null | number[]>
  >({
    image: null,
    container: null,
  });

  const handleDimensions = useCallback(
    (node: HTMLDivElement | HTMLImageElement, type: ImageFillElements) => {
      setDimensions({
        ...dimensions,
        [type]: [node.offsetWidth, node.offsetHeight],
      });
    },
    [dimensions, setDimensions]
  );

  const handleContainerDimensions = useCallback(
    (node: HTMLDivElement) => {
      if (node && dimensions.container === null) {
        handleDimensions(node, ImageFillElements.Container);
      }
    },
    [dimensions.container, handleDimensions]
  );

  const handleImageDimensions = useCallback(
    (node: HTMLImageElement) => {
      if (node && dimensions.image === null) {
        console.log(node.offsetWidth, node.offsetHeight);
        handleDimensions(node, ImageFillElements.Image);
      }
    },
    [dimensions.image, handleDimensions]
  );

  const isVerticalOrientation =
    dimensions.image &&
    dimensions.container &&
    dimensions.image[0] < dimensions.container[0];

  console.log(dimensions, isVerticalOrientation);

  const imageStyles = {
    width: isVerticalOrientation ? "auto" : "100%",
    height: isVerticalOrientation ? "100%" : "auto",
  };

  return (
    <div className="image-container relative" ref={handleContainerDimensions}>
      <img
        style={imageStyles}
        className="abs-center"
        src={image}
        alt={alt}
        ref={handleImageDimensions}
      />
      {children}
    </div>
  );
};
