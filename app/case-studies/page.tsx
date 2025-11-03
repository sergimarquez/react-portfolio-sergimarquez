import Link from "next/link";
import { getCaseStudySlugs } from "@/lib/mdx";

export default async function CaseStudiesIndex() {
  const slugs = getCaseStudySlugs();
  const items = slugs.map(async (slug) => {
    const mod = await import(`@/content/case-studies/${slug}.mdx`);
    const meta = (mod as any).frontmatter as { title?: string } | undefined;
    return { slug, title: meta?.title ?? slug };
  });

  return (
    <main>
      <h1>Case Studies</h1>
      <ul>
        {(await Promise.all(items)).map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/case-studies/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

