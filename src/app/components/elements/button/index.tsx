import React, { FC, HTMLAttributes } from "react";
import style from "./button.module.scss";

const Button: FC<HTMLAttributes<HTMLButtonElement> & { text?: string }> = ({
  text,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`${style.button} ${className ?? ""}`.trim()}
      {...props}
    >
      {text || children}
    </button>
  );
};

export default Button;
