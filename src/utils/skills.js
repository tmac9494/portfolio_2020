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


// categories: lib(libray), fw(framework), lang(language), (crtv)creative programs
// stacks: fe(front), be(back)
// star(is a speciality/focus in career), hrt(heart)
// ?? cms, cert(certificate)

// companies: evern, gcio, cara, xpdx, stnfn, svm, ps, afm

export const skills = [
    {
      title: 'React',
      img: reactImg,
      level: 5,
      tags: ['lib', 'fw', 'star', 'hrt', 'fe'],
      companies: ['evern', 'gcio', 'cara', 'xpdx', 'stnfn', 'svm', 'ps'],
      description: 'My specialty. I chose to focus on React exclusively in 2015 for frontend development and I have loved every minute of it.',
      accolades: [
        '8+ years of professional experience.',
        'Built multiple reusable libraries.',
        'Mentored Junior Developers on React best practices.',
        'Taught a React class for the Innovate Birmingham bootcamp.',
        'Built many applications from the ground up using React.',
        'Experience with React+Electron stacks.'
      ]
    },
    {
      title: 'React Native',
      img: reactImg,
      level: 5,
      tags: ['fw', 'star', 'hrt', 'fe'],
      companies: ['evern', 'svm', 'ps'],
      description: 'After years focusing on React in the web, it was fairly simple to transition into native. Animations being the most challenging to translate over.',
      accolades: [
        '3+ years of professional experience.',
        'Worked on an application with millions of DAUs.',
        'Experience porting React web applications into React Native.',
        'Have launched applications to Google Play & App Store using React Native.'
      ],
    },
    {
      title: 'Node JS',
      img: nodeImg,
      level: 5,
      tags: ['fw', 'lang', 'star', 'be'],
      companies: ['evern', 'gcio', 'xpdx', 'stnfn'],
      description: 'I love Node! I started my career with a focus on front-end development, so NodeJS was a perfect match to get APIs up quickly early in my career.',
      accolades: [
        '6+ years of professional experience.',
        'Created custom APIs that scale to thousands of DAUs.',
        'Experience with websockets in Node for Real Time updates.',
        "Created a secure custom SSO API that integrated with Stanford University's Azure server.",
        'Experience managing, architecting, and building a Node API server in a large company intranet.',
      ],
    },
    {
      title: 'Redux',
      img: reduxImg,
      level: 4,
      tags: ['lib', 'star', 'fe'],
      companies: ['evern', 'gcio', 'cara', 'xpdx', 'stnfn', 'ps'],
      description: "The most popular state management module for React. It can be a divisive topic, but I personally think in  most cases it is better to use React context instead of the cumbersome Redux setup. That being said, Redux's performance is unmatched when you need it.",
      accolades: [
        '5+ years of professional experience.',
        'Experience refactoring old Redux implementations into Redux hooks',
        'Experience refactoring Redux stores into native Context providers.'
      ],
    },
    {
      title: 'TypeScript',
      img: tsImg,
      level: 3,
      tags: ['fw', 'lang', 'fe', 'be'],
      companies: ['evern', 'gcio'],
      description: "JavaScript's more successful younger brother. I did not use typescript professionaly for most of my career. Now that it's become much more standard across the industry I have had the oppurtunity to use it and grown fond of it's effect on the architecture of components.",
      accolades: [
        '2+ years of professional experience.',
        'Experience in Typescript + React environments.',
        'Experience in Typescript + NodeJS environments.'

      ],
    },
    {
      title: 'Three JS',
      img: threeImg,
      level: 4,
      tags: ['fw', 'hrt', 'fe'],
      companies: ['stnfn'],
      description: 'My dream job would be a ThreeJS application with a custom React Layer on top. ThreeJS is a ton of fun to work with and always comes with some tough math problems.',
      accolades: [
        '1 year of professional experience.',
        'Created a 3D furniture viewing application that allowed for changing models and textures for different pre-defined furniture sets.',
        'Re-created a 3D terrain generator from Java to ThreeJS in order to better understand Perlin Noise algorithms(github).',
        'Created a custom 3D world using home made textures with normal maps(github).',
        'Linkedin Learning certification in ThreeJS'
      ],
    },
    {
      title: 'Sass',
      img: sassImg,
      level: 5,
      tags: ['fw', 'hrt', 'star', 'fe'],
      companies: ['evern', 'gcio', 'cara', 'xpdx', 'stnfn', 'svm', 'ps', 'afm'],
      description: "What happens when CSS goes Super Saiyan. Anyone not using Sass for their stylesheets is basically a cave man.",
      accolades: [
        '7+ years of professional experience.',
        'Experience with advanced features of Sass(variables, mixins, functions, etc)',
        'Extensive experience refactoring bloated CSS into Sass.'
      ],
    },
    {
      title: 'Angular',
      img: angImg,
      level: 1,
      tags: ['fw', 'fe'],
      companies: [],
      description: 'I chose React over Angular long ago, but I love Google and most of their Technology so I can never write it off. I have an understanding of the basics of Angular but would need to put in some learning time before using it professionally.',
      accolades: [
        'Not much going on here:)',
      ],
    
    },{
      title: 'HTML',
      img: htmlImg,
      level: 5,
      tags: ['fe', 'star', 'lang'],
      companies: ['evern', 'gcio', 'cara', 'xpdx', 'stnfn', 'svm', 'ps', 'afm'],
      description: "The frame and drywall of the internet. As a frontend engineer I would say I know html inside and out.",
      accolades: [
        '8+ years of professional experience.',
        'Experience with and Understanding of latest HTML5 standards and element heirarchy.',
        'WCAG focused courses through Team Treehouse Tech Degree.',
        'Experience updating web pages/applications to WCAG compliance.'
      ],
    },
    {
      title: 'CSS',
      img: cssImg,
      level: 5,
      tags: ['fe', 'lang', 'star', 'hrt'],
      companies: ['evern', 'gcio', 'cara', 'xpdx', 'stnfn', 'svm', 'ps', 'afm'],
      description: 'The paint and decorations of the internet. CSS is what hooked me into web development and I have spent extensive time learning advanced css animation/transition tricks to create eye candy UI.',
      accolades: [
        '8+ years of professional experience.',
        'Extensive CSS animation experiience.',
        'Extensive experience refactoring and optimizing CSS.',
        'Extensive Experience in CSS in JS patterns.'
      ],
    },
    {
      title: 'JavaScript',
      img: jsImg,
      level: 5,
      tags: ['fe', 'lang', 'star', 'hrt'],
      companies: ['evern', 'gcio', 'cara', 'xpdx', 'stnfn', 'svm', 'ps', 'afm'],
      description: 'The pipes and wires of the web. A build-it-yourself mentality helped me understand it on a fundamental level, but I still find myself learning something new every few months. I look forward to and dread the day that stops occurring.',
      accolades: [
        '8+ years of professional experience.',
        'Extensive experience with multiple JS libraries.',
        'Extensive experience with Vanilla JS development.',
        'Soley developed multiple JavaScript web applications.',
        'Extensive Experience in JS powered animation techniques.'
      ],
    },
    {
      title: 'Jquery',
      img: jqImg,
      level: 4,
      tags: ['fe', 'lib'],
      companies: ['stnfn', 'svm', 'ps', 'afm'],
      description: 'I hardly touch it nowadays but when I was cutting my teeth in JS, building custom sliders and UI effects; Jquery was a great tool to simplify the syntax and focus on the logic.',
      accolades: [
        '4+ years of professional experience.',
        'Extensive Experience creating Jquery modules for frontend effects.'
      ],
    },
    {
      title: 'PHP',
      img: phpImg,
      level: 3,
      tags: ['be', 'lang'],
      companies: ['cara', 'stnfn', 'svm', 'ps', 'afm'],
      description: "I much prefer NodeJS but with many CMS clients comes the need to interact with PHP in some form. I cut my teeth in PHP earlier in my career building websites for Marketing Firms and local Businesses.",
      accolades: [
        '4+ years of professional experience.',
        'Light Experience with custom PHP servers',
        'Experience with PHP in Wordpress CMS',
        'Experience with PHP in Magento CMS'
      ],
    },
    {
      title: 'MongoDB',
      img: mongoImg,
      level: 4,
      tags: ['be', 'fw', 'lib', 'hrt', 'star'],
      companies: ['cara', 'xpdx', 'stnfn',],
      description: 'My favourite solution for databases. I discovered mongo early in my career and loved how easy it was to understand with a background in JavaScript and OOP.',
      accolades: [
        '5+ years of professional experience.',
        'Experience using mongoDB at scale with thousands of DAUs',
        'Experience with query optimization techniques in the server.',
        'Experience with MongoDB advanced features like: expireAt and populate(mongoose)'
      ],
    },
    
    {
      title: 'Webpack',
      img: wpImg,
      level: 2,
      tags: ['be', 'fe', 'fw'],
      companies: ['evern', 'gcio', 'cara', 'xpdx', 'stnfn'],
      description: "Technically I've been working with webpack nearly my entire career but I never dove into the deep technical hows and whys of webpack. I've had some experience optimizing webpack payloads.",
      accolades: [
        '6+ years of professional experience.',
        'Light experience configuring compressed payloads from a SSR environment.'
      ],
    },
    
    {
      title: 'Wordpress',
      img: wordpressImg,
      level: 4,
      tags: ['fw', 'be', 'cms'],
      companies: ['cara', 'xpdx', 'stnfn', 'svm', 'ps', 'afm'],
      description: "I've built many websites over the years using wordpress. I prefer to create custom themes or use wordpress as an api/cms with a PWA.",
      accolades: [
        '5+ years of professional experience.',
        'Experience in custom theme development.',
        'Experience in plugin development.',
        'Experience using Wordpress with a React web application.',
        'Experience in woocommerce',
      ],
    },
    
    {
      title: 'Illustrator',
      img: aiImg,
      level: 4,
      tags: ['crtv', 'tool'],
      companies: ['xpdx', 'stnfn', 'svm', 'ps', 'afm'],
      description: 'Illustrator has been extremely useful over the years for creating custom svgs and icons as well as other advanced features like generating normal maps for textures.',
      accolades: [
        '5+ years of professional experience.',
        'Extensive experience in custom svg creation for animation.',
        'Experience with texture creation using Illustrator.'
      ],
    },
    
    {
      title: 'Adobe XD',
      img: xdImg,
      level: 4,
      tags: ['crtv', 'tool'],
      companies: ['xpdx', 'stnfn'],
      description: 'My favorite tool for quickly spinning up design ideas, wire frames, and prototypes.',
      accolades: [
        '4+ years of professional experience.',

      ],
    },
    
    {
      title: 'Photoshop',
      img: psImg,
      level: 3,
      tags: ['crtv', 'tool'],
      companies: ['xpdx', 'stnfn', 'svm', 'ps', 'afm'],
      description: '',
      accolades: [
        '5+ years of professional experience.',

      ],
    },
    
    ]