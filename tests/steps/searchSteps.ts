import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium, Page } from '@playwright/test';
import { SearchPage } from '../../POs/SearchScreen';
import { CustomWorld } from '../../world/CustomWorld';

let browser: Browser;
let page: Page;
let homepagenew: SearchPage;

setDefaultTimeout(500 * 1000);

Given('the application is loaded successfully', async function () {
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

When('user searches for word {string}', async function (this: CustomWorld, searchTerm: string) {
  this.searchTerm = searchTerm; // Store searchTerm in CustomWorld
  await homepagenew.searchFor(this.searchTerm);
});

When('user clicks on "Skill" Dropdown', async function () {
  await homepagenew.skillClick();
});

When('user searches for "Automation testing" in Skill Dropdown', async function (this: CustomWorld,skill: string) {
  this.skill=skill;
  await homepagenew.searchInSkillDropdown(this.skill); // Use skill from CustomWorld
});

Then('user sees results matching the search term in the UI', async function () {
  await homepagenew.assertThreeRecordsWithCourseNames();
});
