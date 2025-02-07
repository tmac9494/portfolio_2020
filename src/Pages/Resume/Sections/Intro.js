import React from "react";

const Intro = (props) => {
  return (
    <section className="section-container">
      <div className="top-content">
        <h1>Real Time PDF Resume Generation in React</h1>
        <div className="info">
          <p>
            My resume is generated in real time using the data from this
            application. I did this to not only limit the amount of things I
            have to manually change when updating my work history, but also to
            showcase my knowledge of real time PDF genration in the React
            ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
