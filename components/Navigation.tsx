"use client";

import Link from "next/link";
import { useState } from "react";
import { Text } from "./primitives";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "var(--color-background-primary)",
        borderBottom: "1px solid var(--color-border-default)",
        backdropFilter: "blur(10px)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "90%",
          margin: "0 auto",
          padding: "1.5rem 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "var(--color-foreground-primary)",
            fontWeight: 700,
            fontSize: "1.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          SM.
        </Link>

        {/* Desktop Navigation */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Link
            href="/#projects"
            style={{
              textDecoration: "none",
              color: "var(--color-foreground-primary)",
              fontSize: "0.95rem",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-interactive-default)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-foreground-primary)";
            }}
          >
            Projects
          </Link>
          <Link
            href="/blog"
            style={{
              textDecoration: "none",
              color: "var(--color-foreground-primary)",
              fontSize: "0.95rem",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-interactive-default)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-foreground-primary)";
            }}
          >
            Blog
          </Link>
          <Link
            href="/#contact"
            style={{
              textDecoration: "none",
              color: "var(--color-foreground-primary)",
              fontSize: "0.95rem",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-interactive-default)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-foreground-primary)";
            }}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
          }}
          className="mobile-menu-button"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          style={{
            display: "none",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem",
            borderTop: "1px solid var(--color-border-default)",
          }}
          className="mobile-nav"
        >
          <Link href="/#projects" onClick={() => setIsOpen(false)}>
            <Text>Projects</Text>
          </Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>
            <Text>Blog</Text>
          </Link>
          <Link href="/#contact" onClick={() => setIsOpen(false)}>
            <Text>Contact</Text>
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-button,
          .mobile-nav {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
          .mobile-nav {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
