import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./testOptions";

require("dotenv").config();

export default defineConfig<TestOptions>({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "https://buk-klab.vercel.app/",
    emailVerificationQaUrl: "https://www.seznam.cz/",
    trace: "on-first-retry",   
  },

  projects: [
    {
      name: "dev",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:5173/",
        emailVerificationQaUrl: "https://www.seznam.cz/",
      },
    },
    {
      name: "staging",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://buk-klab.vercel.app/",
        emailVerificationQaUrl: "https://www.seznam.cz/",
        viewport: {width: 1920, height: 1080}
      },
    },
    {
      name: "production",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://buk-klab.cz/",
        emailVerificationQaUrl: "https://www.seznam.cz/",
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
