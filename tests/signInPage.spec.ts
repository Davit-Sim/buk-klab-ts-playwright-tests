import {test} from '../testOptions';

test.describe("Verification of consistent elements on the sign-in page", () => {
    test("Navbar elements are visible", async ({pageManager}) => {
        await pageManager.navigateTo().navigateToSignInPage();
        await pageManager.navigateTo().verifyAllNavigationLocatorsVisible();
    });
});

test.describe("Verification of unique elements on the BooksPage", () => {
    test("Main elements are visible", async ({pageManager}) => {
        await pageManager.navigateTo().navigateToSignInPage();
        await pageManager.onSignInPage().mainElemntsAreVisible();
    });

    test("Sign in with existing user", async ({pageManager}) => {
        await pageManager.navigateTo().navigateToSignInPage();
        await pageManager.onSignInPage().mainElemntsAreVisible();
        await pageManager.onSignInPage().loginWithExistingTestUser();
        //TODO: Verify that I am on homepge
        await pageManager.onHomePage().bukKlabDefaultTitle.isVisible()
        await pageManager.onHomePage().verifyBukKlabTitleChange("BukKlabUser");
        //TODO: signout

        await pageManager.onHomePage().verifyBukKlabTitleChange()
    });
});