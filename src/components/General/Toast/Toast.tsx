import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useSpring, animated, easings, config } from "react-spring";

export const Toast: React.FC<{
  title?: string;
  message: string;
  timeout?: number;
  buttonText?: string;
  persist?: boolean;
}> = ({ message, title, timeout, buttonText, persist }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 500);
  }, []);

  useEffect(() => {
    if (visible && visible !== render) {
      setRender(true);
    }
  }, [render, visible]);

  // hide after timeout
  useEffect(() => {
    if (!persist) {
      const hideEvent = setTimeout(() => setVisible(false), timeout);
      return () => clearTimeout(hideEvent);
    }
  }, [timeout, persist]);

  const animation = useSpring({
    x: visible ? 0 : -100,
    opacity: visible ? 1 : 0,
    config: {
      ...config.stiff,
      easing: visible ? easings.easeOutBack : easings.easeInBack,
    },
  });

  if (!render) return null;

  return (
    <animated.div
      onTransitionEnd={() => visible === false && setRender(false)}
      style={animation}
      id="toast-container"
      className="padding-3 padding-top-2 padding-bottom-2"
    >
      <div className="flex flex-row align-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="toast-icon margin-right-3"
          viewBox="0 0 512 512"
        >
          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 319.91a20 20 0 1120-20 20 20 0 01-20 20zm21.72-201.15l-5.74 122a16 16 0 01-32 0l-5.74-121.94v-.05a21.74 21.74 0 1143.44 0z" />
        </svg>
        <div>
          {title && <h2 className="margin-bottom-0">{title}</h2>}
          <p className="margin-bottom-2 margin-top-1">{message}</p>

          <div className="text-right margin-top-1">
            <button
              onClick={() => setVisible(false)}
              id="toast-btn"
              className="btn"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

Toast.defaultProps = {
  timeout: 8000,
  buttonText: "I Understand",
  persist: false,
};
