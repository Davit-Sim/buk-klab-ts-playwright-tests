import {expect, test} from "@playwright/test"

test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:4200/")
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
})

/*
test.beforeAll(async ({page}) => {
    await page.goto("http://localhost:4200/")

})
*/

test("Locator syntax rules", async({page}) => {
    
    //locator by TagName
    await page.locator("input", {});
    //by ID
    await page.locator("#inputEmail1").click()
    //By class value
    page.locator(".shape-rectangle")
    //attribute
    page.locator('[placeholder="Email"]')

    //by enireClass value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"]')

    //element by xPath
    page.locator('//*[@id="inputEmail1"]')

    //element by paritial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')



})

test("GetBy user prespective", async({page}) => {
    await page.getByRole("textbox", {name:"Email"}).first().click()
    await page.getByRole("button", {name:"Sign in"}).first().click()

    await page.getByLabel("Email").first().click()

    await page.getByPlaceholder("Jane Doe")

    await page.getByText("Using the Grid").click()

    //await page.getByTitle("IoT Dashboard").click()

    await page.getByTestId("SignIn").click()

})

test("Locating child elements", async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();

    await page.locator('nb-card').getByRole('button', {name:"Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test("Locating elements using parent element", async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole("textbox", {name:"Email"}).click();
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole("textbox", {name:"Email"}).click()
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole("textbox", {name:"Email"}).click();
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole("textbox", {name:"password"}).click();
    await page.locator('nb-card').filter({has: page.locator("nb-checkbox")}).filter({hasText: "Sign in"})
    .getByRole("textbox", {name:"Email"}).click();   
})  

test("Reuse locators", async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const basicFormEmailField = basicForm.getByRole("textbox", {name:"Email"})

    await basicFormEmailField.fill("test@test.com");
    await basicForm.getByRole("textbox", {name:"Password"}).fill("Welcome123");
    await basicForm.locator("nb-checkbox").click()
    await basicForm.getByRole("button", {name:"SUBMIT"}).click();

    await expect(basicFormEmailField).toHaveValue("test@test.com")
})

test("extracting values", async ({page}) => {
   //single text value
   const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
   const buttonText = await basicForm.locator("button").textContent()

   expect(buttonText).toEqual("Submit")

   //all text values
   const allRadioTextValues = await page.locator('nb-radio').allTextContents();
    expect(allRadioTextValues).toContain("Option 1")

    //value of input field
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill("test@test.com")
    const emailInputValue = await emailField.inputValue()
    expect(emailInputValue).toEqual("test@test.com")

    //attribute
    const placholderValue = await emailField.getAttribute('placeholder')
    expect(placholderValue).toEqual("Email")

})


test("assertions", async ({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator("button")


    //general assertions
    const value = 5;
    expect(value).toEqual(5)

    const buttonText = await basicFormButton.textContent()
    expect(buttonText).toEqual("Submit")


    //Locator Assertion
    await expect(basicFormButton).toHaveText("Submit")

    //soft asserion
    await expect.soft(basicFormButton).toHaveText("Submit5")
    await basicFormButton.click()
 })
 

