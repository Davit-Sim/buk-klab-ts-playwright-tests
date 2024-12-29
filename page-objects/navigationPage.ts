import {expect, Locator, Page} from "@playwright/test"

export class NavigationPage
{
    readonly page: Page
    readonly homePageLogoLink: Locator
    readonly navToBooksLink: Locator
    readonly navToMembersLink: Locator
    readonly navToAboutLink: Locator
    readonly navToSignInLink: Locator
    readonly navToJoinBukKlabLink: Locator

    constructor(page: Page){
        this.page = page
        this.homePageLogoLink = page.getByRole('link', { name: 'buk klab', exact: true })
        this.navToBooksLink = page.getByRole('link', { name: 'books', exact: true })
        this.navToMembersLink = page.getByRole('link', { name: 'members', exact: true })
        this.navToAboutLink = page.getByRole('link', { name: 'about', exact: true })
        this.navToSignInLink = page.getByRole('link', { name: 'sign in', exact: true  })
        this.navToJoinBukKlabLink = page.getByRole('list').getByRole('link', { name: 'join buk klab', exact: true })
    }

    async navigateToHomePage(){
        await this.homePageLogoLink.click()
    }

    async navigateToBooksPage(){
        await this.navToBooksLink.click()
    }

    async navigateToMembersPage(){
        await this.navToMembersLink.click()
    }

    async navigateToAboutPage(){
        await this.navToAboutLink.click()
    }

    async navigateToSignInPage(){
        await this.navToSignInLink.click()
    }

    async navigateToJoinBukKlabPage(){
        await this.navToJoinBukKlabLink.click();
    }
    
    getLocators(): { locator: Locator; description: string }[] {
        return [
            { locator: this.homePageLogoLink, description: 'Home page logo link' },
            { locator: this.navToBooksLink, description: 'Books navigation link' },
            { locator: this.navToMembersLink, description: 'Members navigation link' },
            { locator: this.navToAboutLink, description: 'About navigation link' },
            { locator: this.navToSignInLink, description: 'Sign in navigation link' },
            { locator: this.navToJoinBukKlabLink, description: 'Join Buk Klab link' },
        ];
    }

    // Verify all navigation locators are visible
    async verifyAllNavigationLocatorsVisible(): Promise<void> {
        const locators = this.getLocators();
        for (const { locator, description } of locators) {
            await expect(locator, `Navigation elemnt not visible: ${description}`).toBeVisible();
        }
    }
}