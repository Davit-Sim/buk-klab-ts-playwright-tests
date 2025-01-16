import {expect, Locator, Page} from "@playwright/test"

export class SignInPage {
    readonly page: Page
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly signUpTitle: Locator;
    readonly alreadyHaveAccount: Locator;
    readonly signUpLink: Locator;

    constructor(page: Page) {
        this.page = page
        this.signUpTitle = page.getByText("sign in to your buk klab account");
        this.emailInput = page.getByRole('textbox', {name: 'email'});
        this.passwordInput = page.getByRole('textbox', {name: 'password'});
        this.signInButton = page.getByRole('button', {name: 'sign in'});
        this.alreadyHaveAccount = page.getByText('Don\'t have an account?');
        this.signUpLink = page.locator("p").getByRole("link", {name: "Sign up"});
    }

    async mainElemntsAreVisible() {
        await expect(this.signUpTitle).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.signInButton).toBeVisible();
        await expect(this.alreadyHaveAccount).toBeVisible();
        await expect(this.signUpLink).toBeVisible();
    }

    async loginWithExistingTestUser() {
        await this.emailInput.fill(process.env.TESTUSEREMAIL);
        await this.passwordInput.fill(process.env.TESTUSERPASSWORD);
        await this.signInButton.click();
    }
}