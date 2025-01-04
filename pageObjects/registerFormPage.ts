import { expect, Locator, Page } from "@playwright/test";

export class RegisterFormPage {
  readonly page: Page;
  readonly registerFormTitle: Locator;
  readonly illustration: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButon: Locator;
  readonly haveAnAccountText: Locator;
  readonly signInLink: Locator;
  readonly registrationSuccessfulText: Locator;
  readonly signInSectionText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerFormTitle = page.getByText("register to buk klab");
    this.illustration = page.locator('img[src*="group_of_people"]');
    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Choose your password" }); 
    this.confirmPasswordInput = page.getByRole("textbox", { name: "Confirm your password" });
    this.submitButon = page.getByRole("button", { name: "register" });
    this.haveAnAccountText = page.getByText("Already have an account?");
    this.signInLink = page.locator("p").getByRole('link', {name: 'sign in'})
    this.registrationSuccessfulText = page.getByText("registration successful!");
    this.signInSectionText = page.locator('p[class*="signInSection"]');
  }

  async mainRegisterFormElementsAreVisible(){
    await expect(this.registerFormTitle).toBeVisible();
    await expect(this.illustration).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.submitButon).toBeVisible();
    await expect(this.haveAnAccountText).toBeVisible();
    await expect(this.signInLink).toBeVisible();    
  }

  async isIllustrationVisible(isDisplayed: boolean) {
    if (isDisplayed) {
        await expect(this.illustration).toBeVisible();
    } else {
        await expect(this.illustration).not.toBeVisible();
    }
  }

  async isSuccessfulResgitrationTextAndSignInSectionVisible(isDisplayed: boolean) {
    if (isDisplayed) {
        await expect(this.registrationSuccessfulText).toBeVisible();
        await expect(this.signInSectionText).toBeVisible();
    } else {
        await expect(this.registrationSuccessfulText).not.toBeVisible();
        await expect(this.signInSectionText).not.toBeVisible();
    }
  }

  async iClearFollowingTextBox(textboxName: string){
    
  }
}
