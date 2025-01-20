import {test} from '../testOptions';

test.describe("Verification of consistent elements on the BooksPage", () => {
  test("Navbar elements are visible", async ({ pageManager }) => {
    await pageManager.navigateTo().navigateToBooksPage();
    await pageManager.navigateTo().verifyAllNavigationLocatorsVisibleForAnonymUser();
  });
});

test.describe("Verification of unique elements on the BooksPage", () => {
  test("Main elements are visible", async ({ page, pageManager }) => {
    await pageManager.navigateTo().navigateToBooksPage();
    await pageManager.onBooksPage().verifyDefaultPlaceholderSearchText();
    await pageManager.onBooksPage().verifyAllMainStaticBooksPageElementsVisibleOnFirstVisit();
    await pageManager.onBooksPage().isSearchGirlImageVisible(true);
    await pageManager.onBooksPage().bookSearch('test');
    await page.waitForResponse('https://openlibrary.org/search*');
    await pageManager.onBooksPage().verifyDefaultPlaceholderSearchText('test');
    await pageManager.onBooksPage().verifyAllMainStaticBooksPageElementsVisibleOnFirstVisit();
  });

  test("Verify hidden elements NOT visible before search", async ({ pageManager }) => {
    await pageManager.navigateTo().navigateToBooksPage();
    await pageManager.onBooksPage().isBookNotFoundMessageDisplayed(false);
    await pageManager.onBooksPage().areBookGridAndBookCardsVisible(false);
  });

  test("Verify elements are hidden after search", async ({page, pageManager }) => {
    await pageManager.navigateTo().navigateToBooksPage();
    await pageManager.onBooksPage().verifyDefaultPlaceholderSearchText();
    await pageManager.onBooksPage().bookSearch('Ahoj');
    await page.waitForResponse('https://openlibrary.org/search*');
    await pageManager.onBooksPage().isSearchGirlImageVisible(false);
    await pageManager.onBooksPage().clearSearch();
    await pageManager.onBooksPage().areBookGridAndBookCardsVisible(false);
    await pageManager.onBooksPage().verifyDefaultPlaceholderSearchText();
  });

  test("Verify expected count of book cards", async ({ page, pageManager }) => {
    await pageManager.navigateTo().navigateToBooksPage();
    await pageManager.onBooksPage().bookSearch('Harry Potter');
    await page.waitForResponse('https://openlibrary.org/search*');
    await pageManager.onBooksPage().verifyNumberOfBookCardsDisplayed(30);
    await pageManager.onBooksPage().clearSearch();
    await pageManager.onBooksPage().bookSearch('Jalovec');
    await page.waitForResponse('https://openlibrary.org/search*');
    await pageManager.onBooksPage().verifyNumberOfBookCardsDisplayed(12);
  });

  test("Verify book title, author and book cover by title seacrh", async ({ page, pageManager }) => {
    await pageManager.navigateTo().navigateToBooksPage(); 
    await pageManager.onBooksPage().bookSearch('Maminka');
    await page.waitForResponse('https://openlibrary.org/search*');
    await pageManager.onBooksPage().verifyBookDetails(2, 'Maminka', 'Jan Čarek');
    await pageManager.onBooksPage().verifyBookDetails(12, `= That's my mum`, 'Henriette Barkow', "https://covers.openlibrary.org/b/id/13189166-M.jpg")
    await pageManager.onBooksPage().clearSearch();
    await pageManager.onBooksPage().bookSearch('Pelikán');
    await pageManager.onBooksPage().verifyBookDetails(1, 'Pelikan dosyasi.', 'John Grisham')
  });
  
  test("Verify book title, author and book cover by author seacrh", async ({page, pageManager }) => {
    await pageManager.navigateTo().navigateToBooksPage(); 
    await pageManager.onBooksPage().bookSearch('H. G. Wells');
    await page.waitForResponse('https://openlibrary.org/search*');
    await pageManager.onBooksPage().verifyBookDetails(3, 'The war of the worlds', 'H. G. Wells', 'https://covers.openlibrary.org/b/id/11938007-M.jpg');
    await pageManager.onBooksPage().clearSearch();
    await pageManager.onBooksPage().bookSearch('Herbert George Wells');
    await pageManager.onBooksPage().verifyBookDetails(29, 'Invisible Man', 'H. G. Wells');
  });  
});