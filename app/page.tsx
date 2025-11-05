"use client";

import { Text, Button, Card, Stack, Grid, Link, Badge } from "@/components/primitives";

export default function Home() {
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
              Frontend Architect & Engineer
            </Text>
            <Text
              size="xl"
              color="secondary"
              className="fade-in-delay-1"
              style={{ lineHeight: "1.6" }}
            >
              Building scalable, maintainable frontend architectures. Focused on performance,
              accessibility, and developer experience.
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

      {/* About Section */}
      <section id="about" style={{ marginBottom: "10rem" }}>
        <Stack gap={8}>
          <h2 className="section-title fade-in">About</h2>
          <Grid cols={2} gap={8}>
            <Card className="card-hover fade-in-delay-1">
              <Stack gap={5}>
                <Text as="h3" size="2xl" weight="semibold">
                  Principles & Approach
                </Text>
                <Stack gap={4}>
                  <Text style={{ lineHeight: "1.7" }}>
                    I design frontend architectures that prioritize <strong>maintainability</strong>{" "}
                    and <strong>scalability</strong>. Every decision considers the team and
                    long-term evolution.
                  </Text>
                  <Text style={{ lineHeight: "1.7" }}>
                    My work emphasizes <strong>type safety</strong>,{" "}
                    <strong>separation of concerns</strong>, and{" "}
                    <strong>performance by default</strong>. I believe great code is
                    self-documenting and testable.
                  </Text>
                </Stack>
              </Stack>
            </Card>
            <Card className="card-hover fade-in-delay-2">
              <Stack gap={5}>
                <Text as="h3" size="2xl" weight="semibold">
                  Leadership Style
                </Text>
                <Stack gap={4}>
                  <Text style={{ lineHeight: "1.7" }}>
                    I lead through <strong>architecture decisions</strong> and{" "}
                    <strong>mentoring</strong>. I focus on enabling teams to build better systems by
                    establishing patterns, not micromanaging.
                  </Text>
                  <Text style={{ lineHeight: "1.7" }}>
                    I document decisions in ADRs, maintain design systems that enable autonomy, and
                    create frameworks that scale with the team.
                  </Text>
                </Stack>
              </Stack>
            </Card>
          </Grid>
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

      {/* Skills Section */}
      <section id="skills" style={{ marginBottom: "10rem" }}>
        <Stack gap={8}>
          <h2 className="section-title fade-in">Technical Expertise</h2>
          <Grid cols={3} gap={6}>
            <Card className="card-hover fade-in-delay-1">
              <Stack gap={4}>
                <Text as="h3" size="xl" weight="semibold">
                  Architecture & Patterns
                </Text>
                <Stack gap={2}>
                  {[
                    "Design Systems",
                    "Component Architecture",
                    "State Management",
                    "Code Splitting",
                    "Micro-frontends",
                  ].map((skill) => (
                    <Badge key={skill} variant="info">
                      {skill}
                    </Badge>
                  ))}
                </Stack>
              </Stack>
            </Card>

            <Card className="card-hover fade-in-delay-2">
              <Stack gap={4}>
                <Text as="h3" size="xl" weight="semibold">
                  Frontend Technologies
                </Text>
                <Stack gap={2}>
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "JavaScript ES6+",
                    "Web Performance",
                    "Accessibility",
                  ].map((skill) => (
                    <Badge key={skill} variant="default">
                      {skill}
                    </Badge>
                  ))}
                </Stack>
              </Stack>
            </Card>

            <Card className="card-hover fade-in-delay-3">
              <Stack gap={4}>
                <Text as="h3" size="xl" weight="semibold">
                  Engineering Practices
                </Text>
                <Stack gap={2}>
                  {[
                    "Testing (Jest, RTL, E2E)",
                    "CI/CD",
                    "Code Quality",
                    "Documentation",
                    "Performance Auditing",
                  ].map((skill) => (
                    <Badge key={skill} variant="success">
                      {skill}
                    </Badge>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ marginBottom: "8rem" }}>
        <Stack gap={6} align="center">
          <h2 className="section-title fade-in">Get in Touch</h2>
          <Text size="lg" color="secondary" style={{ textAlign: "center", maxWidth: "600px" }}>
            Interested in discussing frontend architecture, design systems, or engineering
            leadership? Let's connect.
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
