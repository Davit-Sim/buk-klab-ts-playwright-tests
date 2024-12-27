import {Locator, Page} from "@playwright/test"

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
        this.joinBukKlabLink = page.locator('section').filter({ hasText: 'Welcome tobuk klabbuk klab is' }).getByRole('link')
        this.pismenka = page.locator('div').filter({ hasText: /^písmenka$/ })
        this.howDoesItWorkRegion = page.getByRole('heading', { name: 'how does it work?' })
        this.currentlyReadingReion = page.getByRole('heading', { name: 'what are we currently reading?' })
        this.upcomingEvents = page.getByRole('heading', { name: 'upcoming events' })
        this.testimonials = page.getByRole('heading', { name: 'testimonials' })
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
    

    async verifyAllHomePageLocatorsVisible(): Promise<boolean> {
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