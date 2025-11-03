import Link from "next/link";
import { getWritingSlugs, readWritingSource } from "@/lib/writing";

export default function WritingIndex() {
  const slugs = getWritingSlugs();
  const items = slugs.map((slug) => {
    const { meta } = readWritingSource(slug);
    // Ensure date is a string (gray-matter may parse it as Date)
    const dateStr = typeof meta.date === "string" ? meta.date : String(meta.date ?? "");
    return { slug, title: meta.title ?? slug, date: dateStr };
  });

  // Sort by date descending
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main>
      <h1>Writing</h1>
      <ul>
        {items.map(({ slug, title, date }) => (
          <li key={slug}>
            <Link href={`/writing/${slug}`}>{title}</Link>
            {date && <span> - {date}</span>}
          </li>
        ))}
      </ul>
    </main>
  );
}
