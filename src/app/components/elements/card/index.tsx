import React, { FC } from "react";
import style from "./card.module.scss";

const FrostCard: FC<{ className?: string; onClick?: () => void; }> = ({ children, onClick, className }) => {
  return (
    <div className={`${style.frostCard} ${className ?? ""}`} onClick={onClick}>{children}</div>
  );
};

export default FrostCard;
