import type { Metadata } from "next";
import Link from "next/link";
import { readBlogSource } from "@/lib/blog";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import MdxContent from "@/components/MdxContent";
import { Text, Stack, Badge } from "@/components/primitives";

// Force dynamic rendering to avoid SSG React context issues with next-mdx-remote
export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = readBlogSource(slug);
  return {
    title: meta.title,
    description: meta.summary,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { source, meta } = readBlogSource(slug);
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
    },
  });

  // Ensure date is a string (gray-matter may parse it as Date)
  const dateStr = meta.date ? String(meta.date) : null;

  return (
    <main style={{ maxWidth: "800px", width: "90%", margin: "0 auto", padding: "4rem 1rem" }}>
      <Stack gap={8}>
        {/* Back link */}
        <Link
          href="/blog"
          style={{
            textDecoration: "none",
            color: "var(--color-interactive-default)",
            fontSize: "0.95rem",
            fontWeight: 500,
          }}
        >
          ← Back to blog
        </Link>

        {/* Header */}
        <Stack gap={6}>
          <Stack gap={4}>
            <Text
              as="h1"
              size="5xl"
              weight="bold"
              className="fade-in"
              style={{ letterSpacing: "-0.03em", lineHeight: "1.1" }}
            >
              {meta.title}
            </Text>
            {dateStr && (
              <Text size="base" color="muted" className="fade-in-delay-1">
                {new Date(dateStr).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            )}
            {meta.tags && meta.tags.length > 0 && (
              <Stack
                direction="row"
                gap={2}
                style={{ flexWrap: "wrap" }}
                className="fade-in-delay-1"
              >
                {meta.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </Stack>
            )}
            {meta.summary && (
              <Text
                size="lg"
                color="secondary"
                className="fade-in-delay-2"
                style={{ lineHeight: "1.6", fontStyle: "italic" }}
              >
                {meta.summary}
              </Text>
            )}
          </Stack>
        </Stack>

        {/* Article content */}
        <article className="fade-in-delay-2" style={{ lineHeight: "1.8" }}>
          <div
            style={{
              fontSize: "1.125rem",
              color: "var(--color-foreground-primary)",
            }}
          >
            <MdxContent source={mdxSource} />
          </div>
        </article>

        {/* Footer */}
        <div
          style={{
            paddingTop: "3rem",
            borderTop: "1px solid var(--color-border-default)",
            marginTop: "2rem",
          }}
        >
          <Link
            href="/blog"
            style={{
              textDecoration: "none",
              color: "var(--color-interactive-default)",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            ← Back to blog
          </Link>
        </div>
      </Stack>
    </main>
  );
}
