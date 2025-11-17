import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  globalSetup: "./tests/e2e/global-setup",
  testDir: "tests/e2e",
  timeout: 60_000,
  fullyParallel: true,
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
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
