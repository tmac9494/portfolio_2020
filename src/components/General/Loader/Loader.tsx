import React, { PropsWithChildren } from "react";
import classNames from "classnames";

import { ReactComponent as Cog } from "../../../assets/icons/cog-outline.svg";
import "./styles.scss";

export const Loader = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={classNames("loader-container text-center", className)}>
      <div className="loading-icon">
        <Cog />
      </div>
      <span className="loading-text">{children ?? "Loading..."}</span>
    </div>
  );
};
