import React from "react";
import classes from "./Home.module.css";

export const Home = () => {
  return (
    <div className={classes.home}>
      <h3>Log Your Travels</h3>
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className = {classes.logo}
      >
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
      </svg>
    </div>
  );
};
