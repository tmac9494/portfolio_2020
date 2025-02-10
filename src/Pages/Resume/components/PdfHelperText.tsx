import React, { PropsWithChildren } from "react";
import { Text } from "@react-pdf/renderer";

import { PdfStyle } from "../../../utils";
import { pdfStyles } from "../pdfStyles";

export const PdfHelperText = ({
  children,
  style = {},
}: PropsWithChildren<{ style?: PdfStyle }>) => {
  return <Text style={[pdfStyles.helperText, style]}>{children}</Text>;
};
