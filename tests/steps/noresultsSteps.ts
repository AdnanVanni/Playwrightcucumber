import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium, Page } from '@playwright/test';
import { SearchPage } from '../../POs/SearchScreen';

let browser: Browser;
let page: Page;
let homepagenew: SearchPage;

setDefaultTimeout(500 * 1000);

Given('the app is loaded', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  homepagenew = new SearchPage(page); // Initialize with the created page
  await page.route('**/*', (route) => {
    if (route.request().resourceType() === 'image') {
      route.abort();
    } else {
      route.continue();
    }
  });
  await homepagenew.navigateTo();
});

When('user searchs for NonExistentTerm', async function () {
  await homepagenew.searchFor("NonExistingTerm");
});

Then('user should see a "No results found" message', async function () {
  const noResultsElement = await homepagenew.noResultsMessageIsVisible();

});
