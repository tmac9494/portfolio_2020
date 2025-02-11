import React, { useState, useCallback, PropsWithChildren } from "react";
import classNames from "classnames";

export const AnimationParent: React.FC<
  PropsWithChildren<{
    isVisible: boolean;
    inCallback?: () => void;
    outCallback?: () => void;
    id?: string;
    attributes?: any;
    className?: string;
    element?: string;
  }>
> = ({
  isVisible,
  inCallback,
  outCallback,
  id,
  attributes,
  children,
  className,
  element = "div",
}) => {
  const [outHasFinished, setOutHasFinished] = useState(true);

  const handleAnimationEnd = useCallback(
    (e: React.UIEvent) => {
      e.stopPropagation();
      // useCallback to ensure correct variables
      if (!isVisible) {
        // hide the component after the "out" animation finishes
        setOutHasFinished(true);
        if (outCallback) outCallback();
      } else {
        setOutHasFinished(false);
        if (inCallback) inCallback();
      }
    },
    [outCallback, inCallback, isVisible]
  );

  const shouldShowChildren =
    isVisible || // if isVisible is true
    (!isVisible && !outHasFinished); // if isVisible is false & outHasFinished is false

  if (!shouldShowChildren) return null;

  return React.createElement(
    element,
    {
      id: id,
      className: classNames(isVisible ? "in" : "out", className),
      onAnimationEnd: handleAnimationEnd,
      ...attributes,
    },
    children
  );
};
