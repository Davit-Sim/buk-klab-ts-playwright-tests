import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./testOptions";

require("dotenv").config();

export default defineConfig<TestOptions>({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "https://buk-klab.vercel.app/",
    emailVerificationQaUrl: "https://www.seznam.cz/",
  },

  projects: [
    {
      name: "dev",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:5173/",
        emailVerificationQaUrl: "https://www.seznam.cz/",
        trace: "on-first-retry", 
      },
    },
    {
      name: "staging",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://buk-klab.vercel.app/",
        emailVerificationQaUrl: "https://www.seznam.cz/",
        trace: "on",
        viewport: {width: 1920, height: 1080},
        launchOptions: {
          headless: true,
          args: ['--start-maximized'],
        },
      },
    },
    {
      name: "production",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://buk-klab.cz/",
        emailVerificationQaUrl: "https://www.seznam.cz/",
        trace: "on-first-retry", 
      },
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
      },
    },
    {
      name: "webkit",
      use: {
        browserName: "firefox",
      },
    },
  ],
});
