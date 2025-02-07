import React from "react";
import { TimelineSlider } from "../../../components/TimelineSlider";
import plussumlogo from "../../../assets/plussum.png";
import childhoodImage1 from "../../../assets/story/childhood1.jpg";
import childhoodImage2 from "../../../assets/story/childhood2.jpg";
import childhoodImage5 from "../../../assets/story/childhood5.jpg";
import childhoodImage10 from "../../../assets/story/childhood10.jpg";
import collegeImage1 from "../../../assets/story/college1.jpg";
import collegeImage2 from "../../../assets/story/college2.jpg";
import collegeImage4 from "../../../assets/story/college.jpg";
import hopeImage1 from "../../../assets/story/hope1.jpg";
import hopeImage2 from "../../../assets/story/hope2.jpg";
import hopeImage3 from "../../../assets/story/hope3.jpg";
import humbleImage2 from "../../../assets/story/humble2.jpg";
import humbleImage3 from "../../../assets/story/humble3.jpg";
import pitImage1 from "../../../assets/story/pit1.jpg";
import pitImage2 from "../../../assets/story/pt2.jpg";
import ltlImage1 from "../../../assets/story/ltl1.jpg";
import ltlImage2 from "../../../assets/story/ltl2.jpg";
import ltlImage3 from "../../../assets/story/ltl3.jpg";
import growImage1 from "../../../assets/story/grow1.jpg";
import growImage2 from "../../../assets/story/grow2.jpg";
import growImage3 from "../../../assets/evernote-logo.png";
import greatImage1 from "../../../assets//story/great1.jpg";
import greatImage2 from "../../../assets//story/great2.jpg";
import greatImage3 from "../../../assets//story/great3.jpg";
import greatImage4 from "../../../assets//story/great4.jpg";

export type StoryBlock = {
  subject: string;
  title: string;
  content: string[];
  images: StoryImage[];
};

export type StoryImage = {
  src: string;
  alt?: string;
};

