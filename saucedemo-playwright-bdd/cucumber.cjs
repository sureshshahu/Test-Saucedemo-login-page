module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: [
      "src/step-definitions/**/*.ts",
      "src/support/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
      "summary",
      "progress-bar",
      "json:reports/cucumber-report.json",
      "html:reports/cucumber-report.html"
    ],
    formatOptions: { snippetInterface: "async-await" },
    publishQuiet: true
  }
};
