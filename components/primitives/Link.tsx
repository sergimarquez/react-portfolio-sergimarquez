import NextLink from "next/link";
import { type ReactNode } from "react";
import { typographyTokens } from "@/styles/tokens";

type LinkProps = {
  children: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function Link({
  children,
  href,
  external = false,
  className = "",
  style,
}: LinkProps) {
  const baseStyles = {
    color: "var(--color-interactive-default)",
    textDecoration: "underline",
    textDecorationColor: "var(--color-foreground-muted)",
    textUnderlineOffset: "2px",
    fontFamily: typographyTokens.fontFamily.sans,
    transition: "color 0.2s ease, text-decoration-color 0.2s ease",
  };

  const combinedStyles = { ...baseStyles, ...style } as React.CSSProperties;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={combinedStyles}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={className} style={combinedStyles}>
      {children}
    </NextLink>
  );
}
