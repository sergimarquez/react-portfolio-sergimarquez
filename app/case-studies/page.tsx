import Link from "next/link";
import { getCaseStudySlugs, readCaseStudySource } from "@/lib/mdx";

export default async function CaseStudiesIndex() {
  const slugs = getCaseStudySlugs();
  const items = slugs.map((slug) => {
    const { meta } = readCaseStudySource(slug);
    return { slug, title: meta.title ?? slug };
  });

  return (
    <main>
      <h1>Case Studies</h1>
      <ul>
        {items.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/case-studies/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
