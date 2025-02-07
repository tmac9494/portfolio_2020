import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  // layout
  page: { backgroundColor: "#fff" },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  fixedColumn: {
    borderRight: "1px solid #001e3d",
    width: "22%",
    backgroundColor: "#003366",
    position: "absolute",
    minHeight: 3508 /* height of A4 page */,
    left: 0,
    right: "auto",
    top: 0,
    bottom: 0,
  },
  left: {
    paddingLeft: 4,
    width: "22%",
    height: "100%",
    color: "#fff",
  },
  right: {
    width: "78%",
  },
  half: {
    width: "50%",
  },
  quarter: {
    width: "25%",
  },
  third: {
    width: "33.333%",
  },
  twoThirds: {
    width: "66.666%",
  },
  textRight: {
    textAlign: "right",
  },
  textLeft: {
    textAlign: "left",
  },
  textCenter: {
    textAlign: "center",
  },

  // text
  heading: {
    fontSize: 13,
  },
  helperText: {
    fontSize: 9,
  },
  tinyText: {
    fontSize: 8,
  },
  text: {
    fontSize: 10,
  },
  textBlack: {
    color: "#000",
  },
  textWhite: {
    color: "#fff",
  },
  textGray: {
    color: "#555",
  },

  // experience
  experienceContainer: {
    margin: 6,
    marginBottom: 8,
  },
  experienceTitle: {
    fontSize: 14,
  },
});
