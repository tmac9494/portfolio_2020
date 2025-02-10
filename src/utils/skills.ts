import sassImg from "../assets/sass.png";
import reactImg from "../assets/logo192.png";
import reduxImg from "../assets/redux.png";
import angImg from "../assets/angular.png";
import nodeImg from "../assets/nodejs.png";
import threeImg from "../assets/3js.png";
import tsImg from "../assets/typescript.png";
import cssImg from "../assets/css.png";
import htmlImg from "../assets/html.png";
import jsImg from "../assets/javascript.png";
import jqImg from "../assets/jquery.png";
import phpImg from "../assets/php.png";
import aiImg from "../assets/illustrator.png";
import psImg from "../assets/photoshop.png";
import xdImg from "../assets/adobexd.png";
import mongoImg from "../assets/mongo.png";
import wpImg from "../assets/webpack.png";
import wordpressImg from "../assets/wordpress.png";
import visxImg from "../assets/visx.png";
import gqlImg from "../assets/gql.png";
import expressImg from "../assets/express.png";
import jestImg from "../assets/jest.png";
import { SkillImage, SkillIds, SkillLevels } from "./types";

export const skillImages: {
  [key: string]: SkillImage;
} = {
  [SkillIds.React]: {
    name: "ReactJS",
    img: reactImg,
  },
  [SkillIds.ReactNative]: {
    name: "React Native",
    img: reactImg,
  },
  [SkillIds.NodeJS]: {
    name: "Node JS",
    img: nodeImg,
  },
  [SkillIds.Redux]: {
    name: "Redux",
    img: reduxImg,
  },
  [SkillIds.Typescript]: {
    name: "Typescript",
    img: tsImg,
  },
  [SkillIds.ThreeJS]: {
    name: "ThreeJS",
    img: threeImg,
  },
  [SkillIds.Sass]: {
    name: "Sass",
    img: sassImg,
  },
  [SkillIds.Angular]: {
    name: "Angular",
    img: angImg,
  },
  [SkillIds.HTML]: {
    name: "HTML",
    img: htmlImg,
  },
  [SkillIds.CSS]: {
    name: "CSS",
    img: cssImg,
  },
  [SkillIds.JS]: {
    name: "JavaScript",
    img: jsImg,
  },
  [SkillIds.JQuery]: {
    name: "JQuery",
    img: jqImg,
  },
  [SkillIds.PHP]: {
    name: "PHP",
    img: phpImg,
  },
  [SkillIds.MongoDB]: {
    name: "MongoDB",
    img: mongoImg,
  },
  [SkillIds.Webpack]: {
    name: "Webpack",
    img: wpImg,
  },
  [SkillIds.Wordpress]: {
    name: "Wordpress",
    img: wordpressImg,
  },
  [SkillIds.Illustrator]: {
    name: "Illustrator",
    img: aiImg,
  },
  [SkillIds.AdobeXD]: {
    name: "Adobe XD",
    img: xdImg,
  },
  [SkillIds.Photoshop]: {
    name: "Photoshop",
    img: psImg,
  },
  [SkillIds.Express]: {
    name: "Express JS",
    img: expressImg,
  },
  [SkillIds.Jest]: {
    name: "Jest",
    img: jestImg,
  },
  [SkillIds.GraphQL]: {
    name: "GraphQL",
    img: gqlImg,
  },
  [SkillIds.VisX]: {
    name: "VisX",
    img: visxImg,
  },
};

export const skillLevels = [
  SkillLevels.Beginner,
  SkillLevels.Familiar,
  SkillLevels.Intermediate,
  SkillLevels.Skilled,
  SkillLevels.Mastered,
];
