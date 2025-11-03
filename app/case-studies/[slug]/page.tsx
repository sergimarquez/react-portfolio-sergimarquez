import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { getCaseStudySlugs, readCaseStudySource } from "@/lib/mdx";
import type { Metadata } from "next";
import MdxRenderer from "@/components/MdxRenderer";

type Params = { slug: string };

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = readCaseStudySource(slug);
  return {
    title: meta.title,
    description: meta.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { source, meta } = readCaseStudySource(slug);
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
    },
  });

  return (
    <main>
      <header>
        <h1>{meta.title}</h1>
        {meta.summary ? <p>{meta.summary}</p> : null}
      </header>
      <article>
        <MdxRenderer source={mdxSource} />
      </article>
    </main>
  );
}

