import React from "react";
import { Employer, Skill } from "../../../utils";
import { Document, Page, View, Font } from "@react-pdf/renderer";
import { pdfStyles } from "../pdfStyles";
import { PdfJobCard } from "./PdfJobCard";
import { PdfMyInfo } from "./PdfMyInfo";
import { PdfSkills } from "./PdfSkills";

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

          <View style={pdfStyles.left}>
            <View style={{ marginBottom: 18, paddingTop: 5 }}>
              <PdfMyInfo />
            </View>
            <PdfSkills skills={skills} />
          </View>

          <View style={pdfStyles.right}>
            {jobs.map((job, i) => {
              return <PdfJobCard key={job.id} job={job} />;
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};
