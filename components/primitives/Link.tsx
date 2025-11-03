import NextLink from "next/link";
import { type ReactNode } from "react";
import { typographyTokens } from "@/styles/tokens";

type LinkProps = {
  children: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
};

export default function Link({ children, href, external = false, className = "" }: LinkProps) {
  const linkStyles = {
    color: "var(--color-interactive-default)",
    textDecoration: "underline",
    textDecorationColor: "var(--color-foreground-muted)",
    textUnderlineOffset: "2px",
    fontFamily: typographyTokens.fontFamily.sans,
    transition: "color 0.2s ease, text-decoration-color 0.2s ease",
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={linkStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--color-interactive-hover)";
          e.currentTarget.style.textDecorationColor = "var(--color-interactive-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = linkStyles.color;
          e.currentTarget.style.textDecorationColor = linkStyles.textDecorationColor;
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={className}
      style={linkStyles}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--color-interactive-hover)";
        e.currentTarget.style.textDecorationColor = "var(--color-interactive-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = linkStyles.color;
        e.currentTarget.style.textDecorationColor = linkStyles.textDecorationColor;
      }}
    >
      {children}
    </NextLink>
  );
}
