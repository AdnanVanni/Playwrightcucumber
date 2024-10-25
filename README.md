**Cucumber-based Automation Framework with TypeScript and Playwright**


Overview
This guide covers the setup of a Cucumber-based automation framework using TypeScript and Playwright. It employs the Page Object Model (POM) design pattern, uses Playwright methods for validating UI results against API responses, and demonstrates the use of Cucumber World constructor for shared test context.

Prerequisites
Node.js (>=14.x)

npm (>=6.x)

Project Setup
Initialize the Project:

bash

Copy
mkdir playwright-cucumber-ts
cd playwright-cucumber-ts
npm init -y
Install Required Dependencies:

bash

Copy
npm install --save-dev @cucumber/cucumber @playwright/test ts-node typescript @types/node
TypeScript Configuration
Create tsconfig.json in the root:

json

Copy
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["tests/**/*.ts"]
}
Cucumber Configuration
Create cucumber.ts in the root:

typescript

Copy
module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require ./tests/steps/**/*.ts',
    '--format progress-bar',
    'features/**/*.feature'
  ].join(' ')
};
Feature Files
Create features/ Directory and Add simple_search.feature:

gherkin

Copy
Feature: Search Functionality

Scenario: Validate Search Functionality
  Given the application is loaded successfully
  And user searches for "Testing"
  And user clicks on "Skill" Dropdown
  When user searches for "Automation testing" in Skill Dropdown
  Then user sees results matching the search term in the UI
  And user fetches search results from the API
  Then the UI results should match the API results

Scenario: Invalid Search with No Results
  Given the application is loaded successfully
  When user searches for "NonExistentTerm"
  Then user should see a "No results found" message
Step Definitions
Create tests/steps/steps.ts:

typescript

Copy
import { Given, When, Then, setDefaultTimeout, World } from '@cucumber/cucumber';
import { Browser, chromium, Page } from '@playwright/test';
import { SearchPage } from '../POs/SearchPage';

let browser: Browser;
let page: Page;

setDefaultTimeout(500 * 1000);

class CustomWorld extends World {
  searchTerm: string;
  apiResults: any;
  uiResults: any;
}

Given('the application is loaded successfully', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  // Initialize SearchPage
});

When('user searches for {string}', async function (term: string) {
  this.searchTerm = term;
  // Add search functionality
});

Then('user sees results matching the search term in the UI', async function () {
  // Capture UI results
});

When('user fetches search results from the API', async function () {
  // Fetch and store API results in `this.apiResults`
});

Then('the UI results should match the API results', async function () {
  // Compare `this.uiResults` and `this.apiResults`
});

Then('user should see a "No results found" message', async function () {
  // Assert "No results found" message is displayed
});
Page Object Model (POM)
Create tests/POs/SearchPage.ts:

typescript

Copy
import { Page } from '@playwright/test';

export class SearchPage {
  constructor(public page: Page) {}

  async navigateTo() {
    // Navigate to the app's home page
  }

  async searchFor(term: string) {
    // Implement search functionality
  }

  async noResultsMessageIsVisible() {
    // Implement check for "No results found" message
  }
}
Cleanup
Add Cleanup Steps:

typescript

Copy
import { After } from '@cucumber/cucumber';

After(async function () {
  // Cleanup steps
  await page.close();
  await browser.close();
});
Reporting
Integrate Allure or Cucumber Reporting (Example with Allure):

bash

Copy
npm install --save-dev allure-commandline
Update cucumber.ts for Allure:

typescript

Copy
module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require ./tests/steps/**/*.ts',
    '--format progress-bar',
    '--format node_modules/@cucumber/pretty-formatter',
    '--format json:./reports/cucumber-report.json',
    'features/**/*.feature'
  ].join(' ')
};
Generate Allure Report:

bash

Copy
npx allure generate ./reports -o ./reports/allure-report --clean
Running the Tests
Update package.json:

json

Copy
{
  "scripts": {
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts",
    "test": "npx cucumber-js",
    "test:debug": "PWDEBUG=1 npx cucumber-js --require ./tests/steps/**/*.ts"
  }
}
Run the tests with:
npm run test
