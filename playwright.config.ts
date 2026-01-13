import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  globalSetup: "./tests/e2e/global-setup",
  testDir: "tests/e2e",
  timeout: 60_000,
  fullyParallel: true,
  webServer: {
    // In CI, test against production build to catch production-specific issues
    // Locally, use dev server for faster iteration
    command: process.env.CI ? "npm run start" : "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
    // Give production server more time to start
    timeout: process.env.CI ? 120_000 : 60_000,
  },
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
