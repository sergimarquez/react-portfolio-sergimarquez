"use client";

import {
  Text,
  Button,
  Card,
  Stack,
  Grid,
  Link,
  Badge,
  Input,
  Modal,
} from "@/components/primitives";
import { useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main
      style={{
        padding: "1rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Hero Section */}
      <section id="hero" style={{ marginBottom: "4rem" }}>
        <Stack gap={6}>
          <Text as="h1" size="5xl" weight="bold">
            Portfolio Primitives Showcase
          </Text>
          <Text size="lg" color="secondary">
            A reusable frontend architecture baseline with design tokens and primitives
          </Text>
          <Stack
            direction="row"
            gap={4}
            style={{ flexWrap: "wrap" }}
          >
            <Button variant="primary" size="lg">
              Primary Button
            </Button>
            <Button variant="secondary" size="lg">
              Secondary Button
            </Button>
            <Button variant="ghost" size="lg">
              Ghost Button
            </Button>
          </Stack>
        </Stack>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ marginBottom: "4rem" }}>
        <Stack gap={6}>
          <Text as="h2" size="3xl" weight="bold">
            Projects
          </Text>
          <Grid cols={3} gap={6}>
            <Card>
              <Stack gap={4}>
                <Text as="h3" size="xl" weight="semibold">
                  Project One
                </Text>
                <Text color="secondary">
                  Description of project one with some details about what it does and how it was
                  built.
                </Text>
                <Stack direction="row" gap={2}>
                  <Badge variant="success">React</Badge>
                  <Badge variant="info">TypeScript</Badge>
                </Stack>
                <Link href="/case-studies/hello-world">View case study →</Link>
              </Stack>
            </Card>
            <Card>
              <Stack gap={4}>
                <Text as="h3" size="xl" weight="semibold">
                  Project Two
                </Text>
                <Text color="secondary">
                  Another project description showcasing the grid layout and card components.
                </Text>
                <Stack direction="row" gap={2}>
                  <Badge variant="warning">Next.js</Badge>
                  <Badge>Design System</Badge>
                </Stack>
                <Link href="/case-studies/hello-world">View case study →</Link>
              </Stack>
            </Card>
            <Card>
              <Stack gap={4}>
                <Text as="h3" size="xl" weight="semibold">
                  Project Three
                </Text>
                <Text color="secondary">
                  Third project card to demonstrate the responsive grid system.
                </Text>
                <Stack direction="row" gap={2}>
                  <Badge variant="error">Architecture</Badge>
                </Stack>
                <Link href="/case-studies/hello-world">View case study →</Link>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </section>

      {/* About Section */}
      <section id="about" style={{ marginBottom: "4rem" }}>
        <Stack gap={6}>
          <Text as="h2" size="3xl" weight="bold">
            About
          </Text>
          <Card>
            <Stack gap={4}>
              <Text size="lg">
                This is a showcase of the design system primitives built with design tokens. The
                architecture prioritizes:
              </Text>
              <Stack gap={2}>
                <Text>• Modularity and separation of concerns</Text>
                <Text>• Type-safe design tokens</Text>
                <Text>• Accessibility-first components</Text>
                <Text>• Framework-agnostic primitives</Text>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </section>

      {/* Components Showcase */}
      <section id="components" style={{ marginBottom: "4rem" }}>
        <Stack gap={6}>
          <Text as="h2" size="3xl" weight="bold">
            Component Showcase
          </Text>
            <Grid cols={2} gap={6} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <Card>
              <Stack gap={4}>
                <Text as="h3" size="lg" weight="semibold">
                  Typography Scale
                </Text>
                <Stack gap={2}>
                  <Text size="xs">Extra Small Text</Text>
                  <Text size="sm">Small Text</Text>
                  <Text size="base">Base Text (default)</Text>
                  <Text size="lg">Large Text</Text>
                  <Text size="xl">Extra Large Text</Text>
                  <Text size="2xl">2XL Text</Text>
                </Stack>
                <Stack gap={2}>
                  <Text weight="normal">Normal Weight</Text>
                  <Text weight="medium">Medium Weight</Text>
                  <Text weight="semibold">Semibold Weight</Text>
                  <Text weight="bold">Bold Weight</Text>
                </Stack>
                <Stack gap={2}>
                  <Text color="primary">Primary Color</Text>
                  <Text color="secondary">Secondary Color</Text>
                  <Text color="muted">Muted Color</Text>
                </Stack>
              </Stack>
            </Card>
            <Card>
              <Stack gap={4}>
                <Text as="h3" size="lg" weight="semibold">
                  Form Components
                </Text>
                <Input label="Email Address" type="email" placeholder="you@example.com" />
                <Input label="Password" type="password" placeholder="••••••••" />
                <Input label="Error State" error="This field is required" />
                <Stack direction="row" gap={2} justify="start">
                  <Button variant="primary">Submit</Button>
                  <Button variant="secondary">Cancel</Button>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </section>

      {/* Interactive Demo */}
      <section>
        <Card>
          <Stack gap={4}>
            <Text as="h3" size="lg" weight="semibold">
              Interactive Demo
            </Text>
            <Text>Click the button below to see the modal component:</Text>
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
            <Stack direction="row" gap={2}>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge>Default</Badge>
            </Stack>
          </Stack>
        </Card>
      </section>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Modal Example">
        <Stack gap={4}>
          <Text>This is an accessible modal component with:</Text>
          <Stack gap={2}>
            <Text>• Keyboard trap (Tab cycles through focusable elements)</Text>
            <Text>• Escape key to close</Text>
            <Text>• Click outside to close</Text>
            <Text>• Proper ARIA attributes</Text>
          </Stack>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            Close Modal
          </Button>
        </Stack>
      </Modal>
      </main>
  );
}
