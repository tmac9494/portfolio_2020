import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
});
Font.register({
  family: "Nunito",
  src: "https://fonts.gstatic.com/s/nunito/v8/kpI87QY2ce-mk2ZnKb-r0g.ttf",
});

const pageMarginY = 14;
const pageMarginX = 10;
const smallColumnWidth = "22%";
const largeColumnWidth = "78%";

export const pdfStyles = StyleSheet.create({
  // layout
  page: {
    backgroundColor: "#fff",
    padding: `${pageMarginY} ${pageMarginX}`,
    position: "relative",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  fixedColumn: {
    borderRight: "1px solid #001e3d",
    width: smallColumnWidth,
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
    width: smallColumnWidth,
    height: "100%",
    color: "#fff",
    transform: `translateX(${-1 * pageMarginX}px)`,
  },
  right: {
    padding: "0px 5px 0px 8px",
    width: largeColumnWidth,
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
    fontFamily: "Nunito",
  },
  tinyText: {
    fontSize: 8,
    fontFamily: "Nunito",
  },
  text: {
    fontSize: 10,
    fontFamily: "Nunito",
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
    paddingBottom: 10,
  },
  experienceTitle: {
    fontSize: 14,
    fontFamily: "Roboto",
  },

  // c2a to portfolio
  fixedCtoA: {
    position: "absolute",
    top: -1 * pageMarginY,
    right: "auto",
    width: smallColumnWidth,
    left: -1 * pageMarginX,
    minHeight: "842px" /* height of A4 page */,
  },

  fixedCtoAContent: {
    padding: "4px 8px",
    position: "absolute",
    top: "auto",
    left: 0,
    bottom: pageMarginY,
  },
});
