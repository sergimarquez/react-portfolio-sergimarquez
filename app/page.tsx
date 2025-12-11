import Image from "next/image";
import { Text, Button, Card, Stack, Grid, Link, Badge } from "@/components/primitives";
import { getBlogSlugs, readBlogSource } from "@/lib/blog";

type ProjectCard = {
  title: string;
  description: string;
  image: { src: string; alt: string };
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
};

const projectCards: ProjectCard[] = [
  // Top row (3 columns)
  {
    title: "Fintreo",
    description:
      "Modern personal finance app with real-time sync, privacy-first architecture, and performance budgets under 100KB for the initial payload.",
    image: { src: "/projects/fintreo.png", alt: "Screenshot of Fintreo app" },
    tags: ["Next.js", "TypeScript", "Firebase", "Performance"],
    liveUrl: "https://fintreo.com",
  },
  {
    title: "3Good",
    description:
      "Daily gratitude tracker focused on wellbeing and privacy. Built with Vite and modern React patterns to keep interactions instant on any device.",
    image: { src: "/projects/3good.png", alt: "Screenshot of 3Good app" },
    tags: ["React", "TypeScript", "Vite", "Privacy"],
    liveUrl: "https://3good.app/",
    repoUrl: "https://github.com/sergimarquez/three-things",
  },
  {
    title: "Design System",
    description:
      "Modern design system built with React and TypeScript. Framework-agnostic tokens and headless components for building consistent, accessible UIs across projects.",
    image: { src: "/projects/design-system.png", alt: "Screenshot of Design System Storybook" },
    tags: ["React", "TypeScript", "Storybook", "Vite", "Accessibility"],
    liveUrl:
      "https://design-system-c8tq69gah-sergis-projects-2dc6d14d.vercel.app/?path=/story/welcome--welcome",
    repoUrl: "https://github.com/sergimarquez/design-system",
  },
  // Bottom row (2 centered columns)
  {
    title: "SiteBlockr",
    description:
      "Chrome extension with privacy-focused controls, optimized Chrome API usage, and strict type safety to keep memory and CPU impact minimal.",
    image: { src: "/projects/siteblockr.png", alt: "Screenshot of SiteBlockr extension" },
    tags: ["Chrome APIs", "TypeScript", "Privacy", "Performance"],
    liveUrl:
      "https://chromewebstore.google.com/detail/ogicdnegacclceajhgaoehlnidgndllp?utm_source=item-share-cb",
    repoUrl: "https://github.com/sergimarquez/site-blockr",
  },
  {
    title: "Retro Portfolio",
    description:
      "A nostalgic portfolio website with retro aesthetics, showcasing projects with a vintage computing feel and modern web technologies.",
    image: { src: "/projects/retro-portfolio.png", alt: "Screenshot of Retro Portfolio website" },
    tags: ["Next.js", "TypeScript", "Design"],
    liveUrl: "https://sergimarquez.dev",
    repoUrl: "https://github.com/sergimarquez/retro-portfolio",
  },
];

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
          <Stack gap={6} style={{ maxWidth: "550px" }}>
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
              Hi, I'm Sergi
            </Text>
            <Text
              size="xl"
              color="secondary"
              className="fade-in-delay-1"
              style={{ lineHeight: "1.6" }}
            >
              I build web applications focusing on performance, clean code, and developer-friendly
              architectures.
            </Text>

            <Stack direction="row" gap={4} className="fade-in-delay-2" style={{ flexWrap: "wrap" }}>
              <Link href="#projects">
                <Button variant="primary" size="lg">
                  View Projects
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

          {/* Top row: 3 columns */}
          <Grid cols={3} gap={6} style={{ alignItems: "stretch" }}>
            {projectCards.slice(0, 3).map((project, index) => {
              const animationClass = index % 2 === 0 ? "fade-in-delay-1" : "fade-in-delay-2";
              return (
                <Card
                  key={project.title}
                  as="div"
                  className={`project-card card-hover ${animationClass}`}
                >
                  <div className="project-card__content">
                    <Stack gap={4}>
                      <div>
                        <Text
                          as="h3"
                          size="2xl"
                          weight="semibold"
                          style={{ letterSpacing: "-0.02em" }}
                        >
                          {project.title}
                        </Text>
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            className="project-card__image-link"
                            aria-label={`Visit ${project.title} live site`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="project-card__image">
                              <Image
                                src={project.image.src}
                                alt={project.image.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 32vw"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          </a>
                        ) : (
                          <div className="project-card__image">
                            <Image
                              src={project.image.src}
                              alt={project.image.alt}
                              fill
                              sizes="(max-width: 768px) 100vw, 32vw"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        )}
                        <Text color="secondary" style={{ lineHeight: "1.7" }}>
                          {project.description}
                        </Text>
                      </div>

                      {project.tags.length > 0 && (
                        <Stack direction="row" gap={2} style={{ flexWrap: "wrap" }}>
                          {project.tags.map((tag) => (
                            <Badge key={`${project.title}-${tag}`}>{tag}</Badge>
                          ))}
                        </Stack>
                      )}

                      <div className="project-card__links">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                          >
                            Live demo →
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link project-link--secondary"
                          >
                            GitHub →
                          </a>
                        )}
                      </div>
                    </Stack>
                  </div>
                </Card>
              );
            })}
          </Grid>

          {/* Bottom row: 2 centered columns */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <Grid
              cols={2}
              gap={6}
              style={{ alignItems: "stretch", maxWidth: "800px", width: "100%" }}
            >
              {projectCards.slice(3).map((project, index) => {
                const animationClass = index % 2 === 0 ? "fade-in-delay-1" : "fade-in-delay-2";
                return (
                  <Card
                    key={project.title}
                    as="div"
                    className={`project-card card-hover ${animationClass}`}
                  >
                    <div className="project-card__content">
                      <Stack gap={4}>
                        <div>
                          <Text
                            as="h3"
                            size="2xl"
                            weight="semibold"
                            style={{ letterSpacing: "-0.02em" }}
                          >
                            {project.title}
                          </Text>
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              className="project-card__image-link"
                              aria-label={`Visit ${project.title} live site`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="project-card__image">
                                <Image
                                  src={project.image.src}
                                  alt={project.image.alt}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 48vw"
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                            </a>
                          ) : (
                            <div className="project-card__image">
                              <Image
                                src={project.image.src}
                                alt={project.image.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 48vw"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          )}
                          <Text color="secondary" style={{ lineHeight: "1.7" }}>
                            {project.description}
                          </Text>
                        </div>

                        {project.tags.length > 0 && (
                          <Stack direction="row" gap={2} style={{ flexWrap: "wrap" }}>
                            {project.tags.map((tag) => (
                              <Badge key={`${project.title}-${tag}`}>{tag}</Badge>
                            ))}
                          </Stack>
                        )}

                        <div className="project-card__links">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link"
                            >
                              Live demo →
                            </a>
                          )}
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link project-link--secondary"
                            >
                              GitHub →
                            </a>
                          )}
                        </div>
                      </Stack>
                    </div>
                  </Card>
                );
              })}
            </Grid>
          </div>
        </Stack>
      </section>

      {/* Skills Section – Option A only */}
      <section id="skills-option-a" style={{ marginBottom: "6rem" }}>
        <Stack gap={6}>
          <h2 className="section-title fade-in">Technical Expertise </h2>
          <div
            className="fade-in-delay-1 skills-box"
            style={{
              background: "var(--color-background-secondary)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "1rem",
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
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
                    <Link href={`/blog/${post.slug}`} className="cta-link">
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
          <Link href="/blog" className="cta-link">
            View all posts →
          </Link>
        </Stack>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ marginBottom: "8rem" }}>
        <Stack gap={6} align="center">
          <h2 className="section-title fade-in">Get in Touch</h2>
          <Stack
            direction="row"
            gap={4}
            style={{ flexWrap: "wrap", justifyContent: "center", marginBottom: "1.5rem" }}
          >
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
          <Text size="lg" color="secondary" style={{ textAlign: "center", maxWidth: "600px" }}>
            I’m based in Barcelona 🇪🇸 and open to remote collaboration.
          </Text>
        </Stack>
      </section>
    </main>
  );
}
