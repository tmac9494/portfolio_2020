export enum RadioStates {
  Hover = "hover",
  Read = "read",
  Active = "active",
  Default = "default",
}

export const radioButtonSprings: Record<
  RadioStates,
  {
    opacity?: number;
    y?: number;
    scale?: number;
  }
> = {
  [RadioStates.Active]: {
    opacity: 1,
    y: 14,
    scale: 1,
  },
  [RadioStates.Hover]: {
    opacity: 0.8,
    y: 10,
  },
  [RadioStates.Read]: {
    opacity: 0.6,
    y: 10,
  },
  [RadioStates.Default]: {
    opacity: 0,
    y: 0,
    scale: 0.7,
  },
};

export const getTimelineRadioSpring = ({
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
  const radioState = active
    ? RadioStates.Active
    : hover
    ? RadioStates.Hover
    : hasRead
    ? RadioStates.Read
    : RadioStates.Default;

  const opacity =
    radioButtonSprings[radioState]?.opacity ||
    radioButtonSprings[RadioStates.Default].opacity;

  const y =
    (radioButtonSprings[radioState]?.y ||
      radioButtonSprings[RadioStates.Default].y ||
      0) * (index % 2 ? -1 : 1);

  const scale =
    radioButtonSprings[radioState]?.scale ||
    radioButtonSprings[RadioStates.Default].scale;

  return {
    opacity,
    scale,
    y,
  };
};
