import React from 'react';
import safetyFirstImage from '../../../../assets/safety-first.jpg';
import boogiesImage from '../../../../assets/boogies.jpg';
import xperttrialImg from '../../../../assets/apps/xperttrial.PNG';
import xpertconsoleImg from '../../../../assets/apps/xpertconsole.PNG';
import xpertscreenImg from '../../../../assets/apps/xpertscreen.PNG';
import standardImg from '../../../../assets/standard.PNG';
import draytonImg from '../../../../assets/drayton.PNG';
import ssoImg from '../../../../assets/apps/sso.PNG';
import assImage from '../../../../assets/baldwin.jpg';
import profilePageImg from '../../../../assets/tech-degree-projects/proj-1.jpg';
import respLayoutImg from '../../../../assets/tech-degree-projects/proj-2.jpg';
import onlineFormImg from '../../../../assets/tech-degree-projects/proj-3.jpg';
import intPhotoGallImg from '../../../../assets/tech-degree-projects/proj-4.jpg';
import css2sassImg from '../../../../assets/tech-degree-projects/proj-5.jpg';
import svgSiteImg from '../../../../assets/tech-degree-projects/proj-6.jpg';
import intVideoImg from '../../../../assets/tech-degree-projects/proj-7.jpg';
import accessibilityImg from '../../../../assets/tech-degree-projects/proj-8.jpg';
import webAppImg from '../../../../assets/tech-degree-projects/proj-9.jpg';
import employeeApiImg from '../../../../assets/tech-degree-projects/proj-10.jpg';

