import {expect, Locator, Page} from "@playwright/test"

export class SignInPage {
    readonly page: Page
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly signUpTitle: Locator;
    readonly alreadyHaveAccount: Locator;
    readonly signUpLink: Locator;
    readonly invalidUserErrorText: Locator;

    constructor(page: Page) {
        this.page = page
        this.signUpTitle = page.getByText("sign in to your buk klab account");
        this.emailInput = page.getByRole('textbox', {name: 'email'});
        this.passwordInput = page.getByRole('textbox', {name: 'password'});
        this.signInButton = page.getByRole('button', {name: 'sign in'});
        this.alreadyHaveAccount = page.getByText('Don\'t have an account?');
        this.signUpLink = page.locator("p").getByRole("link", {name: "Sign up"});
        this.invalidUserErrorText = page.locator('p[class*="errorText"]');
    }

    async mainElemntsAreVisible() {
        await expect(this.signUpTitle).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.signInButton).toBeVisible();
        await expect(this.alreadyHaveAccount).toBeVisible();
        await expect(this.signUpLink).toBeVisible();
    }

    async logInWithUser(user?: string, password?: string) {
        user == undefined ? await this.emailInput.fill(process.env.TESTUSEREMAIL) : await this.emailInput.fill(user)
        password == undefined ? await this.passwordInput.fill(process.env.TESTUSERPASSWORD) : await this.passwordInput.fill(password);
        await this.signInButton.click();
    }

    async isErrorMessageDisplayed(isVisible: boolean) {
        isVisible == true ? await expect(this.invalidUserErrorText).toBeVisible() : await expect(this.invalidUserErrorText).not.toBeVisible();
    }
}