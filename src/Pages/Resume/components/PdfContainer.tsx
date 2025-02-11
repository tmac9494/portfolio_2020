import React from "react";
import { Document, Page, View, Font, Link } from "@react-pdf/renderer";

import { Employer, Skill } from "../../../utils";
import { pdfStyles } from "../pdfStyles";
import {
  PdfJobCard,
  PdfMyInfo,
  PdfSkills,
  PdfHeadingText,
  PdfText,
  PdfHelperText,
} from ".";

Font.registerHyphenationCallback((word) => [word]);

export const PdfContainer = ({
  jobs,
  skills,
}: {
  jobs: Employer[];
  skills: Skill[];
}) => {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.container}>
          {/* Side column colored background */}
          <View style={pdfStyles.fixedColumn} fixed />

          {/* Fixed footer note on second page */}
          <View
            style={pdfStyles.fixedCtoA}
            render={({ pageNumber }) =>
              pageNumber === 2 && (
                <View style={pdfStyles.fixedCtoAContent}>
                  <PdfHelperText style={pdfStyles.textWhite}>
                    This resume was generated using a custom built react-pdf
                    component on my portfolio site. You can see the component in
                    action{" "}
                    <Link
                      style={pdfStyles.textWhite}
                      src="https://tmac9494.github.io/#/resume"
                    >
                      here.
                    </Link>
                  </PdfHelperText>
                </View>
              )
            }
            fixed
          />

          {/* Small side column */}
          <View style={pdfStyles.left}>
            <View style={{ marginBottom: 18, paddingTop: 5 }}>
              <PdfMyInfo />
            </View>
            <PdfSkills skills={skills} />
          </View>

          {/* Larger main column */}
          <View style={pdfStyles.right}>
            <View style={{ marginBottom: 20 }}>
              <PdfHeadingText
                style={{
                  ...pdfStyles.textBlack,
                  fontSize: 19,
                }}
              >
                Michael Trent McDole
              </PdfHeadingText>
              <PdfText style={pdfStyles.textGray}>
                Full Stack JavaScript Engineer
              </PdfText>
            </View>
            {jobs.map((job, i) => {
              return <PdfJobCard key={job.id} job={job} />;
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};
