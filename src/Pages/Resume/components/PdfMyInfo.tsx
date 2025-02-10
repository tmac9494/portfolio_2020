import React from "react";

import { View, Image, Link } from "@react-pdf/renderer";
import { pdfStyles } from "../pdfStyles";
import myImage from "../../../assets/story/profile.jpg";
import { PdfHeading } from "./PdfHeading";
import { PdfHelperText } from "./PdfHelperText";

export const PdfMyInfo = () => {
  return (
    <>
      <View
        style={{
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        <Image
          style={{
            width: "60%",
            height: "auto",
            borderRadius: "100%",
            margin: "0 auto 10",
          }}
          src={myImage}
        />
        <PdfHeading>Trent McDole</PdfHeading>
        <PdfHelperText>Senior Software Engineer</PdfHelperText>
      </View>
      <PdfHelperText
        style={{
          marginBottom: 3,
        }}
      >
        (251) 753-1816
      </PdfHelperText>
      <PdfHelperText
        style={{
          marginBottom: 3,
        }}
      >
        <Link style={pdfStyles.textWhite} src="https://tmac9494.github.io">
          tmac9494.github.io
        </Link>
      </PdfHelperText>
      <PdfHelperText
        style={{
          marginBottom: 3,
        }}
      >
        trentmcdole94@gmail.com
      </PdfHelperText>
      <PdfHelperText
        style={{
          marginBottom: 3,
        }}
      >
        Daphne, AL
      </PdfHelperText>
    </>
  );
};
