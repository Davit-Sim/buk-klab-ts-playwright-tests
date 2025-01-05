import { expect, Locator, Page } from "@playwright/test";
import { faker } from '@faker-js/faker'

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
    this.signInLink = page.locator("p").getByRole('link', { name: 'sign in' })
    this.registrationSuccessfulText = page.getByText("registration successful!");
    this.signInSectionText = page.locator('p[class*="signInSection"]');
  }

  async mainRegisterFormElementsAreVisible() {
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

  async fillOutNewValidUser(firstName?: string, lastName?: string, email?: string, password?: string, confirmPassword?: string,) {
    const generatedFirstName = faker.person.firstName();
    const generatedLastName = faker.person.lastName();
    const generatedEmail = `${generatedFirstName}${generatedLastName}${faker.number.int(100)}@na.na`;
    const genericPassword = "Password01!";
    const confirmGenericPassword = "Password01!";

    firstName != undefined ? await this.firstNameInput.fill(firstName) : await this.firstNameInput.fill(generatedFirstName);
    lastName != undefined ? await this.lastNameInput.fill(lastName) : await this.lastNameInput.fill(generatedLastName);
    email != undefined ? await this.emailInput.fill(email) : await this.emailInput.fill(generatedEmail);
    password != undefined ? await this.passwordInput.fill(password) : await this.passwordInput.fill(genericPassword);
    confirmPassword != undefined ? await this.confirmPasswordInput.fill(confirmPassword) : await this.confirmPasswordInput.fill(confirmGenericPassword);

    //Validation of input field values  
    firstName != undefined ? await expect(this.firstNameInput).toHaveValue(firstName) : await expect(this.firstNameInput).toHaveValue(generatedFirstName)
    lastName != undefined ? await expect(this.lastNameInput).toHaveValue(lastName) : await expect(this.lastNameInput).toHaveValue(generatedLastName);
    email != undefined ? await expect(this.emailInput).toHaveValue(email) : await expect(this.emailInput).toHaveValue(generatedEmail);
    password != undefined ? await expect(this.passwordInput).toHaveValue(password) : await expect(this.passwordInput).toHaveValue(genericPassword);
    confirmPassword != undefined ? await expect(this.confirmPasswordInput).toHaveValue(confirmPassword) : await expect(this.confirmPasswordInput).toHaveValue(confirmGenericPassword);
  }

  async submitRegisterFormByClickingOnRegisterButton(){
    await this.submitButon.click()
  }

  async iClearFollowingTextBox(value: string) {
    const boxParsed = value.replace(/\s+/g, '').toLowerCase();
    switch (value) {
      case 'firstname': {
        await this.firstNameInput.clear()
        break;
      }
      case 'lastname': {
        await this.lastNameInput.clear()
        break;
      }
      case 'email': {
        await this.emailInput.clear()
        break;
      }
      case 'password': {
        await this.passwordInput.clear()
        break;
      }
      case 'confirmpassword': {
        await this.confirmPasswordInput.clear()
        break;
      }
      case 'all': {
        const allInputBoxes = await this.page.locator("input", {})
        const count = await allInputBoxes.count()
        for (let i = 0; i < count; i++) {
          const inputBox = allInputBoxes.nth(i);
          await inputBox.clear();          
        }
        break;
      }
      default: {  

        break;
      }
    }
  }
}
