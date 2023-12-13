import classNames from "classnames";
import React from "react";

export const LightningIcon: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={classNames("snake-game-icon snake-lightning-icon", className)}
    >
      <svg viewBox="0 0 512 512">
        <path d="M194.82 496a18.36 18.36 0 01-18.1-21.53v-.11L204.83 320H96a16 16 0 01-12.44-26.06L302.73 23a18.45 18.45 0 0132.8 13.71c0 .3-.08.59-.13.89L307.19 192H416a16 16 0 0112.44 26.06L209.24 489a18.45 18.45 0 01-14.42 7z" />
      </svg>
    </div>
  );
};