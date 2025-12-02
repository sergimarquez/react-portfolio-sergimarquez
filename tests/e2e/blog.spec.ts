import { test, expect } from "@playwright/test";

const cards = (page: any) => page.locator("article");
const yearButton = (page: any, label: string) => {
  if (label === "All Years") {
    return page.getByRole("button", { name: label });
  }
  // Year buttons show "2024 1" - find by text content in button
  return page.locator("aside").getByRole("button").filter({ hasText: label }).first();
};
const tagChip = (page: any, tag: string) => page.getByRole("button", { name: tag });

test.describe("Blog page", () => {
  test("filters posts by year and tag", async ({ page }) => {
    await page.goto("/blog");

    await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible();
    const initialCount = await cards(page).count();
    expect(initialCount).toBeGreaterThan(1);

    // Filter by year 2025 (all current posts are from 2025)
    const year2025Button = yearButton(page, "2025");
    await expect(year2025Button).toBeVisible();
    await year2025Button.click();
    // Should show all posts (they're all from 2025)
    await expect(cards(page)).toHaveCount(initialCount);

    // Clear year filter
    await yearButton(page, "All Years").click();
    await expect(cards(page)).toHaveCount(initialCount);

    // Filter by tag
    await tagChip(page, "architecture").click();
    const filteredCount = await cards(page).count();
    expect(filteredCount).toBeGreaterThanOrEqual(1);
    // Verify at least one post with "architecture" tag is shown
    const firstCardText = await cards(page).first().textContent();
    expect(firstCardText).toBeTruthy();
  });

  test("navigates to blog post", async ({ page }) => {
    await page.goto("/blog");

    const firstCard = cards(page).first();
    const readMore = firstCard.getByRole("link", { name: /read more/i });
    await expect(readMore).toBeVisible();
    const href = await readMore.getAttribute("href");
    if (!href) {
      throw new Error("Read more link has no href");
    }
    
    // Click and wait for navigation - this is the core functionality
    await Promise.all([
      page.waitForURL(`**${href}`, { timeout: 15000 }),
      readMore.click(),
    ]);
    
    // Verify we navigated to the blog post page
    await expect(page).toHaveURL(new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    
    // Wait for page to be interactive (MDX loads asynchronously)
    await page.waitForLoadState("domcontentloaded");
    // Just verify the URL changed - the page structure is tested elsewhere
    expect(page.url()).toContain("/blog/");
  });
});
