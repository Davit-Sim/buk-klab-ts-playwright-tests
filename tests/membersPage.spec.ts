import {test} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import { MembersPage } from '../page-objects/membersPage'

test.beforeEach(async ({page}) => {
    await page.goto("https://buk-klab.vercel.app/")
})

test('Navbar elements visible on the MembersPage', async ({page}) => {
    const navigationPage = new NavigationPage(page)
    await navigationPage.navigateToMembersPage()
    await navigationPage.verifyAllNavigationLocatorsVisible() 
})

test('Main elements visible on the MembersPage', async ({page}) => {
    const navigationPage = new NavigationPage(page)
    const membersPage = new MembersPage(page)   

    await navigationPage.navigateToMembersPage()    
    await navigationPage.verifyAllNavigationLocatorsVisible()    
    await membersPage.verifyMainTitleTextAndIllustrationAreVisible()
    await membersPage.verifyMembersIllustrationAndImgTextsAreVisible()
})