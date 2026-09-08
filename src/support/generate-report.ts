import * as reporter from "multiple-cucumber-html-reporter";

reporter.generate({
  jsonDir: "reports",
  reportPath: "reports/html-report",
  metadata: {
    browser: { name: "chromium", version: "latest" },
    device: "CI Runner",
    platform: { name: process.platform, version: process.version },
  },
  customData: {
    title: "Run Info",
    data: [
      { label: "Project", value: "SauceDemo Login Automation" },
      { label: "Framework", value: "Playwright + TypeScript + Cucumber BDD" },
      { label: "Execution Date", value: new Date().toISOString() },
    ],
  },
});
