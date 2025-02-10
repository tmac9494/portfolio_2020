import React, { PropsWithChildren } from "react";

import { Text } from "@react-pdf/renderer";
import { PdfStyle } from "../../../utils";
import { pdfStyles } from "../pdfStyles";

export const PdfHeading = ({
  children,
  style = {},
}: PropsWithChildren<{ style?: PdfStyle }>) => {
  return <Text style={[pdfStyles.heading, style]}>{children}</Text>;
};
