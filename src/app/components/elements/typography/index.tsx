import React from "react";
import style from "./text.module.scss";
import { TextHeadingsComponent, TypographyBase } from "./typings";

const Typography: TypographyBase = ({
  children,
  className,
  style: cssStyle,
  level,
  weight,
  ...props
}) => {
  return (
    <p
      className={`${style.text} ${level ?? ""} ${className ?? ""}`}
      style={{ fontWeight: weight, ...cssStyle }}
      {...props}
    >
      {children}
    </p>
  );
};

const Heading: TextHeadingsComponent = ({
  children,
  className,
  weight,
  level = 1,
  size,
  ...props
}) => {
  return React.createElement(
    `h${level}`,
    {
      ...props,
      fontWeight: weight,
      className: `${style.text} ${size ?? ""} ${className ?? ""}`,
    },
    children
  );
};

Typography.Heading = Heading;

export default Typography;
