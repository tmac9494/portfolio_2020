import React from "react";
import "./styles.scss";
import { Top, SetsApart, MyStory } from "./Sections";

export const Home: React.FC = () => {
  return (
    <div id="home_page">
      <Top />
      <SetsApart />
      <MyStory />
    </div>
  );
};
