import { type ReactNode } from "react";
import { spacingTokens, borderTokens, shadowTokens } from "@/styles/tokens";

type CardProps = {
  children: ReactNode;
  as?: "div" | "article" | "section";
  padding?: keyof typeof spacingTokens;
  shadow?: keyof typeof shadowTokens;
  className?: string;
};

export default function Card({
  children,
  as: Component = "div",
  padding = 6,
  shadow = "base",
  className = "",
}: CardProps) {
  return (
    <Component
      className={className}
      style={{
        padding: spacingTokens[padding],
        backgroundColor: "var(--color-background-primary)",
        border: `${borderTokens.width.thin} solid var(--color-border-default)`,
        borderRadius: borderTokens.radius.lg,
        boxShadow: shadowTokens[shadow],
      }}
    >
      {children}
    </Component>
  );
}