export default {
  projects: [
    {
      title: 'XpertDox SSO',
      image: ssoImg,
      type: 'Application',
      company: 'XpertDox LLC',
      brief_description: "Application I designed and developed almost entirely alone. This app allows for easy single-sign on experience across the suite of XpertDox applications. It replicates the standards used by companies such as Google. It also integrates with client originzation's Azure Active Desktop for seamless signup experiences.",
      tech: ['Js', 'css', 'react', 'node', 'express'],
    },
    {
      title: 'XpertScreen',
      image: xpertscreenImg,
      type: 'Application',
      company: 'XpertDox LLC',
      brief_description: "Application I designed and led development on. This application is meant to replicate some of the functionalities of a traditional EMR system but tailored for clinical trials. It allows quick referrals based on a patient's criteria, and filtering of trials based on criteria. The app also has integrated with the Epic EMR system.",
      tech: ['Js', 'css', 'react', 'node', 'express'],
    },
    {
      title: 'XpertConsole',
      image: xpertconsoleImg,
      type: 'Application',
      company: 'XpertDox LLC',
      brief_description: 'Application I designed and led development on. The application puropse is to provide an admin panel for clinical trial primary investigators and administrators to manage & edit the clinical trials provided by their orginazation and manage user/applicant information.',
      tech: ['Js', 'css', 'react', 'node', 'express'],
    },
    {
      title: 'XpertTrial',
      image: xperttrialImg,
      type: 'Application',
      company: 'XpertDox LLC',
      brief_description: 'Application I redesigned and managed during development. It is a clinical trial recruitment platform and is used by multiple high-profile orginizations around the US such as UAB and Stanford Medical College.',
      tech: ['Js', 'css', 'react', 'redux', 'node'],
    },
    {
      title: 'Standard Furniture',
      image: standardImg,
      type: 'Website',
      company: 'Standard Furniture',
      brief_description: 'E-Commerce website built for standard furniture. I mainly played a managment role in this website, advising company leaders on decisions to be made for the website while contracting out much of the work to a prominent development firm.',
      tech: ['Magento', 'Sass', 'js', 'C#'],
    },
    {
      title: 'Safety First Pest Control',
      image: safetyFirstImage,
      type: 'Website',
      company: 'Southern View Media',
      brief_description: 'Website I designed and built using custom wordpress theme. It was for a company called Safety First Pest Control in Baldwin County, AL.',
      tech: ['Wordpress', 'Sass', 'Js', 'PHP'],
    },
    {
      title: 'Boogies Grill & Chill',
      image: boogiesImage,
      type: 'Website',
      company: 'Southern View Media',
      brief_description: 'Website I developed and paritally designed using custom wordpress theme. It was for a new restaraunt called Boogies Grill and Chill Control in Baldwin County, AL. This site makes effective use of animations and color contrasting to provide a high quality user experience.',
      tech: ['Wordpress', 'Sass', 'Js', 'PHP'],
    },
    {
      title: 'Drayton Homes',
      image: draytonImg,
      type: 'Website',
      company: 'Trent McDole',
      brief_description: 'A website I personally contracted. The site is for a home builder in Baldwin County who specializes in Foritified Homes. The site showcases properties built by the owner, a blog section to boost SEO performance, and a custom user login system built using Wordpress native functionality.',
      tech: ['Magento', 'Sass', 'js', 'C#'],
    },
    {
      title: 'Alliance Senior Services',
      image: assImage,
      type: 'Website',
      company: 'Southern View Media',
      brief_description: 'Website I designed and developed using custom wordpress theme. It was for a senior retirement center called Alliance Senior Services. The goal was to provide a nice UX/UI but not to complicated for older users.',
      tech: ['Wordpress', 'Sass', 'Js', 'PHP'],
    }
  ],
  techdegree: [
    {
      title: 'Profile Page',
      image: profilePageImg,
      brief_description: 'Create a profile page from given mockup using html and css.',
      url: 'http://tmac9494.github.io/Profile-Page-Project-/',
    },
    {
      title: 'Responsive Layout',
      image: respLayoutImg,
      brief_description: 'Create a reponsive layout that matches the given mockup.',
      url: 'http://tmac9494.github.io/Responsive-layout-project/'
    },
    {
      title: 'Online Registration Form',
      image: onlineFormImg,
      brief_description: 'Create an online Registration form using html and css that matches the given mock-up.',
      url: 'http://tmac9494.github.io/form-project/project-3/'
    },
    {
      title: 'Interactive Photo Gallery',
      image: intPhotoGallImg,
      brief_description: 'Create a photo gallery using HTML,CSS, and JavaScript. Must be able to change photos from zoomed in view and be compatible with video files.',
      url: 'http://tmac9494.github.io/Photo-Gallery-Project/project/'
    },
    {
      title: 'CSS to SASS',
      image: css2sassImg,
      brief_description: 'Refactor one of the first projects from CSS to SASS.',
      url: 'http://tmac9494.github.io/CSS-2-SASS/'
    },
    {
      title: 'SVG Site Update',
      image: svgSiteImg,
      brief_description: "Replace icons with SVG's and add SVG files to match the given mockup.",
      url: 'http://tmac9494.github.io/SVG-Site-Update/'
    },
    {
      title: 'Interactive Video Player',
      image: intVideoImg,
      brief_description: 'Create a responsive video player using JavaScript, Jquery, and Media Player Framework. Have a copy of the captions below video that highlights what section the video is on and can be clicked to jump to certain section of the video.',
      url: 'http://tmac9494.github.io/VideoPlayerProject/files/'
    },
    {
      title: 'Accessibility Refactor',
      image: accessibilityImg,
      brief_description: 'Refactor website to comply with WCAG guidelines.',
      url: 'http://tmac9494.github.io/Accessibility-Project/'
    },
    {
      title: 'Web App Dashboard',
      image: webAppImg,
      brief_description: 'Create a Web App Dashboard that matches the given mock up using HTML, CSS, JavaScript and Chart.js.',
      url: 'http://tmac9494.github.io/dashboardProjectMain/'
    },
    {
      title: 'Employee Directory from API',
      image: employeeApiImg,
      brief_description: 'Create an interactive employee directory using HTML, CSS, and JavaScript and get employee data from API.',
      url: 'http://tmac9494.github.io/EmployeeAPI_Project/'
    },
  ]
}
