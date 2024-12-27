import {expect, test} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import { HomePage } from '../page-objects/homePage'

test.beforeEach(async ({page}) => {
    await page.goto("https://buk-klab.vercel.app/")
})

test('Navigation links are visble on all pages', async ({page}) => {
    const navigationPage = new NavigationPage(page)
    await navigationPage.verifyAllNavigationLocatorsVisible()
    await navigationPage.navigateToBooksPage()
    await navigationPage.verifyAllNavigationLocatorsVisible()
    await navigationPage.navigateToMembersPage()
    await navigationPage.verifyAllNavigationLocatorsVisible()
    await navigationPage.navigateToAboutPage()
    await navigationPage.verifyAllNavigationLocatorsVisible()
    await navigationPage.navigateToSignInPage()
    await navigationPage.verifyAllNavigationLocatorsVisible()
    await navigationPage.navigateToHomePage()
    await navigationPage.verifyAllNavigationLocatorsVisible()
})

test('Main elements visible on HomePage ', async ({page}) => {
    const homePage = new HomePage(page)
    await homePage.verifyAllHomePageLocatorsVisible()
})