import { CSSProperties } from "react";

import { Style } from "@react-pdf/types";

// work types
export enum WorkInstanceType {
  Application = "Application",
  Website = "Website",
}

export type WorkInstance = {
  title: string;
  image: string;
  type: WorkInstanceType;
  company: string;
  brief_description: string;
  tech: string[];
  role: string;
  companyId: CompanyIds;
};

export type TechDegreeProjectInstance = {
  title: string;
  image: string;
  brief_description: string;
  url: string;
};

export enum ProjectListTypes {
  Techdegree = "techdegree",
  Projects = "projects",
}

// company types
export enum CompanyIds {
  NM = "nm",
  Evernote = "evern",
  GCIO = "gcio",
  Carallel = "cara",
  XpertDox = "xpdx",
  StandardFurniture = "stnfn",
  SVM = "svm",
  PlusSum = "ps",
  AFM = "afm",
  MIT = "mit",
}

export enum EmploymentTypes {
  FullTime = "Full-time",
  PartTIme = "Part-time",
  Contract = "Contract",
}

export interface Employer {
  id: CompanyIds;
  company: string;
  logo: string;
  cityState: string;
  startDate: string;
  endDate: string;
  title: string;
  description: string;
  bullets: string[];
  logoClass?: string;
  type: EmploymentTypes;
}

export interface Education {
  title: string;
  issuer: string;
  type: string;
  startDate: string;
  endDate: string;
  url?: string;
}

export interface ResumeData {
  jobs: Employer[];
  education: Education[];
}

export type CompanyImage = {
  name: string;
  img: string;
  iconStyle?: CSSProperties;
  fullLogo?: string;
};

export type PdfStyle = Style;

// skill types
export enum SkillIds {
  React = "react",
  ReactNative = "reactnative",
  NodeJS = "nodejs",
  Redux = "redux",
  Typescript = "typescript",
  ThreeJS = "threejs",
  Sass = "sass",
  Angular = "angular",
  HTML = "html",
  CSS = "css",
  JS = "js",
  JQuery = "jquery",
  PHP = "php",
  MongoDB = "mongodb",
  Webpack = "webpack",
  Wordpress = "wordpress",
  Illustrator = "illustrator",
  AdobeXD = "adobexd",
  Photoshop = "photoshop",
  Express = "express",
  GraphQL = "graphql",
  VisX = "visx",
  Jest = "jest",
}

export enum SkillTags {
  Frameworks = "fw",
  Frontend = "fe",
  Backend = "be",
  Star = "star",
  Heart = "hrt",
  Language = "lang",
  Libraries = "lib",
  CMS = "cms",
  Design = "dsign",
}

export enum SkillSorts {
  BestToWorst = "besttoworst",
  WorstToBest = "worsttobest",
  AtoZ = "atoz",
}

export enum SkillLevels {
  Beginner = "Beginner",
  Familiar = "Familiar",
  Intermediate = "Intermediate",
  Skilled = "Skilled",
  Mastered = "Mastered",
}

export type Skill = {
  /* matches skills-data.json in build */ title: string;
  id: string;
  level: number;
  tags: SkillTags[];
  companies: CompanyIds[];
  description: string;
  accolades: string[];
  yearsOfExp: number;
};

export interface SkillContextValue {
  skillDescription?: SkillIds;
  skillDescriptionVisibility?: boolean;
  filters: SkillTags[];
  query: string;
  sort: SkillSorts;
  skillsList?: Skill[] | null;
  origin?: Skill[] | null;
}

export type SkillImage = {
  name: string;
  img: string;
};
