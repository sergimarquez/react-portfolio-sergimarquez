/**
 * Border tokens - Radius and width
 * Framework-agnostic border system
 */

export const borderTokens = {
  radius: {
    none: "0",
    sm: "0.125rem", // 2px
    base: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    full: "9999px",
  },
  width: {
    none: "0",
    thin: "1px",
    base: "2px",
    thick: "4px",
  },
} as const;

/**
 * Type-safe border token keys
 */
export type BorderToken = typeof borderTokens;
