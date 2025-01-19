import {test} from '../testOptions';

test.describe("Verification of consistent elements on the RegisterFormPage", () => {
  test("Navbar elements are visible", async ({ pageManager }) => {
    await pageManager.navigateTo().navigateToSignUpPage();
    await pageManager.navigateTo().verifyAllNavigationLocatorsVisibleForAnonymUser();
  });
});

test.describe("Verification of unique elements on the BooksPage", () => {
  test("Main elements are visible", async ({ pageManager }) => {
    await pageManager.navigateTo().navigateToSignUpPage();
    await pageManager.onSignUpPage().mainRegisterFormElementsAreVisible();
    await pageManager.onSignUpPage().isSuccessfulResgitrationTextVisible(false);
  });

  test.skip("Fill register form and create new user", async ({ pageManager }) => {
    await pageManager.navigateTo().navigateToSignUpPage();
    await pageManager.onSignUpPage().fillRegistrationForm();
    await pageManager.onSignUpPage().validateErrorMessagesDoNotExist(["all"]);
    await pageManager.onSignUpPage().isEmailAlreadyExistsMessageVisible(false);
    await pageManager.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pageManager.onSignUpPage().isSuccessfulResgitrationTextVisible(true);
    await pageManager.onSignUpPage().isEmailAlreadyExistsMessageVisible(false);
  });

  test("Submit invalid user", async ({ pageManager }) => {
    await pageManager.navigateTo().navigateToSignUpPage();
    await pageManager.onSignUpPage().fillRegistrationForm();
    await pageManager.onSignUpPage().clearFields(["firstname"]);
    await pageManager.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pageManager.onSignUpPage().validateErrorMessagesDoExist(["firstname"]);
    await pageManager.onSignUpPage().fillRegistrationForm();
    await pageManager.onSignUpPage().clearFields(["lastname"]);
    await pageManager.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pageManager.onSignUpPage().validateErrorMessagesDoExist(["lastname"]);
    await pageManager.onSignUpPage().fillRegistrationForm();
    await pageManager.onSignUpPage().clearFields(["email"]);
    await pageManager.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pageManager.onSignUpPage().validateErrorMessagesDoExist(["email"]);
    await pageManager.onSignUpPage().fillRegistrationForm();
    await pageManager.onSignUpPage().clearFields(["password"]);
    await pageManager.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pageManager.onSignUpPage().validateErrorMessagesDoExist(["password"]);
    await pageManager.onSignUpPage().fillRegistrationForm();
    await pageManager.onSignUpPage().clearFields(["confirmPassword"]);
    await pageManager.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pageManager.onSignUpPage().validateErrorMessagesDoExist(["confirmPassword"]); 
  });

  test.skip("Submit already existing user", async ({ pageManager }) => {
    await pageManager.navigateTo().navigateToSignUpPage();
    await pageManager.onSignUpPage().fillRegistrationForm("BukKlabUser", "Existing", process.env.TESTUSEREMAIL, process.env.TESTUSERPASSWORD, process.env.TESTUSERPASSWORD);
    await pageManager.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
    await pageManager.onSignUpPage().isEmailAlreadyExistsMessageVisible(true);    
  });

  test("Error messagges logic verification", async ({ pageManager }) => {
    await pageManager.navigateTo().navigateToSignUpPage();
    await pageManager.onSignUpPage().fillRegistrationForm();
    await pageManager.onSignUpPage().clearFields(["all"]);
    await pageManager.onSignUpPage().validateErrorMessagesDoExist(["firstname", "lastname", "email", "password"]);
    await pageManager.onSignUpPage().validateErrorMessagesDoNotExist(["confirmPassword"]);
    await pageManager.onSignUpPage().fillRegistrationForm("First","Last","TestLast","Password","Password");
    await pageManager.onSignUpPage().validateErrorMessagesDoNotExist(["firstname", "lastname", "confirmPassword"]);
    await pageManager.onSignUpPage().validateErrorMessagesDoExist(["email", "password"]);
    await pageManager.onSignUpPage().clearFields(["email","password", "confirmPassword"]);
    await pageManager.onSignUpPage().fillRegistrationForm("","","TestLast@neco.","01","Password");
    await pageManager.onSignUpPage().validateErrorMessagesDoExist(["email", "password", "confirmPassword"]);
  });
});

test.describe("Email validation seznam.cz", () => {
  test("Email confirmation for new user", async ({ page, pageManager, emailVerificationQaUrl }) => {
    await page.goto(emailVerificationQaUrl);
    //TODO - email verification on seznam.cz
    await page.goto('/');
    await pageManager.navigateTo().navigateToSignUpPage();
    await pageManager.onSignUpPage().fillRegistrationForm("NewBukKlabUser", "NewUser", process.env.NEWTESTUSEREMAIL, process.env.NEWTESTUSERPASSWORD, process.env.NEWTESTUSERPASSWORD);
    await pageManager.onSignUpPage().submitRegisterFormByClickingOnRegisterButton();
  });
});
