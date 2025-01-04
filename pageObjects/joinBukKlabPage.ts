import { Locator, Page } from "@playwright/test";

export class JoinBukKlabPage {
  readonly page: Page;
  readonly joinBookClubButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.joinBookClubButton = page.getByText('join a book club', {exact: true});
  }

  async navigateToRegisterForm() {
    await this.joinBookClubButton.click();
  }
}