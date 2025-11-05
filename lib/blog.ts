import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type WritingMeta = {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function readBlogSource(slug: string): { source: string; meta: WritingMeta } {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);
  return { source: content, meta: data as WritingMeta };
}
