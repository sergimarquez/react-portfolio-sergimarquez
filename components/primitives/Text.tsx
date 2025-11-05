import { type ReactNode } from "react";
import { typographyTokens } from "@/styles/tokens";

type TextSize = keyof typeof typographyTokens.fontSize;
type TextWeight = keyof typeof typographyTokens.fontWeight;

type TextProps = {
  children: ReactNode;
  as?: "p" | "span" | "div" | "strong" | "em" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: TextSize;
  weight?: TextWeight;
  color?: "primary" | "secondary" | "muted";
  className?: string;
  style?: React.CSSProperties;
};

export default function Text({
  children,
  as: Component = "p",
  size = "base",
  weight = "normal",
  color = "primary",
  className = "",
  style,
}: TextProps) {
  const fontSize = typographyTokens.fontSize[size];
  const fontWeight = typographyTokens.fontWeight[weight];
  const colorVar =
    color === "primary"
      ? "var(--color-foreground-primary)"
      : color === "secondary"
        ? "var(--color-foreground-secondary)"
        : "var(--color-foreground-muted)";

  return (
    <Component
      className={className}
      style={{
        fontSize,
        fontWeight,
        color: colorVar,
        lineHeight: typographyTokens.lineHeight.normal,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
