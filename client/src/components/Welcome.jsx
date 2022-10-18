import React from "react";
import { Link } from "react-router-dom";
import W from "../styles/Welcome.module.css";

const Welcome = () => {
  return (
    <div className={`${W.Welcome}`}>
      <div className={`${W.Container}`}>
        <span className={`${W.LetterMachine}`}>
          Welcome guest
        </span>
        <Link to={"/countries"}>
          <button className={`${W.ButtonWelcome}`}>Ingresar</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
