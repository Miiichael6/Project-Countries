import React from "react";
import  ErrorIMG  from "../imgs/404error.png"
import ERROR from "../styles/Error.module.css"

const Error404 = () => {
  return (
    <div className={ERROR.ContainError}>
      <div className={`${ERROR.imgContainer}`}>
      <img src={ErrorIMG} alt="404 Error" />
      </div>
    </div>
  );
};

export default Error404;
