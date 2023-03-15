import sassImg from '../assets/sass.png';
import reactImg from '../assets/logo192.png';
import reduxImg from '../assets/redux.svg';
import angImg from '../assets/angular.png';
import nodeImg from '../assets/nodejs.png';
import threeImg from '../assets/3js.png';
import tsImg from '../assets/typescript.png';
import cssImg from '../assets/css.png';
import htmlImg from '../assets/html.png';
import jsImg from '../assets/javascript.png';
import jqImg from '../assets/jquery.png';
import phpImg from '../assets/php.png';
import aiImg from '../assets/illustrator.svg';
import psImg from '../assets/ps.svg';
import xdImg from '../assets/xd.svg';
import mongoImg from '../assets/mongo.png';
import wpImg from '../assets/webpack.svg';
import wordpressImg from '../assets/wordpress.png';
import { CompanyIds } from './companies';

export enum SkillIds {
    React = 'react',
    ReactNative = 'reactnative',
    NodeJS = 'nodejs',
    Redux = 'redux',
    Typescript = 'typescript',
    ThreeJS = 'threejs',
    Sass = 'sass',
    Angular = 'angular',
    HTML = 'html',
    CSS = 'css',
    JS = 'js',
    JQuery = 'jquery',
    PHP = 'php',
    MongoDB = 'mongodb',
    Webpack = 'webpack',
    Wordpress = 'wordpress',
    Illustrator = 'illustrator',
    AdobeXD = 'adobexd',
    Photoshop = 'photoshop',
};

export enum SkillTags {
    Frameworks = 'fw',
    Frontend = 'fe',
    Backend = 'be',
    Star = 'star',
    Heart = 'hrt',
    Language = 'lang',
    Libraries = 'lib',
    CMS = 'cms',
}

export enum SkillSorts {
    BestToWorst = 'besttoworst',
    WorstToBest = 'worsttobest',
    AtoZ = 'atoz',
}

export type Skill = {
    title: string,
    id: string,
    level: number,
    tags: SkillTags[],
    companies: CompanyIds[],
    description: string,
    accolades: string[],
}

export interface SkillContextValue {
    skillDescription?: SkillIds,
    skillDescriptionVisibility?: boolean,
    filters: SkillTags[],
    query: string,
    sort: SkillSorts,
    skillsList?: Skill[] | null,
    origin?: Skill[] | null,
}

export type SkillImage = {
    name: string,
    img: string,
}


export const skillImages: {
    [key: string]: SkillImage
} = {
    [SkillIds.React]: {
        name: "ReactJS",
        img: reactImg,
    },
    [SkillIds.ReactNative]: {
        name: 'React Native',
        img: reactImg,
    },
    [SkillIds.NodeJS]: {
        name: 'Node JS',
        img: nodeImg,
    },
    [SkillIds.Redux]: {
        name: 'Redux',
        img: reduxImg,
    },
    [SkillIds.Typescript]:  {
        name: 'Typescript',
        img: tsImg,
    },
    [SkillIds.ThreeJS]: {
        name: 'ThreeJS',
        img: threeImg,
    },
    [SkillIds.Sass]: {
        name: 'Sass',
        img: sassImg,
    },
    [SkillIds.Angular]: {
        name: 'Angular',
        img: angImg,
    },
    [SkillIds.HTML]: {
        name: 'HTML',
        img: htmlImg,
    },
    [SkillIds.CSS]: {
        name: 'CSS',
        img: cssImg,
    },
    [SkillIds.JS]: {
        name: 'JavaScript',
        img: jsImg,
    },
    [SkillIds.JQuery]: {
        name: 'JQuery',
        img: jqImg,
    },
    [SkillIds.PHP]: {
        name: 'PHP',
        img: phpImg,
    },
    [SkillIds.MongoDB]: {
        name: 'MongoDB',
        img: mongoImg,
    },
    [SkillIds.Webpack]: {
        name: 'Webpack',
        img: wpImg,
    },
    [SkillIds.Wordpress]: {
        name: 'Wordpress',
        img: wordpressImg,
    },
    [SkillIds.Illustrator]: {
        name: 'Illustrator',
        img: aiImg,
    },
    [SkillIds.AdobeXD]: {
        name: 'Adobe XD',
        img: xdImg,
    },
    [SkillIds.Photoshop]: {
        name: 'Photoshop',
        img: psImg,
    },
}