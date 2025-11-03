import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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

export function readCaseStudySource(slug: string): { source: string; meta: CaseStudyMeta } {
  const fullPath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);
  return { source: content, meta: data as CaseStudyMeta };
}
