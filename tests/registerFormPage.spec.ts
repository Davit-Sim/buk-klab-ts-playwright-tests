import { test } from "@playwright/test";
import { PageManager } from "../pageObjects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("https://buk-klab.vercel.app/");
});

test.describe("Verification of consistent elements on the RegisterFormPage", () => {
  test("Navbar elements are visible", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToJoinBukKlabPage();
    await pm.onJoinBukKlabPage().navigateToRegisterForm();
    await pm.navigateTo().verifyAllNavigationLocatorsVisible();
  });
});

test.describe("Verification of unique elements on the BooksPage", () => {
  test("Main elements are visible", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToJoinBukKlabPage();
    await pm.onJoinBukKlabPage().navigateToRegisterForm();
    await pm.onRegisterForm().mainRegisterFormElementsAreVisible();
    await pm.onRegisterForm().isSuccessfulResgitrationTextAndSignInSectionVisible(false);
  });

  test("Fill register form and create new user", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToJoinBukKlabPage();
    await pm.onJoinBukKlabPage().navigateToRegisterForm();
  });
});
