import React from "react";
import { useDevice } from "../../../General";
import { TimelineSlider } from "../../../TimelineSlider";

export type StoryBlock = {
  subject: string;
  title: string;
  content: string[];
  images: string[];
};

const dataSet: StoryBlock[] = [
  {
    subject: "Humble Beginnings",
    title: "Humble Beginnings",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: ["test"],
  },
  {
    subject: "Second",
    title: "Second Title Here",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: ["test"],
  },
  {
    subject: "Third",
    title: "Third Title Here",
    content: [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: ["test"],
  },
  {
    subject: "Fourth",
    title: "Fourth Title Here",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: ["test"],
  },
  {
    subject: "Fifth",
    title: "Fifth Title Here",
    content: [
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
      "Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    ],
    images: ["test"],
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
