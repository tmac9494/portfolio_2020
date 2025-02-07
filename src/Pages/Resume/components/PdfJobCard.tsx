import React from "react";

import { View, Text, Image } from "@react-pdf/renderer";
import { pdfStyles } from "../pdfStyles";
import { PdfRow } from "./PdfRow";
import { companyImages, Employer } from "../../../utils";

export const PdfJobCard = ({ job }: { job: Employer }) => {
  return (
    <View key={job.id} style={pdfStyles.experienceContainer}>
      <PdfRow wrap={false}>
        <View style={pdfStyles.half} wrap={false}>
          <PdfRow wrap={false}>
            <View
              style={{
                marginRight: 4,
                width: 20,
                height: "100%",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={companyImages[job.id].img}
                style={{
                  width: "100%",
                  height: "auto",
                  alignSelf: "center",
                  ...(companyImages[job.id]?.iconStyle as any),
                }}
              />
            </View>
            <View>
              <Text style={pdfStyles.experienceTitle}>{job.title}</Text>
              <Text style={[pdfStyles.helperText, pdfStyles.textGray]}>
                {job.company}
              </Text>
            </View>
          </PdfRow>
        </View>
        <View style={[pdfStyles.half, pdfStyles.textRight]}>
          <Text
            style={[
              pdfStyles.tinyText,
              pdfStyles.textGray,
              {
                marginTop: 5,
              },
            ]}
          >
            {job.startDate} - {job.endDate}
          </Text>
          <Text style={[pdfStyles.tinyText, pdfStyles.textGray]}>
            {job.type}
          </Text>
        </View>
      </PdfRow>

      <View
        style={{
          marginTop: 10,
          paddingRight: 4,
        }}
      >
        {job.bullets.map((bullet, i) => {
          return (
            <View
              key={bullet}
              style={{
                marginBottom: 4,
              }}
            >
              <PdfRow>
                <View
                  style={{
                    width: 4,
                    height: 4,
                    backgroundColor: "#000",
                    borderRadius: 8,
                    marginTop: 4,
                    marginRight: 3,
                  }}
                />
                <Text style={pdfStyles.text}>{bullet}</Text>
              </PdfRow>
            </View>
          );
        })}
      </View>
    </View>
  );
};
