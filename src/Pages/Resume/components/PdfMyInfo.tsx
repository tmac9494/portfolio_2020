import React from "react";

import { View, Text, Image } from "@react-pdf/renderer";
import { pdfStyles } from "../pdfStyles";
import myImage from "../../../assets/story/profile.jpg";

export const PdfMyInfo = () => {
  return (
    <>
      <View
        style={{
          marginBottom: 10,
        }}
      >
        <Image
          style={{
            width: "60%",
            height: "auto",
            borderRadius: "100%",
            marginBottom: 4,
            // margin: "0 auto",
          }}
          src={myImage}
        />
        <Text>Trent McDole</Text>
        <Text
          style={{
            fontSize: 10,
          }}
        >
          Senior Software Engineer
        </Text>
      </View>
      <Text
        style={[
          pdfStyles.helperText,
          {
            marginBottom: 3,
          },
        ]}
      >
        (251) 753-1816
      </Text>
      <Text
        style={[
          pdfStyles.helperText,
          {
            marginBottom: 3,
          },
        ]}
      >
        tmac9494.github.io
      </Text>
      <Text
        style={[
          pdfStyles.helperText,
          {
            marginBottom: 3,
          },
        ]}
      >
        trentmcdole94@gmail.com
      </Text>
      <Text
        style={[
          pdfStyles.helperText,
          {
            marginBottom: 3,
          },
        ]}
      >
        Daphne, AL
      </Text>
    </>
  );
};
