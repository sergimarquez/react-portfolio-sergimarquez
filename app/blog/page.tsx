import Link from "next/link";
import { getBlogSlugs, readBlogSource } from "@/lib/blog";
import { Text, Card, Stack, Grid, Badge } from "@/components/primitives";

export default async function BlogIndex() {
  const slugs = getBlogSlugs();
  const items = slugs.map((slug) => {
    const { meta } = readBlogSource(slug);
    // Ensure date is a string (gray-matter may parse it as Date)
    const dateStr = typeof meta.date === "string" ? meta.date : String(meta.date ?? "");
    return {
      slug,
      title: meta.title ?? slug,
      date: dateStr,
      summary: meta.summary,
      tags: meta.tags,
    };
  });

  // Sort by date descending
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main style={{ maxWidth: "1200px", width: "90%", margin: "0 auto", padding: "4rem 1rem" }}>
      <Stack gap={8}>
        <Stack gap={4} style={{ maxWidth: "700px" }}>
          <Text
            as="h1"
            size="5xl"
            weight="bold"
            className="fade-in"
            style={{ letterSpacing: "-0.03em" }}
          >
            Blog
          </Text>
          <Text
            size="lg"
            color="secondary"
            className="fade-in-delay-1"
            style={{ lineHeight: "1.6" }}
          >
            Thoughts on frontend architecture, design systems, and engineering leadership.
          </Text>
        </Stack>

        {items.length === 0 ? (
          <Card className="fade-in-delay-1">
            <Text color="secondary">No blog posts yet. Check back soon!</Text>
          </Card>
        ) : (
          <Grid cols={2} gap={6}>
            {items.map(({ slug, title, date, summary, tags }, index) => (
              <Card
                key={slug}
                className={`card-hover ${
                  index < 2 ? "fade-in-delay-1" : index < 4 ? "fade-in-delay-2" : "fade-in-delay-3"
                }`}
              >
                <Stack gap={4}>
                  <Stack gap={2}>
                    <Link
                      href={`/blog/${slug}`}
                      style={{
                        textDecoration: "none",
                        color: "var(--color-foreground-primary)",
                      }}
                    >
                      <Text as="h2" size="2xl" weight="semibold" style={{ lineHeight: "1.2" }}>
                        {title}
                      </Text>
                    </Link>
                    {date && (
                      <Text size="sm" color="muted">
                        {new Date(date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Text>
                    )}
                  </Stack>
                  {summary && (
                    <Text color="secondary" style={{ lineHeight: "1.7" }}>
                      {summary}
                    </Text>
                  )}
                  {tags && tags.length > 0 && (
                    <Stack direction="row" gap={2} style={{ flexWrap: "wrap" }}>
                      {tags.map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </Stack>
                  )}
                  <Link
                    href={`/blog/${slug}`}
                    style={{
                      textDecoration: "none",
                      color: "var(--color-interactive-default)",
                      fontWeight: 500,
                    }}
                  >
                    Read more →
                  </Link>
                </Stack>
              </Card>
            ))}
          </Grid>
        )}
      </Stack>
    </main>
  );
}
