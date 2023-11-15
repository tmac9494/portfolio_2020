import React from "react";
import { useDevice } from "../../../General";
import { TimelineSlider } from "../../../TimelineSlider";
import sampleImage from "../../../../assets/barton.jpg";
import sampleImage2 from "../../../../assets/nm.png";
import sampleImage3 from "../../../../assets/afm.png";

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

const image = {
  src: sampleImage,
  alt: "test",
};
const image1 = {
  src: sampleImage2,
  alt: "test",
};
const image2 = {
  src: sampleImage3,
  alt: "test",
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
    images: [image, image1, image2],
  },
  {
    subject: "College Years",
    title: "Connections Made and Lessons Learned",
    content: [
      "College was a bit of a mixed bag for me. I attended the University of South Alabama for 2 years starting in 2013. I enjoyed a lot of it, made many friends and connections through the Greek organizations and learned some useful things. I also got a part-time job through a new friend delivering mattresses at this time.",
      "The problem came from a complete emptiness and lack of drive that I couldn’t place at the time. Later in life, reflecting on that time; it was clear that losing all the passionate work in my life and trying to force myself to learn stuff that I wasn’t interested in was excruciatingly difficult for me.",
      "I dropped out two years in with a below average GPA and feeling defeated. My brain could not handle a fourteenth year of English class and filter classes full of paperwork. I felt terrible shame and lost a lot of confidence. For the first time, the plan in my head started to fall apart.",
    ],
    images: [image, image1, image2],
  },
  {
    subject: "A New Hope",
    title: "New Possibilities and an Old Feeling",
    content: [
      "A year of music festivals and old friends has passed. No longer delivering mattresses, I was selling them in the store now. This is the point of the story when I introduce Haley. She’s been here for all of it. We were high school sweethearts and I wanted to marry her, but my current income was not enough. I was not proud of my job and I knew I was capable of more, so I began considering welding as a profession. I would get a creative outlet and it’s a reliable trade.",
      "While researching online side jobs to help save money for welding school, I stumbled across the term “web developer” for the first time. After seeing the job market for this field in the US labor statistics and learning that you could teach yourself I was sold. I began spending every minute of the workday learning to code. Only taking a break when customers came in with questions.",
      "The first night after I discovered this I spent all night talking to Haley about it, feeling sure I had found what I was meant to do. See, something big happened at this time; the passion I always had for Art and need for creativity drove my learning and was an asset instead of a hindrance. I wanted to learn as much as I could because every style property and animation was another tool to create UI, to create Art. I fell in love with learning and began to learn more than just code, I developed an insatiable appetite for knowledge. Physics, politics, psychology I just wanted to constantly learn new things. It really was my own personal renaissance.",
    ],
    images: [image, image1, image2],
  },
  {
    subject: "Humble Beginnings",
    title: "Knock Knock. Whose there? A Portfolio",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [image, image1, image2],
  },
  {
    subject: "Forged in Fire",
    title: "A Pit in The Stomach, and a Race in The Heart",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [image, image1, image2],
  },
  {
    subject: "Learning to Lead",
    title: "Engineering is Challenging, but People Even More So",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [image, image1, image2],
  },
  {
    subject: "Finding Balance",
    title: "Growing The Family, Going Remote, and Entering a Pandemic",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [image, image1, image2],
  },
  {
    subject: "Looking Forward",
    title: "Great Cultures, Great Products, and a Little More Fire",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [image, image1, image2],
  },
];

export const MyStory: React.FC = () => {
  const device = useDevice();

  return (
    <section className="section-container">
      <div className="site-content-wrap" id="my_story_container">
        <h2 className="section-title text-center">My Story</h2>

        <TimelineSlider list={dataSet} />
      </div>
    </section>
  );
};
