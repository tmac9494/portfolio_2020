import React, { PropsWithChildren } from "react";
import { View } from "@react-pdf/renderer";

import { PdfStyle } from "../../../utils";

export const PdfRow = ({
  children,
  style,
  wrap = true,
}: PropsWithChildren<{
  style?: PdfStyle;
  wrap?: boolean;
}>) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        ...style,
      }}
      wrap={wrap}
    >
      {children}
    </View>
  );
};
