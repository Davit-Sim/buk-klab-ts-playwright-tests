import {expect, test} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'

test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:5173/")
})

test('navigate to books page', async ({page}) => {
    const navigationPage = new NavigationPage(page)
    await navigationPage.navigateToBooksPage()
    await navigationPage.navigateToMembersPage()
    await navigationPage.navigateToAboutPage()
    await navigationPage.navigateToSignInPage()
    await navigationPage.navigateToHomePage()
})
