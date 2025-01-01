import { expect, Locator, Page } from "@playwright/test";

export class BooksPage {
  readonly page: Page;
  readonly booksPageTitle: Locator;
  readonly searchBar: Locator;
  readonly magnifyingGlassIcon: Locator;
  readonly mainSearchGirlImage: Locator;
  readonly bookNotFoundSorryMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.booksPageTitle = page.getByText('discover our books');
    this.searchBar = page.getByPlaceholder('search books by title or author');;
    this.magnifyingGlassIcon = page.getByTestId('SearchRoundedIcon')
    this.mainSearchGirlImage = page.locator('img[src*="search"]');
    this.bookNotFoundSorryMessage = page.getByText(`Sorry, we couldn't find any books matching your search`);
  }

  async verifyAllMainStaticBooksPageElementsVisibleOnFirstVisit() {
    await expect(this.booksPageTitle).toBeVisible();
    await expect(this.searchBar).toBeVisible();
    await expect(this.magnifyingGlassIcon).toBeVisible();
  }

  async isBookNotFoundMessageDisplayed(isDisplayed: boolean) {
    if (isDisplayed) {
      await expect(this.bookNotFoundSorryMessage).toBeVisible();
    }
    else {
      await expect(this.bookNotFoundSorryMessage).not.toBeVisible();
    }
  }

  async isSearchGirlImageVisible(isDisplayed: boolean) {
    if (isDisplayed) {
      await expect(this.mainSearchGirlImage).toBeVisible();
    }
    else {
      await expect(this.mainSearchGirlImage).not.toBeVisible();
    }
  }
}
