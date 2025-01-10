import { test } from "@playwright/test";
import { PageManager } from "../pageObjects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("https://buk-klab.vercel.app/");
});

test.describe("Verification of consistent elements on the RegisterFormPage", () => {
  test("Navbar elements are visible", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToSignUpPage();
    await pm.navigateTo().verifyAllNavigationLocatorsVisible();
  });
});

test.describe("Verification of unique elements on the BooksPage", () => {
  test("Main elements are visible", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToSignUpPage();
    await pm.onSignUpPage().mainRegisterFormElementsAreVisible();
    await pm.onSignUpPage().isSuccessfulResgitrationTextVisible(false);
  });

  test.skip("Fill register form and create new user", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToSignUpPage();
    await pm.onSignUpPage().fillRegistrationForm();
    await pm.onSignUpPage().validateErrorMessagesDoNotExist(["all"]);
    await pm.onSignUpPage().isEmailAlreadyExistsMessageVisible(false);
    //await pm.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pm.onSignUpPage().isSuccessfulResgitrationTextVisible(true);
    await pm.onSignUpPage().isEmailAlreadyExistsMessageVisible(false);
  });

  test("Submit invalid user", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToSignUpPage();
    await pm.onSignUpPage().fillRegistrationForm();
    await pm.onSignUpPage().clearFields(["firstname"]);
    await pm.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pm.onSignUpPage().validateErrorMessagesDoExist(["firstname"]);
    await pm.onSignUpPage().fillRegistrationForm();
    await pm.onSignUpPage().clearFields(["lastname"]);
    await pm.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pm.onSignUpPage().validateErrorMessagesDoExist(["lastname"]);
    await pm.onSignUpPage().fillRegistrationForm();
    await pm.onSignUpPage().clearFields(["email"]);
    await pm.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pm.onSignUpPage().validateErrorMessagesDoExist(["email"]);
    await pm.onSignUpPage().fillRegistrationForm();
    await pm.onSignUpPage().clearFields(["password"]);
    await pm.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pm.onSignUpPage().validateErrorMessagesDoExist(["password"]);
    await pm.onSignUpPage().fillRegistrationForm();
    await pm.onSignUpPage().clearFields(["confirmPassword"]);
    await pm.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pm.onSignUpPage().validateErrorMessagesDoExist(["confirmPassword"]); 
  });

  test.skip("Submit already existing user", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToSignUpPage();
    await pm.onSignUpPage().fillRegistrationForm("Random","User","eliska.voova@gmail.com","Password01!","Password01!");
    //await pm.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pm.onSignUpPage().isEmailAlreadyExistsMessageVisible(true);    
  });

  test("Error messagges logic verification", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToSignUpPage();
    await pm.onSignUpPage().fillRegistrationForm();
    await pm.onSignUpPage().clearFields(["all"]);
    await pm.onSignUpPage().validateErrorMessagesDoExist(["firstname", "lastname", "email", "password"]);
    await pm.onSignUpPage().validateErrorMessagesDoNotExist(["confirmPassword"]);
    await pm.onSignUpPage().fillRegistrationForm("First","Last","TestLast","Password","Password");
    await pm.onSignUpPage().validateErrorMessagesDoNotExist(["firstname", "lastname", "confirmPassword"]);
    await pm.onSignUpPage().validateErrorMessagesDoExist(["email", "password"]);
    await pm.onSignUpPage().clearFields(["email","password", "confirmPassword"]);
    await pm.onSignUpPage().fillRegistrationForm("","","TestLast@neco.","01","Password");
    await pm.onSignUpPage().validateErrorMessagesDoExist(["email", "password", "confirmPassword"]);
  });
});
