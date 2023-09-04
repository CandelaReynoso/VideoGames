import styles from "./landing.css";
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
        <Link to="/home">
          <h4 className = "h4">START</h4>
        </Link>
      </div>
  );
};

export default Landing;
