"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Text, Card, Stack, Grid, Badge, Button } from "@/components/primitives";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
};

type Props = {
  initialPosts: BlogPost[];
};

export default function BlogIndexClient({ initialPosts }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialPosts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [initialPosts]);

  // Get all unique years
  const allYears = useMemo(() => {
    const years = new Set<string>();
    initialPosts.forEach((post) => {
      if (post.date) {
        const year = new Date(post.date).getFullYear().toString();
        years.add(year);
      }
    });
    return Array.from(years).sort((a, b) => b.localeCompare(a)); // Descending
  }, [initialPosts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...initialPosts];

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag));
    }

    // Filter by year
    if (selectedYear) {
      filtered = filtered.filter((post) => {
        if (!post.date) return false;
        const year = new Date(post.date).getFullYear().toString();
        return year === selectedYear;
      });
    }

    // Sort by date descending
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return filtered;
  }, [initialPosts, selectedTag, selectedYear]);

  // Group posts by year for display
  const postsByYear = useMemo(() => {
    const grouped: Record<string, BlogPost[]> = {};
    filteredPosts.forEach((post) => {
      if (!post.date) return;
      const year = new Date(post.date).getFullYear().toString();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(post);
    });
    return grouped;
  }, [filteredPosts]);

  const activeFilters = selectedTag || selectedYear;
  const hasPosts = filteredPosts.length > 0;

  return (
    <main style={{ maxWidth: "1200px", width: "90%", margin: "0 auto", padding: "4rem 1rem" }}>
      <Stack gap={8}>
        {/* Header */}
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

        {/* Filters */}
        <Stack gap={4} className="fade-in-delay-1">
          <Stack direction="row" gap={3} style={{ flexWrap: "wrap", alignItems: "center" }}>
            <Text size="sm" weight="medium" color="secondary">
              Filter by year:
            </Text>
            <Button
              variant={selectedYear === null ? "primary" : "secondary"}
              size="sm"
              onClick={() => setSelectedYear(null)}
            >
              All Years
            </Button>
            {allYears.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "primary" : "secondary"}
                size="sm"
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </Button>
            ))}
          </Stack>

          {allTags.length > 0 && (
            <Stack direction="row" gap={2} style={{ flexWrap: "wrap", alignItems: "center" }}>
              <Text size="sm" weight="medium" color="secondary">
                Tags:
              </Text>
              <Button
                variant={selectedTag === null ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "info" : "default"}
                  style={{ cursor: "pointer", userSelect: "none" }}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </Stack>
          )}

          {activeFilters && (
            <Stack direction="row" gap={2} style={{ flexWrap: "wrap", alignItems: "center" }}>
              <Text size="sm" color="secondary">
                Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
                {selectedTag && ` tagged "${selectedTag}"`}
                {selectedYear && ` from ${selectedYear}`}
              </Text>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedTag(null);
                  setSelectedYear(null);
                }}
              >
                Clear filters
              </Button>
            </Stack>
          )}
        </Stack>

        {/* Posts by Year */}
        {hasPosts ? (
          <Stack gap={10}>
            {Object.keys(postsByYear)
              .sort((a, b) => b.localeCompare(a))
              .map((year, yearIndex) => (
                <Stack
                  key={year}
                  gap={6}
                  className={yearIndex < 2 ? "fade-in-delay-2" : "fade-in-delay-3"}
                >
                  <Text as="h2" size="3xl" weight="semibold" style={{ letterSpacing: "-0.02em" }}>
                    {year}
                  </Text>
                  <Grid cols={2} gap={6}>
                    {postsByYear[year].map((post) => (
                      <Card key={post.slug} className="card-hover">
                        <Stack gap={4}>
                          <Stack gap={2}>
                            <Link
                              href={`/blog/${post.slug}`}
                              style={{
                                textDecoration: "none",
                                color: "var(--color-foreground-primary)",
                              }}
                            >
                              <Text
                                as="h3"
                                size="2xl"
                                weight="semibold"
                                style={{ lineHeight: "1.2" }}
                              >
                                {post.title}
                              </Text>
                            </Link>
                            {post.date && (
                              <Text size="sm" color="muted">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </Text>
                            )}
                          </Stack>
                          {post.summary && (
                            <Text color="secondary" style={{ lineHeight: "1.7" }}>
                              {post.summary}
                            </Text>
                          )}
                          {post.tags && post.tags.length > 0 && (
                            <Stack direction="row" gap={2} style={{ flexWrap: "wrap" }}>
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="default">
                                  {tag}
                                </Badge>
                              ))}
                            </Stack>
                          )}
                          <Link
                            href={`/blog/${post.slug}`}
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
                </Stack>
              ))}
          </Stack>
        ) : (
          <Card className="fade-in-delay-2">
            <Stack gap={4}>
              <Text color="secondary">No posts found.</Text>
              {activeFilters && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSelectedTag(null);
                    setSelectedYear(null);
                  }}
                >
                  Clear filters
                </Button>
              )}
            </Stack>
          </Card>
        )}
      </Stack>
    </main>
  );
}
