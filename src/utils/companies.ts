import xdLogo from "../assets/xdfav.png";
import evernoteLogo from "../assets/evernote.svg";
import standardLogo from "../assets/standard-furniture-fav.png";
import svmLogo from "../assets/svm.png";
import afmLogo from "../assets/afm.png";
import psLogo from "../assets/plussum.png";
import gcioLogo from "../assets/gcio-logo.png";
import carallelLogo from "../assets/carallel.png";
import xdLogoFull from "../assets/xd-logo.svg";
import standardLogoFull from "../assets/standard-logo.svg";
import evernoteLogoFull from "../assets/evernote-logo.png";
import gcioLogoFull from "../assets/gcio.jpg";
import carallelLogoFull from "../assets/carallel_logo.svg";
import nmLogo from "../assets/nm.png";
import nmLogoFull from "../assets/nm-full.png";
import mitLogo from "../assets/mit.png";
import { CompanyImage, CompanyIds } from "./types";

export const companyImages: {
  [key: string]: CompanyImage;
} = {
  [CompanyIds.NM]: {
    name: "Northwestern Mutual",
    img: nmLogo,
    iconStyle: { borderRadius: "100%" },
    fullLogo: nmLogoFull,
  },
  [CompanyIds.Evernote]: {
    name: "Evernote",
    img: evernoteLogo,
    fullLogo: evernoteLogoFull,
  },
  [CompanyIds.GCIO]: {
    name: "Government CIO",
    img: gcioLogo,
    iconStyle: { borderRadius: "100%" },
    fullLogo: gcioLogoFull,
  },
  [CompanyIds.Carallel]: {
    name: "Carallel LLC",
    img: carallelLogo,
    fullLogo: carallelLogoFull,
  },
  [CompanyIds.XpertDox]: {
    name: "XpertDox",
    img: xdLogo,
    fullLogo: xdLogoFull,
  },
  [CompanyIds.StandardFurniture]: {
    name: "Standard Furniture",
    img: standardLogo,
    fullLogo: standardLogoFull,
  },
  [CompanyIds.SVM]: {
    name: "Southern View Media",
    img: svmLogo,
  },
  [CompanyIds.PlusSum]: {
    name: "Plus Sum Web Services",
    img: psLogo,
    iconStyle: { borderRadius: "100%" },
  },
  [CompanyIds.AFM]: {
    name: "A-Factor Marketing",
    img: afmLogo,
    iconStyle: { borderRadius: "100%" },
  },
  [CompanyIds.MIT]: {
    name: "MIT",
    img: mitLogo,
  },
};
