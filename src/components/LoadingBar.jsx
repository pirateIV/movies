import React from "react";

const LoadingBar = ({ isLoading }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0px",
        right: "0px",
        left: "0px",
        pointerEvents: "none",
        width: "auto",
        height: "4px",
        opacity: "1",
        background:
          "repeating-linear-gradient(to right, rgb(0, 220, 130) 0%, rgb(52, 205, 254) 50%, rgb(0, 71, 225) 100%)",
        transform: "scaleX(0.5)",
        transformOrigin: "left center",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999,
      }}
    ></div>
  );
};

export default LoadingBar;
