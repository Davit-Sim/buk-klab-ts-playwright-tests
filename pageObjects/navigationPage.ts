import {expect, Locator, Page} from "@playwright/test"

export class NavigationPage {
    readonly page: Page
    readonly homePageLogoLink: Locator;
    readonly navToBooksLink: Locator;
    readonly navToMembersLink: Locator;
    readonly navToAboutLink: Locator;
    readonly navToSignInLink: Locator;
    readonly navToSignUpLink: Locator;
    readonly navToJoinBukKlabLink: Locator;
    readonly dropDownButton: Locator;
    readonly signOutButton: Locator;
    readonly userButton: Locator;

    constructor(page: Page) {
        this.page = page
        this.homePageLogoLink = page.getByRole('link', {name: 'buk klab', exact: true}).first();
        this.navToBooksLink = page.getByRole('link', {name: 'books', exact: true}).first();
        this.navToMembersLink = page.getByRole('link', {name: 'members', exact: true}).first();
        this.navToAboutLink = page.getByRole('link', {name: 'about', exact: true}).first();
        this.navToSignInLink = page.getByRole('link', {name: 'sign in', exact: true}).first();
        this.navToSignUpLink = page.getByRole('link', {name: 'sign up', exact: true}).first();
        this.navToJoinBukKlabLink = page.getByRole('list').getByRole('link', {name: 'join buk klab', exact: true}).first();
        this.dropDownButton = page.getByTestId('ExpandMoreRoundedIcon');
        this.signOutButton = page.getByRole('button', {name: 'sign out'});
        this.userButton = page.locator('[class*="userButton"]');
    }

    async navigateToHomePage() {
        await this.homePageLogoLink.click();
    }

    async navigateToBooksPage() {
        await this.navToBooksLink.click();
    }

    async navigateToMembersPage() {
        await this.navToMembersLink.click();
    }

    async navigateToAboutPage() {
        await this.navToAboutLink.click();
    }

    async navigateToSignInPage() {
        await this.navToSignInLink.click();
    }

    async navigateToSignUpPage() {
        await this.navToSignUpLink.click();
    }

    async navigateToJoinBukKlabPage() {
        await this.navToJoinBukKlabLink.click();
    }

    getLocators(): { locator: Locator; description: string }[] {
        return [
            {locator: this.homePageLogoLink, description: 'Home page logo link'},
            {locator: this.navToBooksLink, description: 'Books navigation link'},
            {locator: this.navToMembersLink, description: 'Members navigation link'},
            {locator: this.navToAboutLink, description: 'About navigation link'},
            {locator: this.navToSignInLink, description: 'Sign in navigation link'},
            {locator: this.navToSignUpLink, description: 'Sign up navigation link'},
            {locator: this.navToJoinBukKlabLink, description: 'Join Buk Klab link'},
        ];
    }

    // Verify all navigation locators are visible
    async verifyAllNavigationLocatorsVisibleForAnonymUser(): Promise<void> {
        const locators = this.getLocators();
        for (const {locator, description} of locators) {
            await expect(locator, `Navigation elemnt not visible: ${description}`).toBeVisible();
        }
    }

    async verifyAllNavigationLocatorsVisibleForASignedInUser(): Promise<void> {
        await expect(this.navToBooksLink).toBeVisible();
        await expect(this.navToMembersLink).toBeVisible();
        await expect(this.navToAboutLink).toBeVisible();
        await expect(this.navToJoinBukKlabLink).toBeVisible();
        await expect(this.userButton).toBeVisible();
    }

    async verifySignInLinkAndSignUpLinkNotVisible(): Promise<void> {
        await expect(this.navToSignInLink).not.toBeVisible();
        await expect(this.navToSignUpLink).not.toBeVisible();
    }

    async clickSignOut(): Promise<void> {
        await this.dropDownButton.click();
        await this.signOutButton.click();
    }
}