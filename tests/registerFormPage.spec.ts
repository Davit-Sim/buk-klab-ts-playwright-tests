import { test } from "@playwright/test";
import { PageManager } from "../pageObjects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("https://buk-klab.vercel.app/");
});

test.describe("Verification of consistent elements on the RegisterFormPage", () => {
  test("Navbar elements are visible", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToJoinBukKlabPage();
    await pm.onJoinBukKlabPage().navigateToRegisterForm();
    await pm.navigateTo().verifyAllNavigationLocatorsVisible();
  });
});

test.describe("Verification of unique elements on the BooksPage", () => {
  test("Main elements are visible", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToJoinBukKlabPage();
    await pm.onJoinBukKlabPage().navigateToRegisterForm();
    await pm.onRegisterForm().mainRegisterFormElementsAreVisible();
    await pm.onRegisterForm().isSuccessfulResgitrationTextVisible(false);
  });

  test("Fill register form and create new user", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToJoinBukKlabPage();
    await pm.onJoinBukKlabPage().navigateToRegisterForm();
    await pm.onRegisterForm().fillRegistrationForm();
    await pm.onRegisterForm().validateErrorMessagesDoNotExist(["all"]);
    await pm.onRegisterForm().isEmailAlreadyExistsMessageVisible(false);
    await pm.onRegisterForm().submitRegisterFormByClickingOnRegisterButton();
    await pm.onRegisterForm().isSuccessfulResgitrationTextVisible(true);
    await pm.onRegisterForm().isEmailAlreadyExistsMessageVisible(false);
  });

  test("Submit invalid user", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToJoinBukKlabPage();
    await pm.onJoinBukKlabPage().navigateToRegisterForm();
    await pm.onRegisterForm().fillRegistrationForm();
    await pm.onRegisterForm().clearFields(["firstname"]);
    await pm.onRegisterForm().submitRegisterFormByClickingOnRegisterButton();
    await pm.onRegisterForm().validateErrorMessagesDoExist(["firstname"]);
    await pm.onRegisterForm().fillRegistrationForm();
    await pm.onRegisterForm().clearFields(["lastname"]);
    await pm.onRegisterForm().submitRegisterFormByClickingOnRegisterButton();
    await pm.onRegisterForm().validateErrorMessagesDoExist(["lastname"]);
    await pm.onRegisterForm().fillRegistrationForm();
    await pm.onRegisterForm().clearFields(["email"]);
    await pm.onRegisterForm().submitRegisterFormByClickingOnRegisterButton();
    await pm.onRegisterForm().validateErrorMessagesDoExist(["email"]);
    await pm.onRegisterForm().fillRegistrationForm();
    await pm.onRegisterForm().clearFields(["password"]);
    await pm.onRegisterForm().submitRegisterFormByClickingOnRegisterButton();
    await pm.onRegisterForm().validateErrorMessagesDoExist(["password"]);
    await pm.onRegisterForm().fillRegistrationForm();
    await pm.onRegisterForm().clearFields(["confirmPassword"]);
    await pm.onRegisterForm().submitRegisterFormByClickingOnRegisterButton();
    await pm.onRegisterForm().validateErrorMessagesDoExist(["confirmPassword"]);
    await pm.onRegisterForm().fillRegistrationForm("Random","User","eliska.voova@gmail.com","Password01!","Password01!");
    await pm.onRegisterForm().submitRegisterFormByClickingOnRegisterButton();
    await pm.onRegisterForm().isEmailAlreadyExistsMessageVisible(true);    
  });

  test("Error messagges logic verification", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToJoinBukKlabPage();
    await pm.onJoinBukKlabPage().navigateToRegisterForm();
    await pm.onRegisterForm().fillRegistrationForm();
    await pm.onRegisterForm().clearFields(["all"]);
    await pm.onRegisterForm().validateErrorMessagesDoExist(["firstname", "lastname", "email", "password"]);
    await pm.onRegisterForm().validateErrorMessagesDoNotExist(["confirmPassword"]);
    await pm.onRegisterForm().fillRegistrationForm("First","Last","TestLast","Password","Password");
    await pm.onRegisterForm().validateErrorMessagesDoNotExist(["firstname", "lastname", "confirmPassword"]);
    await pm.onRegisterForm().validateErrorMessagesDoExist(["email", "password"]);
    await pm.onRegisterForm().clearFields(["email","password", "confirmPassword"]);
    await pm.onRegisterForm().fillRegistrationForm("","","TestLast@neco.","01","Password");
    await pm.onRegisterForm().validateErrorMessagesDoExist(["email", "password", "confirmPassword"]);
  });
});
