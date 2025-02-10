import React from "react";

import { View, Image } from "@react-pdf/renderer";
import { pdfStyles } from "../pdfStyles";
import { PdfRow } from "./PdfRow";
import { companyImages, Employer } from "../../../utils";
import { PdfListItem, PdfHelperText, PdfTinyText, PdfHeading } from ".";

export const PdfJobCard = ({ job }: { job: Employer }) => {
  const firstBullet = job.bullets[0];
  const restOfBullets = job.bullets.slice(1, job.bullets.length);
  console.log(firstBullet, restOfBullets);

  return (
    <View key={job.id} style={pdfStyles.experienceContainer}>
      {/* prevents wrapping if atleast one bullet is not followed by the header section */}
      <View wrap={false}>
        <PdfRow wrap={false}>
          <View style={pdfStyles.half} wrap={false}>
            <PdfRow wrap={false}>
              <View
                style={{
                  marginRight: 4,
                  width: 20,
                  height: "100%",
                  display: "flex",
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
                <PdfHeading
                  style={{
                    ...pdfStyles.experienceTitle,
                    ...pdfStyles.textBlack,
                  }}
                >
                  {job.title}
                </PdfHeading>
                <PdfHelperText style={pdfStyles.textGray}>
                  {job.company}
                </PdfHelperText>
              </View>
            </PdfRow>
          </View>
          <View style={[pdfStyles.half, pdfStyles.textRight]}>
            <PdfTinyText
              style={{
                ...pdfStyles.textGray,
                marginTop: 5,
              }}
            >
              {job.startDate} - {job.endDate}
            </PdfTinyText>
            <PdfTinyText style={pdfStyles.textGray}>{job.type}</PdfTinyText>
          </View>
        </PdfRow>
        <PdfListItem key="first" style={{ marginTop: 10 }}>
          {firstBullet}
        </PdfListItem>
      </View>

      {restOfBullets.map((bullet, i) => {
        return <PdfListItem key={bullet}>{bullet}</PdfListItem>;
      })}
    </View>
  );
};
