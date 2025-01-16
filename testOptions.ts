import { test as base } from '@playwright/test';
import { PageManager } from './pageObjects/pageManager';

export type TestOptions = {
    emailVerificationQaUrl: string
    homeLayoutsPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    emailVerificationQaUrl: ['', { option: true }],

    homeLayoutsPage: async ({ page }, use) => {
        await page.goto("/");
        await use('')
    },

    pageManager: async ({ page, homeLayoutsPage}, use) => {
        const pm = new PageManager(page);
        await use(pm);
    }
})