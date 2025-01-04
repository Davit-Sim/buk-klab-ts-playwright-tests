import { test } from "@playwright/test";
import { PageManager } from "../pageObjects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("https://buk-klab.vercel.app/");
});

test.describe("Verification of consistent elements on the BooksPage", () => {
  test("Navbar elements are visible", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToBooksPage();
    await pm.navigateTo().verifyAllNavigationLocatorsVisible();
  });
});

test.describe("Verification of unique elements on the BooksPage", () => {
  test("Main elements are visible", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToBooksPage();
    await pm.onBooksPage().verifyDefaultPlaceholderSearchText();
    await pm.onBooksPage().verifyAllMainStaticBooksPageElementsVisibleOnFirstVisit();
    await pm.onBooksPage().isSearchGirlImageVisible(true);
    await pm.onBooksPage().bookSearch('test');
    await page.waitForResponse('https://openlibrary.org/search*');
    await pm.onBooksPage().verifyDefaultPlaceholderSearchText('test');
    await pm.onBooksPage().verifyAllMainStaticBooksPageElementsVisibleOnFirstVisit();
  });

  test("Verify hidden elements NOT visible before search", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToBooksPage();
    await pm.onBooksPage().isBookNotFoundMessageDisplayed(false);
    await pm.onBooksPage().areBookGridAndBookCardsVisible(false);
  });

  test("Verify elements are hidden after search", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToBooksPage();
    await pm.onBooksPage().verifyDefaultPlaceholderSearchText();
    await pm.onBooksPage().bookSearch('Ahoj');
    await page.waitForResponse('https://openlibrary.org/search*');
    await pm.onBooksPage().isSearchGirlImageVisible(false);
    await pm.onBooksPage().clearSearch();
    await pm.onBooksPage().areBookGridAndBookCardsVisible(false);
    await pm.onBooksPage().verifyDefaultPlaceholderSearchText();
  });

  test("Verify expected count of book cards", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToBooksPage();
    await pm.onBooksPage().bookSearch('Harry Potter');
    await page.waitForResponse('https://openlibrary.org/search*');
    await pm.onBooksPage().verifyNumberOfBookCardsDisplayed(30);
    await pm.onBooksPage().clearSearch();
    await pm.onBooksPage().bookSearch('Jalovec');
    await page.waitForResponse('https://openlibrary.org/search*');
    await pm.onBooksPage().verifyNumberOfBookCardsDisplayed(12);
  });

  test("Verify book title, author and book cover by title seacrh", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToBooksPage(); 
    await pm.onBooksPage().bookSearch('Maminka');
    await page.waitForResponse('https://openlibrary.org/search*');
    await pm.onBooksPage().verifyBookDetails(2, 'Maminka', 'Jan Čarek');
    await pm.onBooksPage().verifyBookDetails(12, `= That's my mum`, 'Henriette Barkow', "https://covers.openlibrary.org/b/id/13189166-M.jpg")
    await pm.onBooksPage().clearSearch();
    await pm.onBooksPage().bookSearch('Pelikán');
    await pm.onBooksPage().verifyBookDetails(1, 'Pelikan dosyasi.', 'John Grisham')
  });
  
  test("Verify book title, author and book cover by author seacrh", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToBooksPage(); 
    await pm.onBooksPage().bookSearch('H. G. Wells');
    await page.waitForResponse('https://openlibrary.org/search*');
    await pm.onBooksPage().verifyBookDetails(6, 'The war of the worlds', 'H. G. Wells', 'https://covers.openlibrary.org/b/id/11938007-M.jpg');
    await pm.onBooksPage().clearSearch();
    await pm.onBooksPage().bookSearch('Herbert George Wells');
    await pm.onBooksPage().verifyBookDetails(29, 'Invisible Man', 'H. G. Wells');
  });  
});