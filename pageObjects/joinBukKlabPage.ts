import { Page } from "@playwright/test";

export class JoinBukKlabPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
