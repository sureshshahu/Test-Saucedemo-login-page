import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
} from "@cucumber/cucumber";
import { chromium, Browser } from "@playwright/test";
import { CustomWorld } from "./world";

let browser: Browser;
const isHeadless = process.env.HEADLESS !== "false";

// Fixture: launch ONE browser for the whole run (fast, reused across scenarios)
BeforeAll(async function () {
  browser = await chromium.launch({ headless: isHeadless });
});

// Fixture: fresh context + page + traces per scenario (isolation between tests)
Before(async function (this: CustomWorld, { pickle }) {
  this.browser = browser;
  this.context = await browser.newContext();
  await this.context.tracing.start({ screenshots: true, snapshots: true });

  this.page = await this.context.newPage();
  this.initPages();
});

// Fixture: capture screenshot + save trace ONLY on failure, then close context
After(async function (this: CustomWorld, { pickle, result }) {
  if (result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, "image/png");

    await this.context.tracing.stop({
      path: `reports/traces/${pickle.name.replace(/\s+/g, "_")}.zip`,
    });
  } else {
    await this.context.tracing.stop();
  }

  await this.context.close();
});

AfterAll(async function () {
  await browser.close();
});
