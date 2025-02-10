import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
});
Font.register({
  family: "Roboto Condensed",
  src: "http://fonts.gstatic.com/s/robotocondensed/v14/Zd2E9abXLFGSr9G3YK2MsDR-eWpsHSw83BRsAQElGgc.ttf",
});

const pageMarginY = 14;
const pageMarginX = 10;

export const pdfStyles = StyleSheet.create({
  // layout
  page: { backgroundColor: "#fff", padding: `${pageMarginY} ${pageMarginX}` },
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
    left: -1 * pageMarginX,
    right: "auto",
    top: -1 * pageMarginY,
    bottom: 0,
  },
  left: {
    padding: "0 5px",
    width: "22%",
    height: "100%",
    color: "#fff",
    transform: `translateX(${-1 * pageMarginX}px)`,
  },
  right: {
    padding: "0px 5px 0px 8px",
    width: "78%",
    transform: `translateX(${-1 * (pageMarginX / 2)}px)`,
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
    fontFamily: "Roboto",
  },
  helperText: {
    fontSize: 9,
    fontFamily: "Roboto Condensed",
  },
  tinyText: {
    fontSize: 8,
    fontFamily: "Roboto Condensed",
  },
  text: {
    fontSize: 10,
    fontFamily: "Roboto Condensed",
  },
  textBlack: {
    color: "#031112",
  },
  textWhite: {
    color: "#fff",
  },
  textGray: {
    color: "#677070",
  },
  textDarkGray: {
    color: "#1c2829",
  },

  // experience
  experienceContainer: {
    marginBottom: 8,
  },
  experienceTitle: {
    fontSize: 14,
  },
});
