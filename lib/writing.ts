import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type WritingMeta = {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
};

const WRITING_DIR = path.join(process.cwd(), "content", "writing");

export function getWritingSlugs(): string[] {
  if (!fs.existsSync(WRITING_DIR)) return [];
  return fs
    .readdirSync(WRITING_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function readWritingSource(slug: string): { source: string; meta: WritingMeta } {
  const fullPath = path.join(WRITING_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);
  return { source: content, meta: data as WritingMeta };
}
