import { test } from '../testOptions';

test.describe("Verification of consistent elements on the HomePage", () => {
  test("Navbar elements visible on the HomePage", async ({ pageManager }) => {
    await pageManager.navigateTo().verifyAllNavigationLocatorsVisible();
  });
});

test.describe("Verification of unique elemnts on the HomePage", () => {
  test("Main elements visible on the HomePage", async ({ pageManager }) => {
    await pageManager.onHomePage().verifyAllHomePageLocatorsVisible();
  });
});
