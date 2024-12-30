import { test } from "@playwright/test";
import { PageManager } from "../pageObjects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("https://buk-klab.vercel.app/");
});

test.describe("Verification of consistent elements on the HomePage", () => {
  test("Navbar elements visible on the HomePage", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().verifyAllNavigationLocatorsVisible();
  });

  //TODO:add test for the footer whenever it will be done by Eliska.. :D
});

test.describe("Verification of unique elemnts on the HomePage", () => {
  test("Main elements visible on the HomePage", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.onHomePage().verifyAllHomePageLocatorsVisible();
  });
});
