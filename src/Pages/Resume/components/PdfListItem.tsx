import React, { PropsWithChildren } from "react";

import { View } from "@react-pdf/renderer";
import { pdfStyles } from "../pdfStyles";
import { PdfStyle } from "../../../utils";
import { PdfHelperText, PdfRow } from ".";

export const PdfListItem = ({
  children,
  style,
}: PropsWithChildren<{
  style?: PdfStyle;
}>) => {
  return (
    <PdfRow
      style={{
        marginBottom: 2,
        paddingLeft: 1,
        paddingRight: 10,
        alignItems: "center",
        gap: 4,
        ...style,
      }}
      wrap={false}
    >
      <View
        style={{
          width: 3,
          height: 3,
          backgroundColor: pdfStyles.textDarkGray.color,
          borderRadius: 8,
        }}
      />
      <PdfHelperText style={{ ...pdfStyles.textDarkGray, lineHeight: 0 }}>
        {children}
      </PdfHelperText>
    </PdfRow>
  );
};
