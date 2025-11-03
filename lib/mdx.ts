import fs from "node:fs";
import path from "node:path";

export type CaseStudyMeta = {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
};

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");

export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return [];
  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

// With @next/mdx + remark-mdx-frontmatter, MDX modules export `frontmatter` directly, so
// we no longer need to parse frontmatter here.

