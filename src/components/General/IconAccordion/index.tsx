import React, { ReactElement, useState } from "react";
import { conditionClass } from "../../../utils";
import { AnimationParent } from "../AnimationParent";
import "./styles.scss";

export type AccordionItem = {
  image: string;
  title: string;
  style?: any;
};

interface AccordionProps {
  list: AccordionItem[];
  className?: string;
  width?: number;
}

interface AccordionState {
  hoverIndex: number;
  hover: boolean;
}

export const IconAccordion: React.FC<AccordionProps> = ({
  list,
  width,
  className,
}): ReactElement => {
  const [hoverState, setHoverState] = useState<AccordionState>({
    hoverIndex: 0,
    hover: false,
  });

  const zIndexMax: number = list.length + 10;
  const iconWidth = width ? width : 32;

  const handleHover = (e: any, value: boolean, index?: number): void => {
    setHoverState({
      hoverIndex: index !== undefined ? index : hoverState.hoverIndex,
      hover: value,
    });
  };

  return (
    <div
      className={"icon-accordion" + conditionClass(className)}
      onMouseLeave={(e) => handleHover(e, false)}
    >
      <div className="accordion-content-container relative">
        {list.map((val, i) => (
          <div
            key={val.title}
            className="accordion-icon-container"
            style={{
              zIndex: -1 * i + zIndexMax,
            }}
            onMouseEnter={(e) => handleHover(e, true, i)}
          >
            <img
              className="accordion-icon"
              style={{
                width: iconWidth + "px",
                height: iconWidth + "px",
                ...val?.style,
              }}
              src={val.image}
              alt={val.title}
            />
          </div>
        ))}
        <div
          className="accordion-icon-tooltip-wrap"
          style={{
            left: Math.floor((hoverState.hoverIndex + 0.5) * iconWidth) + "px",
          }}
        >
          <AnimationParent
            className="accordion-icon-tooltip"
            isVisible={hoverState.hover}
          >
            <span>{list[hoverState.hoverIndex]?.title}</span>
          </AnimationParent>
        </div>
      </div>
    </div>
  );
};
