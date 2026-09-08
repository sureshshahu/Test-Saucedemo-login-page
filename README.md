# SauceDemo Login Automation — Playwright + TypeScript + BDD Cucumber + POM

Automates the login page at https://www.saucedemo.com/ using:
- Playwright (TypeScript) with **built-in locators** (`getByPlaceholder`, `getByRole`, `getByTestId`)
- **Page Object Model (POM)** — `LoginPage.ts`, `ProductsPage.ts`
- **BDD with Cucumber** — Gherkin `.feature` files + TypeScript step definitions
- **Fixtures/Hooks** — browser lifecycle, tracing, screenshot-on-failure
- **JSON test data** — externalized in `test-data/users.json`
- **CI/CD** — GitHub Actions pipeline with published HTML report

## Project Structure
```
saucedemo-playwright-bdd/
├── features/
│   └── login.feature                  # Gherkin scenarios
├── src/
│   ├── pages/
│   │   ├── LoginPage.ts               # POM - login page locators & actions
│   │   └── ProductsPage.ts            # POM - post-login products page
│   ├── step-definitions/
│   │   └── login.steps.ts             # Maps Gherkin -> Playwright code
│   └── support/
│       ├── world.ts                   # Custom Cucumber World (shared state)
│       ├── hooks.ts                   # Before/After fixtures (browser, tracing)
│       ├── testDataUtil.ts            # Utility to read JSON test data
│       └── generate-report.ts         # Generates styled HTML report
├── test-data/
│   └── users.json                     # Test data (usernames/passwords)
├── .github/workflows/
│   └── playwright-bdd.yml             # CI/CD pipeline
├── cucumber.cjs                       # Cucumber runner config
├── playwright config (via hooks.ts)   # Browser launched in hooks, headless in CI
├── tsconfig.json
└── package.json
```

---

## STEP 1 — Develop & Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Type-check the project
npm run typecheck

# 4. Run the BDD suite (headless)
npm test

# Or run headed (see the browser) for debugging
npm run test:headed

# 5. Generate the styled HTML report
npm run report:generate

# 6. Open the report
npx playwright show-report reports/html-report
```

Expected local result: **3 scenarios passing** —
1. Successful login (`standard_user`)
2. Locked out user blocked with error
3. Invalid credentials rejected with error

---

## STEP 2 — Commit to Git (once tests pass locally)

```bash
git init
git add .
git commit -m "feat: SauceDemo login automation - Playwright TS BDD POM framework"
```

---

## STEP 3 — Push to GitHub

```bash
# Create a new repo on github.com first (e.g. saucedemo-playwright-bdd), then:
git branch -M main
git remote add origin https://github.com/<your-username>/saucedemo-playwright-bdd.git
git push -u origin main
```

---

## STEP 4 — CI/CD Pipeline (already included)

`.github/workflows/playwright-bdd.yml` is already in the repo. GitHub Actions
automatically detects it under `.github/workflows/` — **no extra setup needed**.//
It triggers automatically on:
- Every push to `main`
- Every pull request targeting `main`

Pipeline stages:
1. Checkout code
2. Install Node.js + npm dependencies
3. Install Playwright browsers
4. Run the full BDD suite (`npm test`)
5. Generate the HTML report
6. Upload the HTML report + traces as pipeline artifacts
7. (On merge to `main`) publish the HTML report to GitHub Pages

---

## STEP 5 — Create a Pull Request to Trigger the Pipeline

```bash
git checkout -b feature/login-tests
# make a small change, e.g. add a new scenario
git add .
git commit -m "test: add extra login scenario"
git push -u origin feature/login-tests
```
Then on GitHub: **Compare & pull request** → **Create pull request**.

This automatically triggers the `pull_request` job in the pipeline — visible under
the **Actions** tab and directly on the PR page as a status check.

---

## STEP 6 — View Results & Published HTML Report

- **Actions tab** → select the workflow run → see pass/fail status per job
- **Artifacts** section of the run → download `cucumber-html-report.zip`
- If merged to `main` → the `publish-report` job deploys the HTML report to
  **GitHub Pages**, giving you a shareable live link:
  `https://<your-username>.github.io/saucedemo-playwright-bdd/`

  (Enable Pages once: repo **Settings → Pages → Source: gh-pages branch**)

---

## Test Data (`test-data/users.json`)
| Key | Username | Password | Expected Result |
|---|---|---|---|
| standardUser | standard_user | secret_sauce | Redirects to Products page |
| lockedOutUser | locked_out_user | secret_sauce | "Sorry, this user has been locked out." |
| invalidUser | invalid_user | wrong_password | "Username and password do not match..." |

## Debugging a Failed Test
If a scenario fails in CI, download the `playwright-traces` artifact and run:
```bash
npx playwright show-trace reports/traces/<scenario-name>.zip
```
This opens a full timeline: DOM snapshots, network calls, and console logs at
the exact point of failure.
