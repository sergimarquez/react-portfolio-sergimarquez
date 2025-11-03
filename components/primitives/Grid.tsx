import { type ReactNode } from "react";
import { spacingTokens } from "@/styles/tokens";

type GridProps = {
  children: ReactNode;
  as?: "div" | "section" | "article";
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: keyof typeof spacingTokens;
  className?: string;
  style?: React.CSSProperties;
};

export default function Grid({
  children,
  as: Component = "div",
  cols = 3,
  gap = 4,
  className = "",
  style,
}: GridProps) {
  // Responsive columns: 1 on mobile, 2 on tablet, full cols on desktop
  const responsiveCols = {
    1: "repeat(1, 1fr)",
    2: "repeat(auto-fit, minmax(250px, 1fr))",
    3: "repeat(auto-fit, minmax(300px, 1fr))",
    4: "repeat(auto-fit, minmax(200px, 1fr))",
    6: "repeat(auto-fit, minmax(150px, 1fr))",
    12: "repeat(12, 1fr)",
  };

  return (
    <Component
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: responsiveCols[cols] || `repeat(${cols}, 1fr)`,
        gap: spacingTokens[gap],
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
