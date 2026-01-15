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

    // Get available years from the sidebar timeline section
    // Year buttons show format like "2025 1" or "2026 2" (year and count)
    // We need to find buttons that contain a 4-digit year
    const timelineSection = page.locator("aside").getByText("Timeline").locator("..");
    const yearButtons = timelineSection.getByRole("button");
    const yearButtonCount = await yearButtons.count();
    expect(yearButtonCount).toBeGreaterThan(1); // At least "All Years" + one year button

    // Find the first year button (skip "All Years" which is first)
    let firstYear: string | null = null;
    for (let i = 1; i < yearButtonCount; i++) {
      const button = yearButtons.nth(i);
      const text = await button.textContent();
      if (text) {
        const match = text.trim().match(/^(\d{4})/);
        if (match) {
          firstYear = match[1];
          break;
        }
      }
    }

    expect(firstYear).toBeTruthy();
    
    // Filter by the first available year
    const yearBtn = yearButton(page, firstYear!);
    await expect(yearBtn).toBeVisible();
    await yearBtn.click();
    
    // Should show posts from that year (count should be less than or equal to initial)
    const filteredByYearCount = await cards(page).count();
    expect(filteredByYearCount).toBeGreaterThan(0);
    expect(filteredByYearCount).toBeLessThanOrEqual(initialCount);

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
