import { readBlogSource, getBlogSlugs } from "../blog";

describe("blog utilities", () => {
  it("should parse frontmatter correctly", () => {
    const slugs = getBlogSlugs();
    expect(slugs.length).toBeGreaterThan(0);

    slugs.forEach((slug) => {
      const { source, meta } = readBlogSource(slug);

      // Frontmatter should be parsed, not in content
      expect(source).not.toContain("---");
      expect(source).not.toContain("title:");
      expect(source).not.toContain("date:");
      expect(source).not.toContain("summary:");
      expect(source).not.toContain("tags:");

      // Meta should have required fields
      expect(meta.title).toBeDefined();
      expect(meta.title).not.toBe("");
      expect(meta.date).toBeDefined();
      expect(meta.date).not.toBe("");

      // Content should not be empty
      expect(source.trim().length).toBeGreaterThan(0);

      // Content should not start with frontmatter markers
      expect(source.trim()).not.toMatch(/^---/);
    });
  });

  it("should have valid date format", () => {
    const slugs = getBlogSlugs();

    slugs.forEach((slug) => {
      const { meta } = readBlogSource(slug);
      const date = new Date(meta.date);
      expect(date.toString()).not.toBe("Invalid Date");
    });
  });
});

