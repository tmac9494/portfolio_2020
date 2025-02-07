import { View } from "@react-pdf/renderer";
import React, { CSSProperties, PropsWithChildren } from "react";

export const PdfRow: React.FC<
  PropsWithChildren<{
    style?: any;
    wrap?: boolean;
  }>
> = ({ children, style, wrap = true }) => {
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
