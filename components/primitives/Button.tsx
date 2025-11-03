import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { spacingTokens, borderTokens, typographyTokens } from "@/styles/tokens";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  // Size styles
  const sizeStyles = {
    sm: {
      padding: `${spacingTokens[2]} ${spacingTokens[4]}`,
      fontSize: typographyTokens.fontSize.sm,
    },
    md: {
      padding: `${spacingTokens[3]} ${spacingTokens[6]}`,
      fontSize: typographyTokens.fontSize.base,
    },
    lg: {
      padding: `${spacingTokens[4]} ${spacingTokens[8]}`,
      fontSize: typographyTokens.fontSize.lg,
    },
  };

  // Variant styles
  const variantStyles = {
    primary: {
      background: "var(--color-interactive-default)",
      color: "var(--color-background-primary)",
      border: "none",
    },
    secondary: {
      background: "transparent",
      color: "var(--color-interactive-default)",
      border: `${borderTokens.width.base} solid var(--color-border-default)`,
    },
    ghost: {
      background: "transparent",
      color: "var(--color-interactive-default)",
      border: "none",
    },
  };

  const disabledStyles = disabled
    ? {
        opacity: 0.5,
        cursor: "not-allowed",
      }
    : {};

  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...disabledStyles,
        fontFamily: typographyTokens.fontFamily.sans,
        fontWeight: typographyTokens.fontWeight.medium,
        borderRadius: borderTokens.radius.md,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        ...(props.style || {}),
      }}
      onMouseEnter={(e) => {
        if (!disabled && variant === "primary") {
          e.currentTarget.style.background = "var(--color-interactive-hover)";
        } else if (!disabled && variant === "secondary") {
          e.currentTarget.style.borderColor = "var(--color-interactive-hover)";
        }
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = variantStyles[variant].background;
          e.currentTarget.style.borderColor =
            variant === "secondary" ? variantStyles[variant].border : "transparent";
        }
        props.onMouseLeave?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
