import React, { useState } from "react";
import Pie, { PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { Text } from "@visx/text";
import classNames from "classnames";

import { PieSlice } from "./components";
import "./styles.scss";

export const mockPieChartData = [
  {
    id: "a",
    label: "a label",
    value: 3,
  },
  {
    id: "b",
    value: 8,
  },
  {
    id: "c",
    value: 1,
    label: "c label",
  },
];

const defaultMargin = { top: 0, right: 0, bottom: 0, left: 0 };

export type PieChartProps<DataType> = {
  width: number;
  height: number;
  margin?: Partial<typeof defaultMargin>;
  animate?: boolean;
  data: DataType[];
  getId: (value: DataType) => string;
  getValue: (value: DataType) => number;
  getLabel?: (value: PieArcDatum<DataType>) => string | undefined;
  getColor?: (value: DataType) => string | undefined;
  title?: string;
  textColor?: string;
  className?: string;
};

export const PieChart = <DataType,>({
  data,
  width,
  height,
  margin = defaultMargin,
  animate = true,
  getId,
  getValue,
  getLabel,
  getColor,
  title,
  textColor,
  className,
}: PieChartProps<DataType>) => {
  const getLetterFrequencyColor = scaleOrdinal({
    domain: data.map((sliceData) => getId(sliceData)),
    range: [
      "#00e680",
      "#000064",
      "#640064",
      "#ff0071",
      "#973dff",
      "#ff3700",
      "#91a4e4",
      "#640000",
      "#d9ead3",
      "#00e680",
    ],
  });

  const [selectedSlice, setSelectedSlice] = useState<DataType | null>(null);

  if (width < 10) return null;

  const chartMargin = {
    ...defaultMargin,
    ...margin,
  };
  const innerWidth = width - chartMargin.left - chartMargin.right;
  const innerHeight = height - chartMargin.top - chartMargin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  return (
    <div
      className={classNames("pie-chart-container", className)}
      style={{
        width: innerWidth,
      }}
    >
      <svg width={innerWidth} height={innerHeight}>
        <Group
          top={centerY + chartMargin.top}
          left={centerX + chartMargin.left}
        >
          <Pie
            data={
              selectedSlice
                ? data.filter(
                    (sliceData) => getId(sliceData) === getId(selectedSlice)
                  )
                : data
            }
            pieValue={getValue}
            pieSortValues={() => -1}
            outerRadius={radius - donutThickness * 1.3}
          >
            {(pie) => (
              <PieSlice<DataType>
                {...pie}
                textColor={textColor}
                animate={animate}
                getKey={({ data }) => getId(data)}
                onClickDatum={({ data }) =>
                  animate &&
                  setSelectedSlice(
                    selectedSlice && getId(selectedSlice) === getId(data)
                      ? null
                      : data
                  )
                }
                getColor={({ data }) =>
                  (getColor && getColor(data)) ??
                  getLetterFrequencyColor(getId(data))
                }
                getLabel={getLabel}
              />
            )}
          </Pie>
        </Group>
        {title && (
          <Text
            x={centerX}
            y={centerY - width / 2}
            textAnchor="middle"
            fill={textColor ?? "#fff"}
            fontSize={24}
          >
            {title}
          </Text>
        )}
      </svg>
    </div>
  );
};
