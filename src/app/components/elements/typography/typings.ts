import React, { CSSProperties, FC, HTMLAttributes } from "react";

type fontLevels = "large" | "medium" | "f32" | "f28" | "f22" | "f18" | "f16" | "f14" | "f12";

type TypographyBaseType = { text?: string; weight?: 300 | 400 | 600 };

export type TextHeadingsComponent = React.FC<
  HTMLAttributes<HTMLHeadingElement> &
    TypographyBaseType & { size?: fontLevels; level?: 1 | 2 | 3 | 4 | 5 }
>;

type TypographyType = FC<
  HTMLAttributes<HTMLParagraphElement> &
    TypographyBaseType & { level?: fontLevels }
>;

export type TypographyBase = TypographyType & {
  Heading: TextHeadingsComponent;
};
