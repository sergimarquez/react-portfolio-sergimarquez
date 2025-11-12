import { type ReactNode } from "react";
import { spacingTokens, borderTokens, typographyTokens } from "@/styles/tokens";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export default function Badge({
  children,
  variant = "default",
  className = "",
  style,
  onClick,
}: BadgeProps) {
  const variantStyles = {
    default: {
      background: "var(--color-background-secondary)",
      color: "var(--color-foreground-primary)",
    },
    success: {
      background: "var(--color-status-success)",
      color: "var(--color-background-primary)",
    },
    warning: {
      background: "var(--color-status-warning)",
      color: "var(--color-background-primary)",
    },
    error: {
      background: "var(--color-status-error)",
      color: "var(--color-background-primary)",
    },
    info: {
      background: "var(--color-status-info)",
      color: "var(--color-background-primary)",
    },
  };

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        padding: `${spacingTokens[1]} ${spacingTokens[2]}`,
        fontSize: typographyTokens.fontSize.xs,
        fontWeight: typographyTokens.fontWeight.medium,
        fontFamily: typographyTokens.fontFamily.sans,
        borderRadius: borderTokens.radius.full,
        ...variantStyles[variant],
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
