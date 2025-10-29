import Link from "next/link";
import { getCaseStudySlugs, readCaseStudySource } from "@/lib/mdx";

export default function CaseStudiesIndex() {
  const slugs = getCaseStudySlugs();
  const items = slugs.map((slug) => ({ slug, meta: readCaseStudySource(slug).meta }));

  return (
    <main>
      <h1>Case Studies</h1>
      <ul>
        {items.map(({ slug, meta }) => (
          <li key={slug}>
            <Link href={`/case-studies/${slug}`}>{meta.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

