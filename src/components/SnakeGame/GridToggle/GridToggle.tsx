import classNames from "classnames";
import React from "react";
import "./styles.scss";

export const GridToggle = ({
  callback,
  showLines,
}: {
  callback: any;
  showLines: boolean;
}) => {
  return (
    <button
      className={classNames("btn grid-lines-btn", showLines && "on")}
      onMouseDown={(e) => {
        e.preventDefault();
        callback(!showLines);
      }}
    >
      {showLines ? (
        <svg viewBox="0 0 512 512">
          <rect
            x="48"
            y="48"
            width="176"
            height="176"
            rx="20"
            ry="20"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
          <rect
            x="288"
            y="48"
            width="176"
            height="176"
            rx="20"
            ry="20"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
          <rect
            x="48"
            y="288"
            width="176"
            height="176"
            rx="20"
            ry="20"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
          <rect
            x="288"
            y="288"
            width="176"
            height="176"
            rx="20"
            ry="20"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 512 512">
          <path d="M204 240H68a36 36 0 01-36-36V68a36 36 0 0136-36h136a36 36 0 0136 36v136a36 36 0 01-36 36zM444 240H308a36 36 0 01-36-36V68a36 36 0 0136-36h136a36 36 0 0136 36v136a36 36 0 01-36 36zM204 480H68a36 36 0 01-36-36V308a36 36 0 0136-36h136a36 36 0 0136 36v136a36 36 0 01-36 36zM444 480H308a36 36 0 01-36-36V308a36 36 0 0136-36h136a36 36 0 0136 36v136a36 36 0 01-36 36z" />
        </svg>
      )}
    </button>
  );
};
