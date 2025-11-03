import { type ReactNode } from "react";
import { spacingTokens } from "@/styles/tokens";

type StackProps = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  direction?: "row" | "column";
  gap?: keyof typeof spacingTokens;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "space-between" | "space-around";
  className?: string;
  style?: React.CSSProperties;
};

export default function Stack({
  children,
  as: Component = "div",
  direction = "column",
  gap = 4,
  align = "stretch",
  justify = "start",
  className = "",
  style,
}: StackProps) {
  return (
    <Component
      className={className}
      style={{
        display: "flex",
        flexDirection: direction,
        gap: spacingTokens[gap],
        alignItems: align === "start" ? "flex-start" : align === "end" ? "flex-end" : align,
        justifyContent:
          justify === "start"
            ? "flex-start"
            : justify === "end"
              ? "flex-end"
              : justify === "space-between"
                ? "space-between"
                : justify === "space-around"
                  ? "space-around"
                  : justify,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
