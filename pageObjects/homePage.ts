import {expect, Locator, Page} from "@playwright/test"

export class HomePage {
    readonly page: Page
    readonly welcomeToBukKlabText: Locator;
    readonly joinBukKlabLink: Locator;
    readonly pismenka: Locator;
    readonly howDoesItWorkRegion: Locator;
    readonly currentlyReading: Locator;
    readonly upcomingEvents: Locator;
    readonly testimonials: Locator;
    readonly bukKlabDefaultTitle: Locator;

    constructor(page: Page) {
        this.page = page
        this.welcomeToBukKlabText = page.getByText('Welcome tobuk klabbuk klab is')
        this.joinBukKlabLink = page.locator('section').filter({hasText: 'Welcome tobuk klabbuk klab is'}).getByRole('link')
        this.pismenka = page.locator('div').filter({hasText: /^písmenka$/})
        this.howDoesItWorkRegion = page.getByRole('heading', {name: 'how does it work?', exact: true})
        this.currentlyReading = page.getByRole('heading', {name: 'what are we currently reading?', exact: true})
        this.upcomingEvents = page.getByRole('heading', {name: 'upcoming events', exact: true})
        this.testimonials = page.getByRole('heading', {name: 'testimonials', exact: true})
        this.bukKlabDefaultTitle = page.locator("h1[class*='title']");
    }

    getLocators(): { locator: Locator; description: string }[] {
        return [
            {locator: this.welcomeToBukKlabText, description: 'Welcome to Buk Klab text'},
            {locator: this.joinBukKlabLink, description: 'Join Buk Klab link'},
            {locator: this.pismenka, description: 'Písmenka section'},
            {locator: this.howDoesItWorkRegion, description: 'How does it work? heading'},
            {locator: this.currentlyReading, description: 'What are we currently reading? heading'},
            {locator: this.upcomingEvents, description: 'Upcoming events heading'},
            {locator: this.testimonials, description: 'Testimonials heading'},
        ];
    }

    async verifyAllHomePageLocatorsVisible(): Promise<void> {
        const locators = this.getLocators();
        for (const {locator, description} of locators) {
            await expect(locator, `Element not visible: ${description}`).toBeVisible();
        }
    }

    async verifyBukKlabTitleChange(user?: string): Promise<void> {
        user != undefined ? await expect(this.bukKlabDefaultTitle).toContainText(user) : await expect(this.bukKlabDefaultTitle).toContainText('buk klab')
    }
}
