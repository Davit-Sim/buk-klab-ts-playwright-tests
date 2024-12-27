import {Locator, Page} from "@playwright/test"

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
        this.navToBooksLink = page.getByRole('link', { name: 'books' })
        this.navToMembersLink = page.getByRole('link', { name: 'members' })
        this.navToAboutLink = page.getByRole('link', { name: 'about' })
        this.navToSignInLink = page.getByRole('link', { name: 'sign in' })
        this.navToJoinBukKlabLink = page.getByRole('list').getByRole('link', { name: 'join buk klab' })
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


    
    getLocators(): Locator[] {
        return [
            this.homePageLogoLink,
            this.navToBooksLink,
            this.navToMembersLink,
            this.navToAboutLink,
            this.navToSignInLink,
            this.navToJoinBukKlabLink,
            ];
        }
    

    async verifyAllNavigationLocatorsVisible(): Promise<boolean> {
        const locators = this.getLocators();
        for (const locator of locators) {
            const isVisible = await locator.isVisible();
            if (!isVisible) {
                console.error(`Locator is not visible: ${locator}`);
                    return false;
                }
            }
            return true;
        }
}