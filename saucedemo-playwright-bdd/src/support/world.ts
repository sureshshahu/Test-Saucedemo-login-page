import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  loginPage!: LoginPage;
  productsPage!: ProductsPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  // Instantiate all Page Objects once the page is ready
  initPages(): void {
    this.loginPage = new LoginPage(this.page);
    this.productsPage = new ProductsPage(this.page);
  }
}

setWorldConstructor(CustomWorld);
