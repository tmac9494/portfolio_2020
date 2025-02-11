import React from "react";

import { View, Image } from "@react-pdf/renderer";
import { Skill, skillImages, SkillSorts, sortAlgorithms } from "../../../utils";
import { pdfStyles } from "../pdfStyles";
import { PdfRow, PdfHelperText, PdfHeadingText } from ".";

export const PdfSkills = ({ skills }: { skills: Skill[] }) => {
  return (
    <View>
      <PdfHeadingText
        style={{
          marginBottom: 8,
          borderBottom: "1px solid #fff",
        }}
      >
        Skills:
      </PdfHeadingText>
      {skills.sort(sortAlgorithms[SkillSorts.BestToWorst]).map((skill) => {
        return (
          <View
            key={skill.id}
            style={{
              marginBottom: 5,
            }}
          >
            <PdfRow style={{ marginBottom: 2 }}>
              <View style={pdfStyles.half}>
                <PdfRow>
                  <Image
                    style={{ width: 12, height: "auto", marginRight: 3 }}
                    src={skillImages[skill.id]?.img}
                  />
                  <PdfHelperText>{skill.title}</PdfHelperText>
                </PdfRow>
              </View>
              <View style={[pdfStyles.half, pdfStyles.textRight]}>
                {/* <Text style={[pdfStyles.tinyText]}>
                  {skillLevels[skill.level - 1]}
                </Text> */}
              </View>
            </PdfRow>
            <View
              style={{
                backgroundColor: "#888",
                width: "100%",
                height: 2,
                borderRadius: 4,
              }}
            >
              <View
                style={{
                  backgroundColor: "#00CED1",
                  height: 2,
                  borderRadius: 4,
                  width: skill.level * 2 * 10 + "%",
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};
