import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("shows hero and CTA buttons", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /hi, i'm sergi/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /view projects/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /read blog/i })).toBeVisible();
  });

  test("shows latest writing cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /latest writing/i })).toBeVisible();
    await expect(page.locator("#blog").getByRole("link", { name: /read more/i }).first()).toBeVisible();
  });
});
