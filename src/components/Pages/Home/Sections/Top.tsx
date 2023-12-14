import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SnakeGame } from "../../../SnakeGame";

export const Top: React.FC = () => {
  const [showSnakeGame, setShowSnakeGame] = useState<boolean>();

  return (
    <section className="section-container">
      <div className="top-content">
        <h1 className="section-title">Trent McDole</h1>
        <span className="pos-title">Full-Stack Javascript Engineer</span>
        <p className="description">
          Welcome to my portfolio! Built using React and Sass, this application
          strives to showcase my creativity, experience, and love for unique
          user experiences. Please navigate through the application to learn
          more about myself and what I value in technology and work life. Thanks
          for visiting!
        </p>
        <NavLink to="/work" className="cool-btn c2a-btn home-btn">
          Show Me Your Work
        </NavLink>
        <NavLink to="/skills" className="warm-btn c2a-btn home-btn">
          What Are You Good At?
        </NavLink>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            setShowSnakeGame(true);
          }}
          className="btn snake-game-btn"
        >
          I want to play Snake
        </button>
        {showSnakeGame && (
          <div id="portfolio-snake-game" className="margin-top-5">
            <SnakeGame size={15} />
          </div>
        )}
      </div>
    </section>
  );
};
