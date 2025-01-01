import { Page } from "@playwright/test";

export class BookDetailPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