const dataSet: StoryBlock[] = [
  {
    subject: "Childhood",
    title: "Well Rounded and Thinking Ahead",
    content: [
      "Throughout my childhood I was fairly well rounded, enjoying activities like Football, Guitar, and Art. I also always had a gift for quickly befriending most people I met which persists to this day.",
      "In high school an amazing teacher took notice of my artistic talent and pushed me to start AP classes culminating in many competition wins, getting officially published, and other accolades.",
      "That same teacher told me later in life she’d never met a high school student that thought so much about his future. Her comment came from my decision to pursue Electrical Engineering instead of following art like most of my AP Art peers. The 2008 Financial Crisis took a toll on my family and job security was the most important thing for me at that time.",
      "I left my childhood years with fond memories, many friends, no arrests and I was voted Mr. THS, Prom King, and Most Artistic; by my peers.",
    ],
    images: [
      {
        src: childhoodImage1,
        alt: "Tough fight in football game",
      },
      {
        src: childhoodImage5,
        alt: "Picture with friend after awards",
      },
      {
        src: childhoodImage2,
        alt: "Picture of me relaxing",
      },
      {
        src: childhoodImage10,
        alt: "",
      },
    ],
  },
  {
    subject: "College Years",
    title: "Connections Made and Lessons Learned",
    content: [
      "College was a bit of a mixed bag for me. I attended the University of South Alabama for 2 years starting in 2013. I enjoyed a lot of it, made many friends and connections through the Greek organizations and learned some useful things. I also got a part-time job through a new friend delivering mattresses at this time.",
      "The problem came from a complete emptiness and lack of drive that I couldn’t place at the time. Later in life, reflecting on that time; it was clear that losing all the passionate work in my life and trying to force myself to learn stuff that I wasn’t interested in was excruciatingly difficult for me.",
      "I dropped out two years in with a below average GPA and feeling defeated. My brain could not handle a fourteenth year of English class and filter classes full of paperwork. I felt terrible shame and lost a lot of confidence. For the first time, the plan in my head started to fall apart.",
    ],
    images: [
      {
        src: collegeImage1,
        alt: "",
      },
      {
        src: collegeImage4,
        alt: "",
      },
      {
        src: collegeImage2,
        alt: "",
      },
    ],
  },
  {
    subject: "A New Hope",
    title: "New Possibilities and an Old Feeling",
    content: [
      "A year of music festivals and old friends has passed. No longer delivering mattresses, I was selling them in the store now. This is the point of the story when I introduce Haley. She’s been here for all of it. We were high school sweethearts and I wanted to marry her, but my current income was not enough. I was not proud of my job and I knew I was capable of more, so I began considering welding as a profession. I would get a creative outlet and it’s a reliable trade.",
      "While researching online side jobs to help save money for welding school, I stumbled across the term “web developer” for the first time. After seeing the job market for this field in the US labor statistics and learning that you could teach yourself I was sold. I began spending every minute of the workday learning to code. Only taking a break when customers came in with questions.",
      "The first night after I discovered this I spent all night talking to Haley about it, feeling sure I had found what I was meant to do. See, something big happened at this time; the passion I always had for Art and need for creativity drove my learning and was an asset instead of a hindrance. I wanted to learn as much as I could because every style property and animation was another tool to create UI, to create Art. I fell in love with learning and began to learn more than just code, I developed an insatiable appetite for knowledge. Physics, politics, psychology I just wanted to constantly learn new things. It really was my own personal renaissance.",
    ],
    images: [
      {
        src: hopeImage2,
        alt: "",
      },
      {
        src: hopeImage3,
        alt: "",
      },
      {
        src: hopeImage1,
        alt: "",
      },
    ],
  },
  {
    subject: "Humble Beginnings",
    title: "Knock Knock. Who's there? A Web Developer",
    content: [
      "How do you turn knowledge into experience in an area with few web development jobs and no car? Well by walking door to door and offering to do websites for free of course. This was my plan and I got 3 websites done for local business to put together a half-decent portfolio. I look back on this time with immense pride in my attitude and tenacity.",
      "One fateful day I was sitting behind the desk at the mattress store continuing my JavaScript learning when a woman came in looking for a mattress. Mrs. Wendy would turn out to be a Senior Web Developer and recently started a local marketing firm with a business partner. I sold her a mattress and she offered me a job.",
      "I met an amazing coworker while working with Mrs. Wendy and finally had a year of experience under my belt. The Marketing firm was not working out and would shut down soon. Long story short I convinced my old boss from the mattress store to fund a small web development firm of our own. The owner – Mr. Mike became a mentor in business and productivity and I gained a lot of experience getting requirements and feedback from many different customers in various industries.",
      "I also convinced Mr. Mike to pay for a Technical Degree through teamtreehouse.com at this time as well. He was paying $500 a month in marketing/graphic design services at the mattress store that I would manage for free if he could pay the high monthly fee on the Tech Degree.",
      "Mr. Mike would have personal tragedies that required him to turn his attention to his family. I would go on to take a job with a fantastic marketing firm by the name of Southern View Media.",
    ],
    images: [
      {
        src: humbleImage2,
        alt: "",
      },
      {
        src: plussumlogo,
        alt: "",
      },
      {
        src: humbleImage3,
        alt: "",
      },
    ],
  },
  {
    subject: "Forged in Fire",
    title: "A Pit in The Stomach, and a Race in The Heart",
    content: [
      "I outgrew Southern View Media but left on good terms with fond memories. I got a lot of great experience coaching junior developers, working with designers, and got featured in a local magazine as one of the 50 most interesting. ",
      "I wanted to pursue full time application work and move away from traditional websites to grow my career and continue down the planned path. I got a job at Standard Furniture and was initially hired to work on the new ecommerce platform. We ended up outsourcing that work mostly and I took more of an advisory role. Feeling restless and seeing the need for solutions during this transition period in the company, I began developing applications on the internal network to solve business problems. ",
      "I was the only real web developer at the company and there was no Engineering team. These applications came from people in the company needing solutions and my hunger to be better. I was in over my head with no support outside of the teams using the apps and the ecommerce team - the pit in the stomach. I was pumping out tons of rough code but getting nothing but good feedback from the departments in the company. I went from only understanding godaddy servers to solely managing/designing/developing 3 applications on the company intranet. I would be the last one there every day scribbling on white boards and typing away - the race in the heart.",
      "This combination of fear and passion created a rate of learning I haven't matched since. In one year I went from a good front end web developer to understanding web sockets, server management, api integrations, how to communicate to stakeholders, and what it feels like to have a team where everyone is passionate about what you're doing.",
      "I didn’t have any coders to help me at that time but I did  have an amazing coworker by the name of Tom Ascher. He always said he couldn’t write code but he could read it. Together we were unstoppable. Tom would feed off of my passion for the applications and effectively communicate to higher ups the development goals and progress.",
    ],
    images: [
      {
        src: pitImage2,
        alt: "",
      },
      {
        src: pitImage1,
        alt: "",
      },
    ],
  },
  {
    subject: "Learning to Lead",
    title: "New City, New Challenges",
    content: [
      "I moved to Birmingham Alabama with Haley to pursue more challenging application development. While in the moving process we also found out Haley was pregnant with our first child. I worked at XpertDox for a number of years coming in with the responsibility of leading the front end development of the suite of applications.",
      "We were a small startup team with big challenges. I began with refactoring the applications to use React hooks and implementing a design system. I also developed the company into a “design first” mindset, quickly removing some of the tech-debt building habits that had developed over the years. I designed every UX/UI change and iterated on them with the stakeholders and leadership. At this time I began coaching our small offshore team on the new standards and patterns to use on the frontend in order to share the knowledge amongst the engineers.",
      "I am very proud of my growth at XpertDox. It was hard work but I developed a custom SSO, started my love of data visualization, learned how to lead and work through engineering disagreements in a healthy way. Covid-19 hurt XpertDox and I went part time with them for a year before leaving for new opportunities.",
    ],
    images: [
      {
        src: ltlImage2,
        alt: "",
      },
      {
        src: ltlImage3,
        alt: "",
      },
      {
        src: ltlImage1,
        alt: "",
      },
    ],
  },
  {
    subject: "Finding Balance",
    title: "Growing The Family and Going Remote",
    content: [
      "I had always planned on eventually working remotely because my wife wanted to stay close to family, especially after we decided to have our second child. The pandemic accelerated my plans and I began working part-time with Xpertdox as well as Carallel. I would eventually leave the part-time contract roles for another position with GovermentCIO, specifically working on their VA contract.",
      "The teams at this time were invaluable for learning more about the professional non-startup work culture. Jira ticketing systems, and sprint planning was a breath of fresh air from my last 5 years on unorganized fast paced teams. At this time I began to struggle with my productivity, I did not receive any bad remarks from my superiors but it was something I would volunteer in one on one meetings. ",
      "I knew what my pace and work ethic was but I was in a bit of a lull I could not place. After some reflection I realized that going to remote work was a big mental shift for me. My entire life my social skills have been a trait I was proud of but I never realized how much of a social creature I was until I was alone all the time. I changed my habits and began to make sure I was taking time to be social for my mental health but Evernote is where I really began to understand the solution.",
    ],
    images: [
      {
        src: growImage3,
        alt: "",
      },
      {
        src: growImage2,
        alt: "",
      },
      {
        src: growImage1,
        alt: "",
      },
    ],
  },
  {
    subject: "Looking Forward",
    title: "Great Cultures, Great Products",
    content: [
      "At Evernote I found a team culture that was next to none that had come before. I immediately felt welcome and we cultivated a practice of engaging communication. Everyone voiced their input and the meetings had a sense of social fun to them outside of the day to day grind of tickets. I think the key factors in this social remote culture we created was a habit of always keeping our cameras on, quickly working to understand and get to know new members of the team, and having an open war room to jump into and ask questions and talk whenever you ran into issues.",
      "I felt my productivity fully return and I learned how to properly work in a remote setting without sacrificing the benefits of being next to team members in the office. Leaving Evernote was heartbreaking, our entire team really developed a strong social bond and the company was bought out without any of us being aware. Our lead engineer at the time, Roberto Olivares; was a fantastic engineering manager and left all of us with a single word that he would use to describe us. For me he chose ‘Tenacious’, it really spoke to me about how I felt about my history getting to that point.",
      "I would go on to work with Northwestern Mutual and luckily found another amazing team culture. I brought with me the habits and practices we developed at Evernote to create the same culture of communication and social comradery that I have grown to love. I began work on a new AIP product with the Comprehensive Asset Allocation team and began a part-time contract with MIT on the weekends working on polymer research data visualization.",
    ],
    images: [
      {
        src: greatImage3,
        alt: "",
      },
      {
        src: greatImage2,
        alt: "",
      },
      {
        src: greatImage4,
        alt: "",
      },
      {
        src: greatImage1,
        alt: "",
      },
    ],
  },
];

export const MyStory: React.FC = () => {
  return (
    <section
      className="section-container padding-top-4 padding-bottom-4"
      id="my_story_section"
    >
      <div className="site-content-wrap" id="my_story_container">
        <h2 className="section-title text-center">My Story</h2>

        <TimelineSlider list={dataSet} />
      </div>
    </section>
  );
};
