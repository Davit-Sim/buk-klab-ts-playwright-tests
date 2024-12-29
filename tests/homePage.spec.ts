import {expect, test} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import { HomePage } from '../page-objects/homePage'

test.beforeEach(async ({page}) => {
    await page.goto("https://buk-klab.vercel.app/")
})

test('Navbar elements visible on the HomePage', async ({page}) => {
    const navigationPage = new NavigationPage(page)
     await navigationPage.verifyAllNavigationLocatorsVisible()    
})

test('Main elements visible on the HomePage', async ({page}) => {
    const homePage = new HomePage(page) 
    await homePage.verifyAllHomePageLocatorsVisible()
})