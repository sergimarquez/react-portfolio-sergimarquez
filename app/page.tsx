import { Text, Button, Card, Stack, Grid, Link, Badge } from "@/components/primitives";
import { getBlogSlugs, readBlogSource } from "@/lib/blog";

function getLatestPosts(limit = 2) {
  const slugs = getBlogSlugs();
  const posts = slugs.map((slug) => {
    const { meta } = readBlogSource(slug);
    const dateStr = typeof meta.date === "string" ? meta.date : String(meta.date ?? "");
    return {
      slug,
      title: meta.title ?? slug,
      date: dateStr,
      summary: meta.summary ?? "",
      tags: meta.tags ?? [],
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts.slice(0, limit);
}

export default function Home() {
  const latestPosts = getLatestPosts();

  return (
    <main style={{ maxWidth: "1200px", width: "90%", margin: "0 auto", padding: "4rem 1rem" }}>
      {/* Hero Section */}
      <section id="hero" style={{ marginBottom: "10rem" }}>
        <Stack gap={8} align="start">
          <Stack gap={6} style={{ maxWidth: "700px" }}>
            <Text
              as="h1"
              size="6xl"
              weight="bold"
              className="fade-in"
              style={{
                letterSpacing: "-0.04em",
                lineHeight: "1.1",
              }}
            >
              Sergi Marquez
            </Text>
            <Text
              size="xl"
              color="secondary"
              className="fade-in-delay-1"
              style={{ lineHeight: "1.6" }}
            >
              I build web applications that are fast, reliable, and easy to maintain, focusing on
              performance, clean code, and developer-friendly architectures.
            </Text>
            <Text
              size="lg"
              color="secondary"
              className="fade-in-delay-2"
              style={{ lineHeight: "1.6" }}
            >
              I enjoy turning complex problems into clear, usable interfaces that people love.
            </Text>
            <Stack direction="row" gap={4} className="fade-in-delay-2" style={{ flexWrap: "wrap" }}>
              <Link href="#projects">
                <Button variant="primary" size="lg">
                  View Projects
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="secondary" size="lg">
                  Read Blog
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ marginBottom: "10rem" }}>
        <Stack gap={8}>
          <h2 className="section-title fade-in">Featured Projects</h2>
          <Grid cols={2} gap={8}>
            <Card className="card-hover fade-in-delay-1">
              <Stack gap={5}>
                <Stack gap={3}>
                  <Link href="https://fintreo.com" external>
                    <Text as="h3" size="2xl" weight="semibold">
                      Fintreo
                    </Text>
                  </Link>
                  <Text color="secondary" style={{ lineHeight: "1.7" }}>
                    Modern personal finance application built with Next.js 15 and React 18.
                    Implemented real-time sync, privacy-first architecture, and optimized bundle
                    size for sub-100KB initial load.
                  </Text>
                </Stack>
                <Stack direction="row" gap={2} style={{ flexWrap: "wrap" }}>
                  <Badge>Next.js 15</Badge>
                  <Badge>React 18</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Performance</Badge>
                </Stack>
                <Stack direction="row" gap={4}>
                  <Link href="https://fintreo.com" external>
                    Live demo →
                  </Link>
                </Stack>
              </Stack>
            </Card>

            <Card className="card-hover fade-in-delay-2">
              <Stack gap={5}>
                <Stack gap={3}>
                  <Link href="https://3good.app/" external>
                    <Text as="h3" size="2xl" weight="semibold">
                      3Good
                    </Text>
                  </Link>
                  <Text color="secondary" style={{ lineHeight: "1.7" }}>
                    Privacy-first gratitude app with minimal bundle size. Built with Vite for
                    optimal dev experience, implementing modern React patterns for state management
                    and performance.
                  </Text>
                </Stack>
                <Stack direction="row" gap={2} style={{ flexWrap: "wrap" }}>
                  <Badge>React</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Vite</Badge>
                  <Badge>Privacy</Badge>
                </Stack>
                <Stack direction="row" gap={4}>
                  <Link href="https://3good.app/" external>
                    Live demo →
                  </Link>
                </Stack>
              </Stack>
            </Card>

            <Card className="card-hover fade-in-delay-1">
              <Stack gap={5}>
                <Stack gap={3}>
                  <Text as="h3" size="2xl" weight="semibold">
                    Design System Architecture
                  </Text>
                  <Text color="secondary" style={{ lineHeight: "1.7" }}>
                    Reusable frontend architecture baseline with design tokens, type-safe
                    primitives, and testing infrastructure. Built to be extracted into standalone
                    packages for cross-project reuse.
                  </Text>
                </Stack>
                <Stack direction="row" gap={2} style={{ flexWrap: "wrap" }}>
                  <Badge>Design System</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Architecture</Badge>
                  <Badge>Reusability</Badge>
                </Stack>
              </Stack>
            </Card>

            <Card className="card-hover fade-in-delay-2">
              <Stack gap={5}>
                <Stack gap={3}>
                  <Link
                    href="https://chromewebstore.google.com/detail/ogicdnegacclceajhgaoehlnidgndllp"
                    external
                  >
                    <Text as="h3" size="2xl" weight="semibold">
                      SiteBlockr
                    </Text>
                  </Link>
                  <Text color="secondary" style={{ lineHeight: "1.7" }}>
                    Chrome extension with privacy-focused architecture. Implemented Chrome APIs
                    efficiently, optimized for minimal performance impact, and maintained strict
                    type safety throughout.
                  </Text>
                </Stack>
                <Stack direction="row" gap={2} style={{ flexWrap: "wrap" }}>
                  <Badge>Chrome Extension</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Privacy</Badge>
                  <Badge>Performance</Badge>
                </Stack>
                <Stack direction="row" gap={4}>
                  <Link
                    href="https://chromewebstore.google.com/detail/ogicdnegacclceajhgaoehlnidgndllp"
                    external
                  >
                    Chrome Store →
                  </Link>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </section>

      {/* Skills Section – Option A only */}
      <section id="skills-option-a" style={{ marginBottom: "6rem" }}>
        <Stack gap={6}>
          <h2 className="section-title fade-in">Technical Expertise — Option A (Tokens + Lists)</h2>
          <div
            className="fade-in-delay-1"
            style={{
              background: "var(--color-background-secondary)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "1rem",
              padding: "3rem",
            }}
          >
            <Grid cols={3} gap={6}>
              <Stack gap={3}>
                <Text as="h3" size="xl" weight="semibold">
                  Core Front-End
                </Text>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.8 }}>
                  {[
                    "JavaScript (ES6+)",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "HTML5 & CSS3",
                    "Responsive Design",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span aria-hidden="true">✓</span>
                      <Text as="span">{item}</Text>
                    </li>
                  ))}
                </ul>
              </Stack>

              <Stack gap={3}>
                <Text as="h3" size="xl" weight="semibold">
                  Architecture & Performance
                </Text>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.8 }}>
                  {[
                    "Modular Architecture",
                    "Component Libraries",
                    "Design Systems & UI Patterns",
                    "Code Splitting & Lazy Loading",
                    "Performance Optimization",
                    "State Management (Redux)",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                      <span aria-hidden="true">✓</span>
                      <Text as="span">{item}</Text>
                    </li>
                  ))}
                </ul>
              </Stack>

              <Stack gap={3}>
                <Text as="h3" size="xl" weight="semibold">
                  Quality & Tooling
                </Text>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.8 }}>
                  {[
                    "CI/CD",
                    "Testing (Jest, Cypress)",
                    "Web Accessibility",
                    "Build Tools: Webpack / Vite",
                    "APIs: REST / GraphQL",
                    "Code Quality: ESLint / Prettier",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span aria-hidden="true">✓</span>
                      <Text as="span">{item}</Text>
                    </li>
                  ))}
                </ul>
              </Stack>
            </Grid>
          </div>
        </Stack>
      </section>

      {/* Blog Section */}
      <section id="blog" style={{ marginBottom: "10rem" }}>
        <Stack gap={6}>
          <h2 className="section-title fade-in">Latest Writing</h2>
          {latestPosts.length > 0 ? (
            <Grid cols={2} gap={6}>
              {latestPosts.map((post, index) => (
                <Card
                  key={post.slug}
                  className={`card-hover ${index % 2 === 0 ? "fade-in-delay-1" : "fade-in-delay-2"}`}
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
                        <Text as="h3" size="2xl" weight="semibold" style={{ lineHeight: "1.2" }}>
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
                    {post.summary ? (
                      <Text color="secondary" style={{ lineHeight: "1.7" }}>
                        {post.summary}
                      </Text>
                    ) : null}
                    {post.tags.length > 0 && (
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
          ) : (
            <Card className="card-hover fade-in-delay-1">
              <Text color="secondary">I’ll be publishing my first blog post soon. Stay tuned!</Text>
            </Card>
          )}
          <Link
            href="/blog"
            style={{
              textDecoration: "none",
              color: "var(--color-interactive-default)",
              fontWeight: 500,
            }}
          >
            View all posts →
          </Link>
        </Stack>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ marginBottom: "8rem" }}>
        <Stack gap={6} align="center">
          <h2 className="section-title fade-in">Get in Touch</h2>
          <Text size="lg" color="secondary" style={{ textAlign: "center", maxWidth: "600px" }}>
            I’m based in Barcelona 🇪🇸 and open to remote collaboration.
          </Text>
          <Stack direction="row" gap={4} style={{ flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="mailto:hello@sergimarquez.com">
              <Button variant="primary" size="lg">
                Email me
              </Button>
            </Link>
            <Link href="https://github.com/sergimarquez" external>
              <Button variant="secondary" size="lg">
                GitHub
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/sergi-marquez/" external>
              <Button variant="secondary" size="lg">
                LinkedIn
              </Button>
            </Link>
          </Stack>
        </Stack>
      </section>
    </main>
  );
}
