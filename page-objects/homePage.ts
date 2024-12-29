import {expect, Locator, Page} from "@playwright/test"

export class HomePage
{
    readonly page: Page
    readonly welcomeToBukKlabText: Locator
    readonly joinBukKlabLink: Locator
    readonly pismenka: Locator
    readonly howDoesItWorkRegion: Locator
    readonly currentlyReadingReion: Locator
    readonly upcomingEvents: Locator
    readonly testimonials: Locator

    constructor(page: Page){
        this.page = page
        this.welcomeToBukKlabText = page.getByText('Welcome tobuk klabbuk klab is')
        this.joinBukKlabLink = page.locator('section').filter({ hasText: 'Welcome tobuk klabbuk klab is'}).getByRole('link')
        this.pismenka = page.locator('div').filter({ hasText: /^písmenka$/ })
        this.howDoesItWorkRegion = page.getByRole('heading', { name: 'how does it work?', exact: true  })
        this.currentlyReadingReion = page.getByRole('heading', { name: 'what are we currently reading?', exact: true })
        this.upcomingEvents = page.getByRole('heading', { name: 'upcoming events', exact: true })
        this.testimonials = page.getByRole('heading', { name: 'testimonials', exact: true })
    }

    getLocators(): Locator[] {
        return [
            this.welcomeToBukKlabText,
            this.joinBukKlabLink,
            this.pismenka,
            this.howDoesItWorkRegion,
            this.currentlyReadingReion,
            this.upcomingEvents,
            this.testimonials,
        ];
    }    

    async verifyAllHomePageLocatorsVisible(): Promise<void> {
        const locators = this.getLocators();
        for (const locator of locators) {
            await expect(locator, `Home page locator is not visible: ${locator}`).toBeVisible();
        }
    }
}