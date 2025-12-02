"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Text, Card, Stack, Badge, Button } from "@/components/primitives";

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

  // Group posts by year for sidebar
  const postsByYear = useMemo(() => {
    const grouped: Record<string, BlogPost[]> = {};
    initialPosts.forEach((post) => {
      if (!post.date) return;
      const year = new Date(post.date).getFullYear().toString();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(post);
    });
    return grouped;
  }, [initialPosts]);

  const activeFilters = selectedTag || selectedYear;
  const hasPosts = filteredPosts.length > 0;

  return (
    <main
      style={{
        maxWidth: "1400px",
        width: "90%",
        margin: "0 auto",
        padding: "4rem 1rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "4rem",
          alignItems: "start",
        }}
        className="blog-layout"
      >
        {/* Sidebar */}
        <aside
          className="blog-sidebar fade-in"
          style={{
            position: "sticky",
            top: "6rem",
            height: "fit-content",
          }}
        >
          <Stack gap={6}>
            {/* Header */}
            <Stack gap={2}>
              <Text
                as="h1"
                size="4xl"
                weight="bold"
                style={{ letterSpacing: "-0.03em" }}
              >
                Blog
              </Text>
              <Text size="sm" color="secondary" style={{ lineHeight: "1.5" }}>
                Lessons learned building scalable frontend architectures.
              </Text>
            </Stack>

            {/* Years Timeline */}
            <Stack gap={3}>
              <Text size="xs" weight="semibold" color="muted" style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Timeline
              </Text>
              <Stack gap={1}>
                <button
                  onClick={() => setSelectedYear(null)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0.5rem 0",
                    textAlign: "left",
                    cursor: "pointer",
                    color: selectedYear === null
                      ? "var(--color-interactive-default)"
                      : "var(--color-foreground-secondary)",
                    fontSize: "0.95rem",
                    fontWeight: selectedYear === null ? 600 : 400,
                    transition: "color 0.2s ease",
                  }}
                >
                  All Years
                </button>
                {allYears.map((year) => {
                  const isSelected = selectedYear === year;
                  const postCount = postsByYear[year]?.length || 0;
                  return (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(isSelected ? null : year)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "0.5rem 0",
                        textAlign: "left",
                        cursor: "pointer",
                        color: isSelected
                          ? "var(--color-interactive-default)"
                          : "var(--color-foreground-secondary)",
                        fontSize: "0.95rem",
                        fontWeight: isSelected ? 600 : 400,
                        transition: "color 0.2s ease",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{year}</span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-foreground-muted)",
                          fontWeight: 400,
                        }}
                      >
                        {postCount}
                      </span>
                    </button>
                  );
                })}
              </Stack>
            </Stack>

            {/* Tags */}
            {allTags.length > 0 && (
              <Stack gap={3}>
                <Text size="xs" weight="semibold" color="muted" style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Topics
                </Text>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  <button
                    onClick={() => setSelectedTag(null)}
                    style={{
                      background: selectedTag === null
                        ? "var(--color-interactive-default)"
                        : "var(--color-background-secondary)",
                      color: selectedTag === null
                        ? "var(--color-background-primary)"
                        : "var(--color-foreground-primary)",
                      border: "1px solid var(--color-border-default)",
                      borderRadius: "999px",
                      padding: "0.25rem 0.75rem",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontWeight: selectedTag === null ? 600 : 400,
                    }}
                  >
                    All
                  </button>
                  {allTags.map((tag) => {
                    const isSelected = selectedTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(isSelected ? null : tag)}
                        style={{
                          background: isSelected
                            ? "var(--color-interactive-default)"
                            : "var(--color-background-secondary)",
                          color: isSelected
                            ? "var(--color-background-primary)"
                            : "var(--color-foreground-primary)",
                          border: "1px solid var(--color-border-default)",
                          borderRadius: "999px",
                          padding: "0.25rem 0.75rem",
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          fontWeight: isSelected ? 600 : 400,
                        }}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </Stack>
            )}

            {/* Active Filters */}
            {activeFilters && (
              <Stack gap={2}>
                <Text size="xs" color="secondary">
                  {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
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
        </aside>

        {/* Main Content */}
        <div className="blog-content">
          {hasPosts ? (
            <Stack gap={6}>
              {filteredPosts.map((post, index) => {
                const date = post.date
                  ? new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : null;

                const animationClass =
                  index < 3 ? `fade-in-delay-${Math.min(index + 1, 3)}` : "fade-in";

                return (
                  <Card
                    key={post.slug}
                    as="article"
                    className={`card-hover ${animationClass}`}
                  >
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
                            as="h2"
                            size="2xl"
                            weight="semibold"
                            style={{ lineHeight: "1.2", letterSpacing: "-0.02em" }}
                          >
                            {post.title}
                          </Text>
                        </Link>
                        {date && (
                          <Text size="sm" color="muted">
                            {date}
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

                      <Link href={`/blog/${post.slug}`} className="cta-link">
                        Read more →
                      </Link>
                    </Stack>
                  </Card>
                );
              })}
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
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 968px) {
          .blog-layout {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .blog-sidebar {
            position: static !important;
          }
        }
      `}</style>
    </main>
  );
}
