import {expect, Locator, Page} from "@playwright/test"

export class MembersPage
{
    readonly page: Page
    readonly mainMembersTitle: Locator 
    readonly introductoryText: Locator 
    readonly mainIllustrationGirl: Locator
    
    constructor(page: Page){
        this.page = page
        this.mainMembersTitle = page.getByRole('heading', { name: 'our great members' })
        this.introductoryText = page.getByText('Our community is made up of book lovers from all walks of life. We have students, teachers, parents, and professionals who are passionate about reading and sharing their thoughts with others. Join us today and meet new friends who share your love for reading.')
        this.mainIllustrationGirl = page.locator('img[src*="/assets/girl_holding_books"]');
    }

    async getIllustrationBasedOnTheName(illustrationName: string): Promise <Locator> {
        return this.page.getByRole('img', { name: illustrationName, exact: true });
    }

    async getIllustrationTextBasedOnTheName(illustrationTextName: string): Promise <Locator>{
        return this.page.getByText(illustrationTextName);
    }

    async verifyMainTitleTextAndIllustrationAreVisible(){        
        await expect(this.mainMembersTitle).toBeVisible()
        await expect(this.introductoryText).toBeVisible()
        await expect(this.mainIllustrationGirl).toBeVisible()
    }

    async verifyMembersIllustrationAndImgTextsAreVisible(){
        //ToDo: Do a clever foreach here...
        await expect(await this.getIllustrationBasedOnTheName('Anička')).toBeVisible()
        await expect(await this.getIllustrationBasedOnTheName('Damjan')).toBeVisible()
        await expect(await this.getIllustrationBasedOnTheName('Davit')).toBeVisible()
        await expect(await this.getIllustrationBasedOnTheName('Eliška')).toBeVisible()
        await expect(await this.getIllustrationBasedOnTheName('Jaruška')).toBeVisible()
        await expect(await this.getIllustrationBasedOnTheName('Lukáš')).toBeVisible()
        await expect(await this.getIllustrationBasedOnTheName('Míša')).toBeVisible()
        await expect(await this.getIllustrationBasedOnTheName('Pavel')).toBeVisible()
        await expect(await this.getIllustrationBasedOnTheName('Russell')).toBeVisible()
        await expect(await this.getIllustrationBasedOnTheName('Kiki')).toBeVisible()

        await expect(await this.getIllustrationTextBasedOnTheName('Anička V.')).toContainText('Anička V.')
        await expect(await this.getIllustrationTextBasedOnTheName('Damjan M.')).toContainText('Damjan M.')
        await expect(await this.getIllustrationTextBasedOnTheName('Davit S.')).toContainText('Davit S.')
        await expect(await this.getIllustrationTextBasedOnTheName('Eliška V.')).toContainText('Eliška V.')
        await expect(await this.getIllustrationTextBasedOnTheName('Jaruška N.')).toContainText('Jaruška N.')
        await expect(await this.getIllustrationTextBasedOnTheName('Lukáš Č.')).toContainText('Lukáš Č.')
        await expect(await this.getIllustrationTextBasedOnTheName('Míša L.')).toContainText('Míša L.')
        await expect(await this.getIllustrationTextBasedOnTheName('Pavel J.')).toContainText('Pavel J')
        await expect(await this.getIllustrationTextBasedOnTheName('Russell B.')).toContainText('Russell B.')
        await expect(await this.getIllustrationTextBasedOnTheName('Kiki V.')).toContainText('Kiki V.')
    }   
}