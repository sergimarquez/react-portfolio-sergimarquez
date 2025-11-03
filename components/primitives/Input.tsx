import { type InputHTMLAttributes, forwardRef } from "react";
import { spacingTokens, borderTokens, typographyTokens } from "@/styles/tokens";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: spacingTokens[2] }}>
        {label && (
          <label
            htmlFor={props.id}
            style={{
              fontSize: typographyTokens.fontSize.sm,
              fontWeight: typographyTokens.fontWeight.medium,
              color: "var(--color-foreground-primary)",
              fontFamily: typographyTokens.fontFamily.sans,
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={props.type || "text"}
          id={props.id}
          className={className}
          style={{
            padding: spacingTokens[3],
            fontSize: typographyTokens.fontSize.base,
            fontFamily: typographyTokens.fontFamily.sans,
            color: "var(--color-foreground-primary)",
            backgroundColor: "var(--color-background-primary)",
            border: `${borderTokens.width.base} solid ${
              error ? "var(--color-status-error)" : "var(--color-border-default)"
            }`,
            borderRadius: borderTokens.radius.md,
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--color-interactive-default)";
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error
              ? "var(--color-status-error)"
              : "var(--color-border-default)";
            props.onBlur?.(e);
          }}
          {...props}
        />
        {error && (
          <span
            style={{
              fontSize: typographyTokens.fontSize.sm,
              color: "var(--color-status-error)",
              fontFamily: typographyTokens.fontFamily.sans,
            }}
          >
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
