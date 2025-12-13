import Link from "next/link";
import { Text, Stack, Button } from "@/components/primitives";

export default function NotFound() {
  return (
    <main
      style={{
        maxWidth: "800px",
        width: "90%",
        margin: "0 auto",
        padding: "8rem 1rem",
        textAlign: "center",
      }}
    >
      <Stack gap={6} align="center">
        <Text
          as="h1"
          size="6xl"
          weight="bold"
          style={{ letterSpacing: "-0.04em", lineHeight: "1.1" }}
        >
          404
        </Text>
        <Text size="xl" color="secondary" style={{ lineHeight: "1.6" }}>
          Page not found. The page you're looking for doesn't exist.
        </Text>
        <Link href="/">
          <Button variant="primary" size="lg">
            Go home
          </Button>
        </Link>
      </Stack>
    </main>
  );
}




