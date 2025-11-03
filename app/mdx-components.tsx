import type { MDXComponents } from "mdx/types";

// Server-safe MDX components mapping (no React context, no "use client").
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Example: customize MDX elements here
    // h2: (props) => <h2 {...props} />,
    ...components,
  };
}
