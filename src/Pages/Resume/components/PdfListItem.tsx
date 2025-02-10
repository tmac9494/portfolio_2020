import React, { PropsWithChildren } from "react";

import { View } from "@react-pdf/renderer";
import { pdfStyles } from "../pdfStyles";
import { PdfRow } from "./PdfRow";
import { PdfText } from "./PdfText";
import { PdfStyle } from "../../../utils";

export const PdfListItem = ({
  children,
  style,
}: PropsWithChildren<{
  style?: PdfStyle;
}>) => {
  return (
    <PdfRow
      style={{ marginBottom: 4, paddingLeft: 1, paddingRight: 10, ...style }}
      wrap={false}
    >
      <View
        style={{
          width: 3,
          height: 3,
          backgroundColor: pdfStyles.textDarkGray.color,
          borderRadius: 8,
          marginTop: 4,
          marginRight: 4,
        }}
      />
      <PdfText style={pdfStyles.textDarkGray}>{children}</PdfText>
    </PdfRow>
  );
};
