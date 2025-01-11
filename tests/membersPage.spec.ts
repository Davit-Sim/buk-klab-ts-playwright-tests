import {test} from '../testOptions';

test.describe("Verification of consistent elements on the MembersPage", () => {
  test("Navbar elements visible on the MembersPage", async ({ pageManager }) => {
    await pageManager.navigateTo().navigateToMembersPage();
    await pageManager.navigateTo().verifyAllNavigationLocatorsVisible();
  });
});

test.describe("Verification of unique elements on the MembersPage", () => {
  test("Main elements visible on the MembersPage", async ({ pageManager }) => {
    await pageManager.navigateTo().navigateToMembersPage();
    await pageManager.navigateTo().verifyAllNavigationLocatorsVisible();
    await pageManager.onMembersPage().verifyMainTitleTextAndIllustrationAreVisible();
    await pageManager.onMembersPage().verifyMembersIllustrationAndImgTextsAreVisible();
  });
});
