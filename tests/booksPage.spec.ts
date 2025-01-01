import { test } from "@playwright/test";
import { PageManager } from "../pageObjects/pageManager";
import { TIMEOUT } from "dns";

test.beforeEach(async ({ page }) => {
  await page.goto("https://buk-klab.vercel.app/");
});

test.describe("Verification of consistent elements on the BooksPage", () => {
  test("Navbar elements visible on the BooksPage", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToBooksPage();
    await pm.navigateTo().verifyAllNavigationLocatorsVisible();
  });

  //TODO:add test for the footer whenever it will be done by Eliska.. :D
});

test.describe("Verification of unique elemnts on the Books", () => {
  test("Main elements visible on the BooksPage", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToBooksPage();
    await pm.onBooksPage().verifyAllMainStaticBooksPageElementsVisibleOnFirstVisit();
    await pm.onBooksPage().isSearchGirlImageVisible(true);
  });

  test("Verify hidden elements NOT visible before search on the BooksPage", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToBooksPage();
    await pm.onBooksPage().isBookNotFoundMessageDisplayed(false);
  });

  test("Verify elements are hidden after search on the BooksPage", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToBooksPage();
    //TODO: search feature
    await pm.onBooksPage().isSearchGirlImageVisible(false);
  });
});