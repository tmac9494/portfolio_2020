import xdLogo from '../../../../assets/xd-logo.svg';
import standardLogo from '../../../../assets/standard-logo.svg';
import svmLogo from '../../../../assets/svm.png';
import afmLogo from '../../../../assets/afm.png';
import psLogo from '../../../../assets/plussum.png';

export default {
  jobs: [
    {
      company: 'XpertDox LLC',
      logo: xdLogo,
      cityState: 'Birmingham, AL',
      startDate: 'June 2019',
      endDate: 'Present',
      title: 'Lead Developer',
      description: '',
      bullets: [
        'Refactor application suite to use React 16+.',
        'Architect and develop new apps and features.',
        'Design new applications and redesign old applications to improve UI/UX across the suite.',
        'Manage India based team education on react updates and coding standards, and development progress on applications. Perform code reviews for India team.',
        'Revamped entire development process from a “Develop First” process to a “Design First” process.',
        'Architect, design, and develop SSO app to centralize user login across applications.',
        'Build a reusable component library to speed up the development process and phase out unreliable/unsecure third party components. Write Readme files for components so the team could easily understand how to use them.',
        'Replaced overly complex and resource heavy redux providers with React Context providers which decreased load times and reduced developer confusion.',
      ]
    },
    {
      company: 'Standard Furniture',
      logo: standardLogo,
      cityState: 'Bay Minette, AL',
      startDate: 'September 2018',
      endDate: 'June 2019',
      title: 'Web Designer/Full Stack Javascript Developer',
      description: '',
      bullets: [
        'Help diagnose core problems around the current Ecomm platform and ensure they do not persist into the new platform.',
        'Assist contracted teams in design and development of the new Ecomm website platform.',
        'Advise leadership on technical decisions in the design and development process as well as accessibility and SEO concerns.',
        'Expand the finished platform into a highly iterable PWA for marketing and Ecomm needs.',
        'Use ReactJS, MongoDB, NodeJS, and Express to create Web applications to automate and speed up workflows throughout the company.',
        'Maintain Linux server on the intranet that hosts the suite of applications.',
        'Developed KitBuilder: to quickly aggregate multiple products into a single kit and upload it to our cloud server.',
        'Developed ImageBot: upload multiple images instantly and the bot will analyze the image names and compare them with matched products and sort them Into the correct image attributes. The bot will also clean other image data during the scan process to slowly perfect our data structure.',
        'Developed wordBot: breaks product data down from the api and generate keywords, content, and a wsywig editor for custom content creation on the fly.',
        'Developed QA submission: a web app that runs on a tablet and auto generates information and performs automatic calculations to drastically increase the speed of the product quality assurance process.',
      ]
    },
    {
      company: 'Southern View Media',
      logo: svmLogo,
      logoClass: 'square',
      cityState: 'Mobile, AL',
      startDate: 'January 2018',
      endDate: 'September 2018',
      title: 'Web Developer/Graphic Designer',
      description: '',
      bullets: [
        'Design web graphics and rack cards for various businesses.',
        'Coordinate with designers and customers to create website or application to fit their needs.',
        'Design and build websites and web apps.',
        'Represent the company at weekly BNI meetings.',
        'Help educate other developers on the latest standards and help implement them into the workflow.',
      ]
    },
    {
      company: 'Plus Sum Internet Marketing',
      logo: psLogo,
      logoClass: 'square',
      cityState: 'Mobile, AL',
      startDate: 'January 2016',
      endDate: '2018',
      title: 'Owner/Lead Developer',
      description: '',
      bullets: [
        'Started a small company developing websites for local business',
        'Developing websites with PHP and WORDPRESS ',
        'Consulting with customers.',
        'Selling website and SEO packages.',
        'Logo and Graphic Design.',
        'Coordinating entry level developers and content writers.'
      ]
    },
    {
      company: 'A Factor Marketing',
      cityState: 'Mobile, AL',
      logo: afmLogo,
      logoClass: 'square',
      startDate: 'May 2015',
      endDate: 'January 2016',
      title: 'Developer/Designer',
      description: '',
      bullets: [
        'Develop websites assigned to me.',
        'Talk to customers and explain the development process.',
        'Collaborate with other developers on certain contracts.',
        'The go-to guy for logo and graphic design.',
      ]
    },
  ],
  education: [
    {
      title: 'Front End Web Development Tech Degree',
      issuer: 'teamtreehouse.com',
      type: 'Certificate',
      startDate: 'September 2016',
      endDate: 'May 2018',
      url: 'https://www.credential.net/jne09uqa',
    },
    {
      title: 'High School Diploma',
      issuer: 'Theodore High School',
      type: 'Education',
      startDate: '2009',
      endDate: '2012'
    }
  ]
}
