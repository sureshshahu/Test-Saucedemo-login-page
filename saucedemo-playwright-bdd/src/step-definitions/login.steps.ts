import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { getUser } from "../support/testDataUtil";

Given(
  "the user is on the SauceDemo login page",
  async function (this: CustomWorld) {
    await this.loginPage.navigate();
    await this.loginPage.assertLoginPageLoaded();
  }
);

When(
  "the user logs in with the {string} credentials",
  async function (this: CustomWorld, userKey: string) {
    const { username, password } = getUser(userKey);
    await this.loginPage.login(username, password);
  }
);

Then(
  "the user should be navigated to the products page",
  async function (this: CustomWorld) {
    await this.productsPage.assertOnProductsPage();
  }
);

Then(
  "the user should see an error message {string}",
  async function (this: CustomWorld, expectedMessage: string) {
    await this.loginPage.assertErrorVisible();
    const actualMessage = await this.loginPage.getErrorMessage();
    expect(actualMessage).toContain(expectedMessage);
  }
);
