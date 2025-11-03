/**
 * Color tokens - Framework-agnostic design tokens
 * Uses CSS custom properties for runtime access in styles
 */

export const colorTokens = {
  // Semantic colors
  background: {
    primary: "var(--color-background-primary)",
    secondary: "var(--color-background-secondary)",
  },
  foreground: {
    primary: "var(--color-foreground-primary)",
    secondary: "var(--color-foreground-secondary)",
    muted: "var(--color-foreground-muted)",
  },
  border: {
    default: "var(--color-border-default)",
    muted: "var(--color-border-muted)",
  },
  // Interactive colors
  interactive: {
    default: "var(--color-interactive-default)",
    hover: "var(--color-interactive-hover)",
    active: "var(--color-interactive-active)",
    disabled: "var(--color-interactive-disabled)",
  },
  // Status colors
  status: {
    success: "var(--color-status-success)",
    warning: "var(--color-status-warning)",
    error: "var(--color-status-error)",
    info: "var(--color-status-info)",
  },
} as const;

/**
 * Type-safe color token keys for TypeScript usage
 */
export type ColorToken = typeof colorTokens;
