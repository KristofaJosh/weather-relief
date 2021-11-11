import React from "react";
import style from "./back.module.scss";
import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <div className={style.goBack} onClick={() => navigate("/")}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M17.77 3.77L16 2 6 12l10 10 1.77-1.77L9.54 12z"></path>
      </svg>
    </div>
  );
};

export default GoBack;
