import { Page } from "@playwright/test";
import { NavigationPage } from "../pageObjects/navigationPage";
import { HomePage } from "../pageObjects/homePage";
import { MembersPage } from "../pageObjects/membersPage";
import { AboutPage } from "../pageObjects/aboutPage";
import { BooksPage } from "../pageObjects/booksPage";
import { BookDetailPage } from "../pageObjects/bookDetailPage";
import { JoinBukKlabPage } from "../pageObjects/joinBukKlabPage";
import { SignUpPage } from "../pageObjects/signUpPage";
import { SignInPage } from "../pageObjects/signInPage";

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly homePage: HomePage;
  private readonly membersPage: MembersPage;
  private readonly aboutPage: AboutPage;
  private readonly booksPage: BooksPage;
  private readonly bookDetailPage: BookDetailPage;
  private readonly joinBukKlabPage: JoinBukKlabPage;
  private readonly signUpPage: SignUpPage;
  private readonly signInPage: SignInPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.homePage = new HomePage(this.page);
    this.membersPage = new MembersPage(this.page);
    this.aboutPage = new AboutPage(this.page);
    this.booksPage = new BooksPage(this.page);
    this.bookDetailPage = new BookDetailPage(this.page);
    this.joinBukKlabPage = new JoinBukKlabPage(this.page);
    this.signUpPage = new SignUpPage(this.page);
    this.signInPage = new SignInPage(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }

  onHomePage() {
    return this.homePage;
  }

  onMembersPage() {
    return this.membersPage;
  }

  onAboutPage() {
    return this.aboutPage;
  }

  onBooksPage() {
    return this.booksPage;
  }

  onJoinBukKlabPage() {
    return this.joinBukKlabPage;
  }

  onSignUpPage() {
    return this.signUpPage ;
  }  

  onSignInPage() {
    return this.signInPage;
  }  
  
  onBookDetailPage() {
    return this.bookDetailPage;
  }
}
