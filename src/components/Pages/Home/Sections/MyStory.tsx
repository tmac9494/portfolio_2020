import React from "react";
import { useDevice } from "../../../General";
import { TimelineSlider } from "../../../TimelineSlider";
import sampleImage from "../../../../assets/barton.jpg";

export type StoryBlock = {
  subject: string;
  title: string;
  content: string[];
  images: string[];
};

const dataSet: StoryBlock[] = [
  {
    subject: "Childhood",
    title: "Well Rounded and Thinking Ahead",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [sampleImage],
  },
  {
    subject: "College Years",
    title: "Connections Made and Lessons Learned",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [sampleImage],
  },
  {
    subject: "A New Hope",
    title: "New Possibilities and an Old Feeling",
    content: [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [sampleImage],
  },
  {
    subject: "Humble Beginnings",
    title: "Knock Knock. Whose there? A Portfolio",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [sampleImage],
  },
  {
    subject: "Forged in Fire",
    title: "A Pit in The Stomach, and a Race in The Heart",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [sampleImage],
  },
  {
    subject: "Learning to Lead",
    title: "Engineering is Challenging, but People Even More So",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [sampleImage],
  },
  {
    subject: "Finding Balance",
    title: "Growing The Family, Going Remote, and Entering a Pandemic",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [sampleImage],
  },
  {
    subject: "Looking Forward",
    title: "Great Cultures, Great Products, and a Little More Fire",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: [sampleImage],
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
