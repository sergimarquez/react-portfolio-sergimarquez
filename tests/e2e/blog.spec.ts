import { test, expect } from "@playwright/test";

const cards = (page: any) => page.locator("article");
const yearButton = (page: any, label: string) => page.getByRole("button", { name: label });
const tagChip = (page: any, tag: string) => page.locator(`span:has-text("${tag}")`).first();

test.describe("Blog page", () => {
  test("filters posts by year and tag", async ({ page }) => {
    await page.goto("/blog");

    await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible();
    expect(await cards(page).count()).toBeGreaterThan(1);

    await yearButton(page, "2024").click();
    await expect(cards(page)).toHaveCount(1);

    await yearButton(page, "All Years").click();

    await tagChip(page, "design").click();
    await expect(cards(page)).toHaveCount(1);
    await expect(cards(page).first()).toContainText("Designing Scalable UI Systems");
  });

  test("navigates to blog post", async ({ page }) => {
    await page.goto("/blog");

    const firstCard = cards(page).first();
    const readMore = firstCard.getByRole("link", { name: /read more/i });
    await expect(readMore).toBeVisible();
    const href = await readMore.getAttribute("href");
    await readMore.click();
    await expect(page).toHaveURL(href!);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
