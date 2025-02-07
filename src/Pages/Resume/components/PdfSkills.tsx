import React from "react";

import { View, Text } from "@react-pdf/renderer";
import { Skill, SkillSorts, sortAlgorithms } from "../../../utils";
import { pdfStyles } from "../pdfStyles";
import { PdfRow } from "./PdfRow";

export const PdfSkills = ({ skills }: { skills: Skill[] }) => {
  return (
    <View
      style={{
        paddingRight: 5,
      }}
    >
      <Text
        style={[
          pdfStyles.heading,
          {
            marginBottom: 8,
            borderBottom: "1px solid #fff",
          },
        ]}
      >
        Skills:
      </Text>
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
                <Text style={pdfStyles.helperText}>{skill.title}</Text>
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
              }}
            >
              <View
                style={{
                  backgroundColor: "#00CED1",
                  height: 2,
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
