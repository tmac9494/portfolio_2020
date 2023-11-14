import React, { useState, useCallback, PropsWithChildren } from "react";
import { conditionClass } from "../../../utils";

interface IconAccordionProps extends PropsWithChildren {
  isVisible: boolean;
  inCallback: () => void;
  outCallback: () => void;
  id: string;
  attributes: any;
}

export const AnimationParent: React.FC<
  PropsWithChildren<{
    isVisible: boolean;
    inCallback?: () => void;
    outCallback?: () => void;
    id?: string;
    attributes?: any;
    className?: string;
  }>
> = ({
  isVisible,
  inCallback,
  outCallback,
  id,
  attributes,
  children,
  className,
}) => {
  const [outHasFinished, setOutHasFinished] = useState(true);

  const handleAnimationEnd = useCallback(() => {
    // useCallback to ensure correct variables
    if (!isVisible) {
      // hide the component after the "out" animation finishes
      setOutHasFinished(true);
      if (outCallback) outCallback();
    } else {
      setOutHasFinished(false);
      if (inCallback) inCallback();
    }
  }, [outCallback, inCallback, isVisible]);

  const shouldShowChildren =
    isVisible || // if isVisible is true
    (!isVisible && !outHasFinished); // if isVisible is false & outHasFinished is false

  if (!shouldShowChildren) return null;

  return (
    <div
      id={id}
      className={`${isVisible ? "in" : "out"}${conditionClass(className)}`}
      {...attributes}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};
