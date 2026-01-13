import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("shows hero and CTA buttons", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /hi, i'm sergi/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /view projects/i })).toBeVisible();
  });

  test("project images load correctly", async ({ page }) => {
    await page.goto("/");
    
    // Wait for the projects section to be visible
    await expect(page.getByRole("heading", { name: /featured projects/i })).toBeVisible();
    
    // Get all project images within project cards
    const projectImages = page.locator("#projects img");
    const imageCount = await projectImages.count();
    
    // Should have at least 5 project images (we have 5 projects)
    expect(imageCount).toBeGreaterThanOrEqual(5);
    
    // Track failed image loads
    const failedImages: string[] = [];
    
    // Check each image loads successfully
    for (let i = 0; i < imageCount; i++) {
      const image = projectImages.nth(i);
      
      // Verify image has a src attribute
      const src = await image.getAttribute("src");
      expect(src).toBeTruthy();
      expect(src).not.toBe("");
      
      // Verify image is visible
      await expect(image).toBeVisible();
      
      // Wait for image to load and check it's not broken
      const imageLoadStatus = await image.evaluate((img: HTMLImageElement) => {
        return new Promise<{ loaded: boolean; naturalWidth: number; error: boolean }>((resolve) => {
          const imageElement = img as HTMLImageElement;
          
          // If already loaded
          if (imageElement.complete && imageElement.naturalWidth > 0) {
            resolve({
              loaded: true,
              naturalWidth: imageElement.naturalWidth,
              error: false,
            });
            return;
          }
          
          // Wait for load
          imageElement.onload = () => {
            resolve({
              loaded: true,
              naturalWidth: imageElement.naturalWidth,
              error: false,
            });
          };
          
          imageElement.onerror = () => {
            resolve({
              loaded: false,
              naturalWidth: 0,
              error: true,
            });
          };
          
          // Timeout after 3 seconds
          setTimeout(() => {
            resolve({
              loaded: imageElement.complete,
              naturalWidth: imageElement.naturalWidth,
              error: !imageElement.complete || imageElement.naturalWidth === 0,
            });
          }, 3000);
        });
      });
      
      // Verify image loaded successfully
      if (imageLoadStatus.error || imageLoadStatus.naturalWidth === 0) {
        failedImages.push(src || `image-${i}`);
      }
      
      // If it's a Next.js optimized image, verify the URL structure and accessibility
      if (src?.includes("/_next/image")) {
        // Check for projects in the URL (could be encoded as %2Fprojects%2F)
        expect(src).toMatch(/projects/i);
        // Verify the image optimization endpoint is accessible
        const response = await page.request.get(src);
        expect(response.status()).toBe(200);
      }
    }
    
    // Fail the test if any images failed to load
    if (failedImages.length > 0) {
      throw new Error(`Failed to load ${failedImages.length} project image(s): ${failedImages.join(", ")}`);
    }
  });

  // test("shows latest writing cards", async ({ page }) => {
  //   await page.goto("/");
  //   await expect(page.getByRole("heading", { name: /latest writing/i })).toBeVisible();
  //   await expect(page.locator("#blog").getByRole("link", { name: /read more/i }).first()).toBeVisible();
  // });
});
