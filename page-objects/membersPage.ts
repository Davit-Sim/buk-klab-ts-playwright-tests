import {Page} from "@playwright/test"

export class MembersPage
{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

}