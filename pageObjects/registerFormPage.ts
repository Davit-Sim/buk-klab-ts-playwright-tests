import { expect, Locator, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class RegisterFormPage {
  readonly page: Page;
  readonly registerFormTitle: Locator;
  readonly illustration: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly haveAnAccountText: Locator;
  readonly signInLink: Locator;
  readonly registrationSuccessfulText: Locator;
  readonly signInSectionText: Locator;
  readonly allErrorMessages: Locator;
  readonly emailAlreadyExistsMessages: Locator;

  private readonly inputFields: Record<string, Locator>;

  private readonly errorMessageMap: Record<string, string> = {
    firstname: "First name cannot be empty or contain numbers",
    lastname: "Last name cannot be empty or contain numbers",
    email: "Please enter a valid email",
    password:
      "Password must have at least 8 characters, 1 uppercase letter and 1 number",
    confirmpassword: "Passwords don't match",
  };

  private readonly allErrors: string[] = [
    "First name cannot be empty or contain numbers",
    "Last name cannot be empty or contain numbers",
    "Please enter a valid email",
    "Password must have at least 8 characters, 1 uppercase letter and 1 number",
    "Passwords don't match",
  ];

  constructor(page: Page) {
    this.page = page;
    this.registerFormTitle = page.getByText("register to buk klab");
    this.illustration = page.locator('img[src*="group_of_people"]');
    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", {
      name: "Choose your password",
    });
    this.confirmPasswordInput = page.getByRole("textbox", {
      name: "Confirm your password",
    });
    this.submitButton = page.getByRole("button", { name: "register" });
    this.haveAnAccountText = page.getByText("Already have an account?");
    this.signInLink = page.locator("p").getByRole("link", { name: "sign in" });
    this.registrationSuccessfulText = page.getByText(
      "Registration successful! Check your email for a verification link."
    );
    this.signInSectionText = page.locator('p[class*="signInSection"]');
    this.allErrorMessages = page.locator('p[class*="errorText"]');
    this.emailAlreadyExistsMessages = page.getByText("Email already exists", {
      exact: true,
    });

    this.inputFields = {
      firstname: this.firstNameInput,
      lastname: this.lastNameInput,
      email: this.emailInput,
      password: this.passwordInput,
      confirmpassword: this.confirmPasswordInput,
    };
  }

  async mainRegisterFormElementsAreVisible() {
    await expect(this.registerFormTitle).toBeVisible();
    await expect(this.illustration).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.haveAnAccountText).toBeVisible();
    await expect(this.signInLink).toBeVisible();
  }

  async isIllustrationVisible(isDisplayed: boolean) {
    isDisplayed
      ? await expect(this.illustration).toBeVisible()
      : await expect(this.illustration).not.toBeVisible();
  }

  async isSuccessfulResgitrationTextVisible(isDisplayed: boolean) {
    isDisplayed
      ? await expect(this.registrationSuccessfulText).toBeVisible()
      : await expect(this.registrationSuccessfulText).not.toBeVisible();
  }

  async isEmailAlreadyExistsMessageVisible(isDisplayed: boolean) {
    isDisplayed
      ? await expect(this.emailAlreadyExistsMessages).toBeVisible()
      : await expect(this.emailAlreadyExistsMessages).not.toBeVisible();
  }

  async fillRegistrationForm(
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
  ) {
    const generatedFirstName = faker.person.firstName();
    const generatedLastName = faker.person.lastName();
    const generatedEmail = `${generatedFirstName}${generatedLastName}${faker.number.int(
      1000
    )}@pofmagic.com`;
    const genericPassword = "Password01!";
    const confirmGenericPassword = "Password01!";

    firstName != undefined
      ? await this.firstNameInput.fill(firstName)
      : await this.firstNameInput.fill(generatedFirstName);
    lastName != undefined
      ? await this.lastNameInput.fill(lastName)
      : await this.lastNameInput.fill(generatedLastName);
    email != undefined
      ? await this.emailInput.fill(email)
      : await this.emailInput.fill(generatedEmail);
    password != undefined
      ? await this.passwordInput.fill(password)
      : await this.passwordInput.fill(genericPassword);
    confirmPassword != undefined
      ? await this.confirmPasswordInput.fill(confirmPassword)
      : await this.confirmPasswordInput.fill(confirmGenericPassword);

    //Validation of input field values
    firstName != undefined
      ? await expect(this.firstNameInput).toHaveValue(firstName)
      : await expect(this.firstNameInput).toHaveValue(generatedFirstName);
    lastName != undefined
      ? await expect(this.lastNameInput).toHaveValue(lastName)
      : await expect(this.lastNameInput).toHaveValue(generatedLastName);
    email != undefined
      ? await expect(this.emailInput).toHaveValue(email)
      : await expect(this.emailInput).toHaveValue(generatedEmail);
    password != undefined
      ? await expect(this.passwordInput).toHaveValue(password)
      : await expect(this.passwordInput).toHaveValue(genericPassword);
    confirmPassword != undefined
      ? await expect(this.confirmPasswordInput).toHaveValue(confirmPassword)
      : await expect(this.confirmPasswordInput).toHaveValue(
          confirmGenericPassword
        );
  }

  async submitRegisterFormByClickingOnRegisterButton() {
    await this.submitButton.click();
  }

  async clearFields(fields: string[]) {
    if (fields.includes("all")) {
      for (const field of Object.keys(this.inputFields)) {
        await this.inputFields[field].clear();
      }
      return;
    }

    for (const field of fields) {
      const lowerCaseField = field.toLowerCase();
      if (this.inputFields[lowerCaseField]) {
        await this.inputFields[lowerCaseField].clear();
      }
    }
  }

  async validateErrorMessagesDoExist(fields: string[]) {
    const errorMessages = await this.allErrorMessages.allTextContents();

    if (fields.includes("all")) {
      for (const msg of this.allErrors) {
        await expect(errorMessages).toContain(msg);
      }
      return;
    }

    for (const field of fields) {
      const lowerField = field.toLowerCase();
      if (this.errorMessageMap[lowerField]) {
        await expect(errorMessages).toContain(this.errorMessageMap[lowerField]);
      }
    }
  }

  async validateErrorMessagesDoNotExist(fields: string[]) {
    const errorMessages = await this.allErrorMessages.allTextContents();

    if (fields.includes("all")) {
      for (const msg of this.allErrors) {
        await expect(errorMessages).not.toContain(msg);
      }
      return;
    }

    for (const field of fields) {
      const lowerField = field.toLowerCase();
      if (this.errorMessageMap[lowerField]) {
        await expect(errorMessages).not.toContain(
          this.errorMessageMap[lowerField]
        );
      }
    }
  }
}
