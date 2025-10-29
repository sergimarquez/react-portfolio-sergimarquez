import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { getCaseStudySlugs, readCaseStudySource } from "@/lib/mdx";
import type { Metadata } from "next";

type Params = { slug: string };

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { meta } = readCaseStudySource(params.slug);
  return {
    title: meta.title,
    description: meta.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { source, meta } = readCaseStudySource(params.slug);

  const { content } = await compileMDX<{ title: string } | Record<string, never>>({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
      },
    },
  });

  return (
    <main>
      <header>
        <h1>{meta.title}</h1>
        {meta.summary ? <p>{meta.summary}</p> : null}
      </header>
      <article>{content}</article>
    </main>
  );
}

