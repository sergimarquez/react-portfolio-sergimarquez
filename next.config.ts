import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: "frontmatter" }]],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
});

export default withMDX({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
} satisfies NextConfig);
