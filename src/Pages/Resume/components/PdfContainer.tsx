import React from "react";
import { Document, Page, View, Font, Link } from "@react-pdf/renderer";

import { Employer, Skill } from "../../../utils";
import { pdfStyles } from "../pdfStyles";
import { PdfJobCard } from "./PdfJobCard";
import { PdfMyInfo } from "./PdfMyInfo";
import { PdfSkills } from "./PdfSkills";
import { PdfHeading } from "./PdfHeading";
import { PdfText } from "./PdfText";
import { PdfHelperText } from "./PdfHelperText";

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
          <View style={pdfStyles.fixedColumn} fixed />
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

          <View style={pdfStyles.left}>
            <View style={{ marginBottom: 18, paddingTop: 5 }}>
              <PdfMyInfo />
            </View>
            <PdfSkills skills={skills} />
          </View>

          <View style={pdfStyles.right}>
            <View style={{ marginBottom: 18 }}>
              <PdfHeading
                style={{
                  ...pdfStyles.textBlack,
                  fontSize: 18,
                }}
              >
                Michael Trent McDole
              </PdfHeading>
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
