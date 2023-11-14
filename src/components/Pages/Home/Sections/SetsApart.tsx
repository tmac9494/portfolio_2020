import React from "react";
import scrollHandler from "../../scrollPropagationHandler";

export const InfoBlock: React.FC<{
  icon: any;
  background: string;
  description: string;
  title: string;
}> = ({ icon, background, description, title }) => {
  return (
    <div className="info-block">
      <div className="icon-wrap" style={{ background }}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export const SetsApart: React.FC = () => {
  return (
    <section className="section-container">
      <h2 className="section-title tl">What Sets Me Apart</h2>
      <div
        id="info_block_container"
        className="abs-center clearfix content-wrap scrollable custom-scrollbar white-scrollbar"
        onWheel={(e) => scrollHandler(e, "info_block_container")}
      >
        <InfoBlock
          background="linear-gradient(to bottom left, #FF00A1, #65009F)"
          icon={
            <svg
              className="svg-outline light abs-center"
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="512"
              viewBox="0 0 512 512"
            >
              <circle className="svg-outline light" cx="256" cy="184" r="120" />
              <circle className="svg-outline light" cx="344" cy="328" r="120" />
              <circle className="svg-outline light" cx="168" cy="328" r="120" />
            </svg>
          }
          description="Before I ever started coding I was a fairly successful artist. Focusing mainly on ink and prisma color pencils as mediums. While web and graphic design are very different worlds compared to traditional art, I firmly believe that the lessons I learned about perspective, color, and asthetic pleasure have given me tools that directly translate to good UX and UI."
          title="Passionate Designer"
        />
        <InfoBlock
          background="linear-gradient(to bottom left, #FFA200, #9F0000)"
          icon={
            <svg
              className="svg light abs-center"
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="512"
              viewBox="0 0 512 512"
            >
              <path d="M32,32V480H480V32ZM272,380c0,43.61-25.76,64.87-63.05,64.87-33.68,0-53.23-17.44-63.15-38.49h0l34.28-20.75c6.61,11.73,11.63,21.65,26.06,21.65,12,0,21.86-5.41,21.86-26.46V240h44Zm99.35,63.87c-39.09,0-64.35-17.64-76.68-42h0L329,382c9,14.74,20.75,24.56,41.5,24.56,17.44,0,27.57-7.72,27.57-19.75,0-14.43-10.43-19.54-29.68-28l-10.52-4.52c-30.38-12.92-50.52-29.16-50.52-63.45,0-31.57,24.05-54.63,61.64-54.63,26.77,0,46,8.32,59.85,32.68L396,290c-7.22-12.93-15-18-27.06-18-12.33,0-20.15,7.82-20.15,18,0,12.63,7.82,17.74,25.86,25.56l10.52,4.51c35.79,15.34,55.94,31,55.94,66.16C441.12,424.13,411.35,443.87,371.35,443.87Z" />
            </svg>
          }
          description="I learned early on in this career to find a languange/framework and stick with it. While I have dabbled in Java/Python/PHP and more, I have always been passionate about furthering my knowlege of the JavaScript landscape. Not only can I write JS but I believe I have achieved a certain level of expertise with the language
          by learning it's gotchas and pitfalls through years of experience and headaches."
          title="Javascript Enthusiast"
        />
        <InfoBlock
          background="linear-gradient(to bottom left, #00E5FF, #002A9F)"
          icon={
            <svg
              className="svg light abs-center"
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="512"
              viewBox="0 0 512 512"
            >
              <title>ionicons-v5_logos</title>
              <path d="M410.66,180.72h0q-7.67-2.62-15.45-4.88,1.29-5.25,2.38-10.56c11.7-56.9,4.05-102.74-22.06-117.83-25-14.48-66,.61-107.36,36.69q-6.1,5.34-11.95,11-3.9-3.76-8-7.36c-43.35-38.58-86.8-54.83-112.88-39.69-25,14.51-32.43,57.6-21.9,111.53q1.58,8,3.55,15.93c-6.15,1.75-12.09,3.62-17.77,5.6C48.46,198.9,16,226.73,16,255.59c0,29.82,34.84,59.72,87.77,77.85q6.44,2.19,13,4.07Q114.64,346,113,354.68c-10,53-2.2,95.07,22.75,109.49,25.77,14.89,69-.41,111.14-37.31q5-4.38,10-9.25,6.32,6.11,13,11.86c40.8,35.18,81.09,49.39,106,34.93,25.75-14.94,34.12-60.14,23.25-115.13q-1.25-6.3-2.88-12.86,4.56-1.35,8.93-2.79c55-18.27,90.83-47.81,90.83-78C496,226.62,462.5,198.61,410.66,180.72Zm-129-81.08c35.43-30.91,68.55-43.11,83.65-34.39h0c16.07,9.29,22.32,46.75,12.22,95.88q-1,4.8-2.16,9.57a487.83,487.83,0,0,0-64.18-10.16,481.27,481.27,0,0,0-40.57-50.75Q276,104.57,281.64,99.64ZM157.73,280.25q6.51,12.6,13.61,24.89,7.23,12.54,15.07,24.71a435.28,435.28,0,0,1-44.24-7.13C146.41,309,151.63,294.75,157.73,280.25Zm0-48.33c-6-14.19-11.08-28.15-15.25-41.63,13.7-3.07,28.3-5.58,43.52-7.48q-7.65,11.94-14.72,24.23T157.7,231.92Zm10.9,24.17q9.48-19.77,20.42-38.78h0q10.93-19,23.27-37.13c14.28-1.08,28.92-1.65,43.71-1.65s29.52.57,43.79,1.66q12.21,18.09,23.13,37t20.69,38.6Q334,275.63,323,294.73h0q-10.91,19-23,37.24c-14.25,1-29,1.55-44,1.55s-29.47-.47-43.46-1.38q-12.43-18.19-23.46-37.29T168.6,256.09ZM340.75,305q7.25-12.58,13.92-25.49h0a440.41,440.41,0,0,1,16.12,42.32A434.44,434.44,0,0,1,326,329.48Q333.62,317.39,340.75,305Zm13.72-73.07q-6.64-12.65-13.81-25h0q-7-12.18-14.59-24.06c15.31,1.94,30,4.52,43.77,7.67A439.89,439.89,0,0,1,354.47,231.93ZM256.23,124.48h0a439.75,439.75,0,0,1,28.25,34.18q-28.35-1.35-56.74,0C237.07,146.32,246.62,134.87,256.23,124.48ZM145.66,65.86c16.06-9.32,51.57,4,89,37.27,2.39,2.13,4.8,4.36,7.2,6.67A491.37,491.37,0,0,0,201,160.51a499.12,499.12,0,0,0-64.06,10q-1.83-7.36-3.3-14.82h0C124.59,109.46,130.58,74.61,145.66,65.86ZM122.25,317.71q-6-1.71-11.85-3.71c-23.4-8-42.73-18.44-56-29.81C42.52,274,36.5,263.83,36.5,255.59c0-17.51,26.06-39.85,69.52-55q8.19-2.85,16.52-5.21a493.54,493.54,0,0,0,23.4,60.75A502.46,502.46,0,0,0,122.25,317.71Zm111.13,93.67c-18.63,16.32-37.29,27.89-53.74,33.72h0c-14.78,5.23-26.55,5.38-33.66,1.27-15.14-8.75-21.44-42.54-12.85-87.86q1.53-8,3.5-16a480.85,480.85,0,0,0,64.69,9.39,501.2,501.2,0,0,0,41.2,51C239.54,405.83,236.49,408.65,233.38,411.38Zm23.42-23.22c-9.72-10.51-19.42-22.14-28.88-34.64q13.79.54,28.08.54c9.78,0,19.46-.21,29-.64A439.33,439.33,0,0,1,256.8,388.16Zm124.52,28.59c-2.86,15.44-8.61,25.74-15.72,29.86-15.13,8.78-47.48-2.63-82.36-32.72-4-3.44-8-7.13-12.07-11a484.54,484.54,0,0,0,40.23-51.2,477.84,477.84,0,0,0,65-10.05q1.47,5.94,2.6,11.64h0C383.81,377.58,384.5,399.56,381.32,416.75Zm17.4-102.64h0c-2.62.87-5.32,1.71-8.06,2.53a483.26,483.26,0,0,0-24.31-60.94,481.52,481.52,0,0,0,23.36-60.06c4.91,1.43,9.68,2.93,14.27,4.52,44.42,15.32,71.52,38,71.52,55.43C475.5,274.19,446.23,298.33,398.72,314.11Z" />
              <path d="M256,298.55a43,43,0,1,0-42.86-43A42.91,42.91,0,0,0,256,298.55Z" />
            </svg>
          }
          description="While JS was my primary language choice for my career I still had to decide on a frontend framework. In comes React, I started learning React in 2014 but never really used it at a professional level for another year. I struggled with understanding the one-way data flow in React like many and as a young developer it took time to sink in, but the more I learned the more excited I got to use this framework in everything I do. I strive to stay up to date with the latest updates through online blogs and an amazing podcast: React Podcast."
          title="React Engineer"
        />
        <InfoBlock
          background="linear-gradient(to bottom left, #CE00FF, #5D00FF)"
          icon={
            <svg
              className="abs-center"
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="512"
              viewBox="0 0 512 512"
            >
              <path
                d="M402,168c-2.93,40.67-33.1,72-66,72s-63.12-31.32-66-72c-3-42.31,26.37-72,66-72S405,126.46,402,168Z"
                className="svg-outline light"
              />
              <path
                d="M336,304c-65.17,0-127.84,32.37-143.54,95.41-2.08,8.34,3.15,16.59,11.72,16.59H467.83c8.57,0,13.77-8.25,11.72-16.59C463.85,335.36,401.18,304,336,304Z"
                className="svg-outline light"
              />
              <path
                d="M200,185.94C197.66,218.42,173.28,244,147,244S96.3,218.43,94,185.94C91.61,152.15,115.34,128,147,128S202.39,152.77,200,185.94Z"
                className="svg-outline light"
              />
              <path
                d="M206,306c-18.05-8.27-37.93-11.45-59-11.45-52,0-102.1,25.85-114.65,76.2C30.7,377.41,34.88,384,41.72,384H154"
                className="svg-outline light"
              />
            </svg>
          }
          description="Ever since I was young I have found it easy to integrate myself in new social structures. I tend to get along with everyone I meet and having played sports most of my childhood, crave a team oriented environment. I believe finding the right group of people that support eachother and help eachother grow can be one of the most rewarding experiences humans can have with each other."
          title="Team Oriented"
        />
        <InfoBlock
          background="linear-gradient(to top left, #769F01, #00FF90)"
          icon={
            <svg
              className="svg-outline light abs-center"
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="512"
              viewBox="0 0 512 512"
            >
              <rect
                x="32"
                y="96"
                width="64"
                height="368"
                rx="16"
                ry="16"
                className="svg-outline light"
              />
              <line
                x1="112"
                y1="224"
                x2="240"
                y2="224"
                className="svg-outline light"
              />
              <line
                x1="112"
                y1="400"
                x2="240"
                y2="400"
                className="svg-outline light"
              />
              <rect
                x="112"
                y="160"
                width="128"
                height="304"
                rx="16"
                ry="16"
                className="svg-outline light"
              />
              <rect
                x="256"
                y="48"
                width="96"
                height="416"
                rx="16"
                ry="16"
                className="svg-outline light"
              />
              <path
                d="M422.46,96.11l-40.4,4.25c-11.12,1.17-19.18,11.57-17.93,23.1l34.92,321.59c1.26,11.53,11.37,20,22.49,18.84l40.4-4.25c11.12-1.17,19.18-11.57,17.93-23.1L445,115C443.69,103.42,433.58,94.94,422.46,96.11Z"
                className="svg-outline light"
              />
            </svg>
          }
          description="At age 21 I finally fell in love with learning and I felt like I got jipped. Most of my life I did not actively pursue learning new things on a daily basis and my life was not as full because of it. Through web development I had a never ending list of things to learn that continues to grow today. I believe it is essential to being a strong developer to humble yourself and recognize you will never be done learning. Also quantum physics and astronomy are great subjects to get lost in as well."
          title="Life Long Learner"
        />
      </div>
    </section>
  );
};
