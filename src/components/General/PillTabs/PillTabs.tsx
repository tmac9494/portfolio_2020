import React from "react";
import classNames from "classnames";

import "./styles.scss";

export type PillTabProps<TabItems> = {
  id: TabItems;
  text: string;
  className?: string;
};

export const PillTabs = <TabItems,>({
  tabs,
  active,
  onClick,
  className,
}: {
  tabs: PillTabProps<TabItems>[];
  active?: TabItems | null;
  onClick: (id: TabItems) => void;
  className?: string;
}) => {
  return (
    <div className={classNames("pill-tabs-container", className)}>
      {tabs.map((tabProps) => {
        return (
          <div
            key={tabProps.id as string}
            className={classNames(
              "pill-tab-container",
              active === tabProps.id && "active"
            )}
          >
            <span className="pill-tab-fill abs-center" />
            <button
              className={classNames(
                "pill-tab",
                active === tabProps.id && "active",
                tabProps.className
              )}
              onClick={() => onClick(tabProps.id)}
            >
              {tabProps.text}
            </button>
          </div>
        );
      })}
    </div>
  );
};
