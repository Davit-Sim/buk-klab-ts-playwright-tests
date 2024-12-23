import {Page} from "@playwright/test"

export class NavigationPage{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async navigateToHomePage(){
        await this.page.getByRole('link', { name: 'buk klab', exact: true }).click()
    }

    async navigateToBooksPage(){
        await this.page.getByRole('link', { name: 'books' }).click()
    }

    async navigateToMembersPage(){
        await this.page.getByRole('link', { name: 'members' }).click()
    }

    async navigateToAboutPage(){
        await this.page.getByRole('link', { name: 'about' }).click()
    }

    async navigateToSignInPage(){
        await this.page.getByRole('link', { name: 'sign in' }).click()
    }
}