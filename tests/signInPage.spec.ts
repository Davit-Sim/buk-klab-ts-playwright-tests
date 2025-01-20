import {test} from '../testOptions';

test.describe("Verification of consistent elements on the sign-in page", () => {
    test("Navbar elements are visible", async ({pageManager}) => {
        await pageManager.navigateTo().navigateToSignInPage();
        await pageManager.navigateTo().verifyAllNavigationLocatorsVisibleForAnonymUser();
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
        await pageManager.onSignInPage().logInWithUser();
        await pageManager.onHomePage().bukKlabDefaultTitle.isVisible()
        await pageManager.onHomePage().verifyBukKlabTitleChange("BukKlabUser");
        await pageManager.navigateTo().verifyAllNavigationLocatorsVisibleForASignedInUser();
        await pageManager.navigateTo().verifySignInLinkAndSignUpLinkNotVisible();
        await pageManager.navigateTo().clickSignOut();
        await pageManager.navigateTo().verifyAllNavigationLocatorsVisibleForAnonymUser();
        await pageManager.onHomePage().verifyBukKlabTitleChange()
    });

    test("Sign-in page error messages", async ({pageManager}) => {
        await pageManager.navigateTo().navigateToSignInPage();
        await pageManager.onSignInPage().isErrorMessageDisplayed(false);
        await pageManager.onSignInPage().logInWithUser('kobra@kobra.cz');
        await pageManager.onSignInPage().isErrorMessageDisplayed(true);
        await pageManager.onSignInPage().logInWithUser(undefined,'blabla');
        await pageManager.onSignInPage().isErrorMessageDisplayed(true);
    });

    test("Navbar elements visible for signed in user on all pages", async ({pageManager}) => {
        await pageManager.navigateTo().navigateToSignInPage();
        await pageManager.onSignInPage().logInWithUser();
        await pageManager.onHomePage().bukKlabDefaultTitle.isVisible()
        await pageManager.navigateTo().verifyAllNavigationLocatorsVisibleForASignedInUser();
        await pageManager.navigateTo().verifySignInLinkAndSignUpLinkNotVisible();
        await pageManager.navigateTo().verifyAllNavigationLocatorsVisibleForASignedInUser();
        await pageManager.navigateTo().verifySignInLinkAndSignUpLinkNotVisible();
        await pageManager.navigateTo().navigateToBooksPage();
        await pageManager.navigateTo().verifyAllNavigationLocatorsVisibleForASignedInUser();
        await pageManager.navigateTo().verifySignInLinkAndSignUpLinkNotVisible();
        await pageManager.navigateTo().navigateToMembersPage();
        await pageManager.navigateTo().verifyAllNavigationLocatorsVisibleForASignedInUser();
        await pageManager.navigateTo().verifySignInLinkAndSignUpLinkNotVisible();
        await pageManager.navigateTo().navigateToAboutPage();
        await pageManager.navigateTo().verifyAllNavigationLocatorsVisibleForASignedInUser();
        await pageManager.navigateTo().verifySignInLinkAndSignUpLinkNotVisible();
        await pageManager.navigateTo().navigateToJoinBukKlabPage();
        await pageManager.navigateTo().verifyAllNavigationLocatorsVisibleForASignedInUser();
        await pageManager.navigateTo().verifySignInLinkAndSignUpLinkNotVisible();
    });
});