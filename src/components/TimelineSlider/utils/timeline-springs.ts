import { TIMELINE_CIRCLE_DURATION, TIMELINE_FILL_DURATION } from "./defaults";

export enum TimlineTooltipStates {
  Hover = "hover",
  Read = "read",
  Active = "active",
  Default = "default",
}

export const tooltipSprings: Record<
  TimlineTooltipStates,
  {
    opacity?: number;
    y?: number;
    scale?: number;
  }
> = {
  [TimlineTooltipStates.Active]: {
    opacity: 1,
    y: 14,
    scale: 1,
  },
  [TimlineTooltipStates.Hover]: {
    opacity: 0.8,
    y: 10,
  },
  [TimlineTooltipStates.Read]: {
    opacity: 0.6,
    y: 10,
  },
  [TimlineTooltipStates.Default]: {
    opacity: 0,
    y: 0,
    scale: 0.7,
  },
};

export const getTimelineTooltipSpring = ({
  active,
  hover,
  hasRead,
  index,
}: {
  active: boolean;
  hover: boolean;
  hasRead: boolean;
  index: number;
}) => {
  const tooltipState = active
    ? TimlineTooltipStates.Active
    : hover
    ? TimlineTooltipStates.Hover
    : hasRead
    ? TimlineTooltipStates.Read
    : TimlineTooltipStates.Default;

  const opacity =
    tooltipSprings[tooltipState]?.opacity ||
    tooltipSprings[TimlineTooltipStates.Default].opacity;

  const y =
    (tooltipSprings[tooltipState]?.y ||
      tooltipSprings[TimlineTooltipStates.Default].y ||
      0) * (index % 2 ? -1 : 1);

  const scale =
    tooltipSprings[tooltipState]?.scale ||
    tooltipSprings[TimlineTooltipStates.Default].scale;

  return {
    opacity,
    scale,
    y,
  };
};

export const getTimlineCircleSpring = ({
  active,
  hasRead,
}: {
  active: boolean;
  hasRead: boolean;
}) => {
  return {
    duration: TIMELINE_CIRCLE_DURATION,
    scale: active ? 1.5 : hasRead ? 0.7 : 1,
  };
};
