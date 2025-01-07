import { expect, Locator, Page } from "@playwright/test";

export class BooksPage {
  readonly page: Page;
  readonly booksPageTitle: Locator;
  readonly searchBar: Locator;
  readonly magnifyingGlassIcon: Locator;
  readonly mainSearchGirlImage: Locator;
  readonly bookNotFoundSorryMessage: Locator;
  readonly bookGrid: Locator;
  readonly bookCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.booksPageTitle = page.getByText("discover our books");
    this.searchBar = page.getByPlaceholder("search books by title or author");
    this.magnifyingGlassIcon = page.getByTestId("SearchRoundedIcon");
    this.mainSearchGirlImage = page.locator('img[src*="search"]');
    this.bookNotFoundSorryMessage = page.getByText(
      `Sorry, we couldn't find any books matching your search`
    );
    this.bookGrid = page.locator('div[class*="bookGrid"]');
    this.bookCards = page.locator('a[class*="bookCard"]');
  }

  async verifyAllMainStaticBooksPageElementsVisibleOnFirstVisit() {
    await expect(this.booksPageTitle).toBeVisible();
    await expect(this.searchBar).toBeVisible();
    await expect(this.magnifyingGlassIcon).toBeVisible();
  }

  async isBookNotFoundMessageDisplayed(isDisplayed: boolean) {
    isDisplayed
      ? await expect(this.bookNotFoundSorryMessage).toBeVisible()
      : await expect(this.bookNotFoundSorryMessage).not.toBeVisible();
  }

  async isSearchGirlImageVisible(isDisplayed: boolean) {
    //TODO - fix/implement better wait instead of this implicit fuj wait
    await this.page.waitForTimeout(500);
    isDisplayed
      ? await expect(this.mainSearchGirlImage).toBeVisible()
      : await expect(this.mainSearchGirlImage).not.toBeVisible();
  }

  async bookSearch(keyword: string) {
    await this.searchBar.fill(keyword);
    await expect(this.searchBar).toHaveValue(keyword);
  }

  async verifyDefaultPlaceholderSearchText(expectedText: string = "") {
    const placeholderText = await this.searchBar.getAttribute("placeholder");
    await expect(placeholderText).toBe("search books by title or author");

    const currentValue = await this.searchBar.inputValue();
    await expect(currentValue).toBe(expectedText);
  }

  async clearSearch() {
    await this.searchBar.clear();
  }

  async verifyNumberOfBookCardsDisplayed(expectedCount: number) {
    await expect(this.bookGrid).toBeVisible();
    const bookCardCount = await this.bookCards.count();
    await expect(
      bookCardCount,
      `Card count does not match: expected count is: ${expectedCount} and actual count is ${bookCardCount}.`
    ).toEqual(expectedCount);
  }

  async areBookGridAndBookCardsVisible(isDisplayed: boolean) {
    isDisplayed
      ? await expect(this.bookGrid).toBeVisible()
      : await expect(this.bookGrid).not.toBeVisible();
    isDisplayed
      ? expect(this.bookCards.first()).toBeVisible()
      : await expect(this.bookCards.first()).not.toBeVisible();
  }

  /**
   * Verifies book card title, author and cover url based on selected "nth" index
   * @param index : starts from 1, 1st index = 1st bookCard
   * @param expectedTitle
   * @param expectedAuthor
   * @param expectedCoverUrl : if URL is not provided, verifies that default cover "/assets/placeholder_book" is present
   */
  async verifyBookDetails(
    index: number,
    expectedTitle: string,
    expectedAuthor: string,
    expectedCoverUrl?: string
  ) {
    await expect(this.bookGrid).toBeVisible({ timeout: 10000 });
    const totalBooks = await this.bookCards.count();
    if (totalBooks == 0) {
      await expect(this.bookNotFoundSorryMessage).toBeVisible();
      throw new Error(`No books displayed.`);
    } else if (index - 1 >= totalBooks) {
      throw new Error(
        `Invalid book index: ${index}.
        \n Total book cards available: ${totalBooks}`
      );
    }

    const bookCard = this.bookCards.nth(index - 1);
    const bookTitleLocator = bookCard.locator('h3[class*="cardTitle"]');
    const bookAuthorLocator = bookCard.locator('p[class*="cardAuthor"]');
    const bookCoverLocator = bookCard.locator('img[class*="cardCover"]');
    const placeholderCoverBase = "/assets/placeholder_book";

    const actualTitle = await bookTitleLocator.textContent();
    const normalizedActualTitle = actualTitle?.normalize("NFC");

    const actualAuthor = await bookAuthorLocator.textContent();
    const normalizedActualAuthor = actualAuthor?.normalize("NFC");

    await expect(normalizedActualTitle).toBe(expectedTitle);
    await expect(normalizedActualAuthor).toBe(expectedAuthor);

    if (expectedCoverUrl) {
      await expect(bookCoverLocator).toHaveAttribute("src", expectedCoverUrl, {
        timeout: 5000,
      });
    } else {
      const actualCoverSrc = await bookCoverLocator.getAttribute("src");
      expect(actualCoverSrc).toContain(placeholderCoverBase);
    }
  }
}
