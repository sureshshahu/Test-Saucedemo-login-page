import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  private readonly page: Page;

  private readonly pageTitle: Locator;
  private readonly inventoryList: Locator;
  private readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.inventoryList = page.locator(".inventory_list");
    this.cartIcon = page.locator(".shopping_cart_link");
  }

  async assertOnProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.pageTitle).toHaveText("Products");
    await expect(this.inventoryList).toBeVisible();
  }

  async getProductCount(): Promise<number> {
    return this.page.locator(".inventory_item").count();
  }
}
