import { Before } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

let browser: Browser;
let page: Page;

Before(async function () {
  browser = await chromium.launch();
  page = await browser.newPage();

  await page.route('**/*', (route) => {
    if (route.request().resourceType() === 'image') {
      route.abort();
    } else {
      route.continue();
    }
  });

  this.page = page; // Make page available to steps
});