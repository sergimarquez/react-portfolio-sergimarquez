import { getBlogSlugs, readBlogSource } from "@/lib/blog";
import BlogIndexClient from "./BlogIndexClient";

export default async function BlogIndex() {
  const slugs = getBlogSlugs();
  const posts = slugs.map((slug) => {
    const { meta } = readBlogSource(slug);
    const dateStr = typeof meta.date === "string" ? meta.date : String(meta.date ?? "");
    return {
      slug,
      title: meta.title ?? slug,
      date: dateStr,
      summary: meta.summary,
      tags: meta.tags,
    };
  });

  return <BlogIndexClient initialPosts={posts} />;
}
