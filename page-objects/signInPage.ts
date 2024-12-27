import {Page} from "@playwright/test"

export class SignInPage
{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

}