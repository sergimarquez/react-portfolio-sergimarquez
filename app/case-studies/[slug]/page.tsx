import type { Metadata } from "next";
import { getCaseStudySlugs } from "@/lib/mdx";

type Params = { slug: string };

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const mod = await import(`@/content/case-studies/${slug}.mdx`);
  const meta = (mod as any).frontmatter as { title?: string; summary?: string } | undefined;
  return { title: meta?.title, description: meta?.summary };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const mod = await import(`@/content/case-studies/${slug}.mdx`);
  const MDXContent = (mod as any).default as React.ComponentType;
  const meta = (mod as any).frontmatter as { title?: string; summary?: string } | undefined;
  return (
    <main>
      <header>
        <h1>{meta?.title}</h1>
        {meta?.summary ? <p>{meta.summary}</p> : null}
      </header>
      <article>
        <MDXContent />
      </article>
    </main>
  );
}

