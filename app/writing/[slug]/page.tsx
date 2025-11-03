import type { Metadata } from "next";
import { readWritingSource } from "@/lib/writing";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import MdxContent from "@/components/MdxContent";

// Force dynamic rendering to avoid SSG React context issues with next-mdx-remote
// Trade-off: Pages are SSR instead of SSG, but build succeeds
export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = readWritingSource(slug);
  return {
    title: meta.title,
    description: meta.summary,
  };
}

export default async function WritingPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { source, meta } = readWritingSource(slug);
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
    },
  });

  // Ensure date is a string (gray-matter may parse it as Date)
  const dateStr = meta.date ? String(meta.date) : null;

  return (
    <main>
      <header>
        <h1>{meta.title}</h1>
        {dateStr && <time dateTime={dateStr}>{dateStr}</time>}
        {meta.summary ? <p>{meta.summary}</p> : null}
      </header>
      <article>
        <MdxContent source={mdxSource} />
      </article>
    </main>
  );
}
