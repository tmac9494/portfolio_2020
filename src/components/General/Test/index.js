import React, { useState, useEffect } from 'react';

const FadeInOut = ({ children, duration }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let interval;

    const fadeIn = () => {
      interval = setInterval(() => {
        setOpacity((prevOpacity) => {
          if (prevOpacity + 0.1 >= 1) {
            clearInterval(interval);
            return 1;
          }
          return prevOpacity + 0.1;
        });
      }, duration / 10);
    };

    const fadeOut = () => {
      interval = setInterval(() => {
        setOpacity((prevOpacity) => {
          if (prevOpacity - 0.1 <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prevOpacity - 0.1;
        });
      }, duration / 10);
    };

    fadeIn();
    setTimeout(fadeOut, duration / 2);

    return () => clearInterval(interval);
  }, [duration]);

  return <div style={{ opacity, transition: `opacity ${duration}ms ease-in-out` }}>{children}</div>;
};

export default FadeInOut;
