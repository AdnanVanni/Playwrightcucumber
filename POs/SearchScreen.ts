import { Page } from 'playwright';
import { expect } from 'playwright/test';

export class SearchPage {
  private page: Page;

  constructor(page1: Page) {
    this.page = page1;
  }

  async navigateTo() {
  //  await this.page.goto('https://www.udacity.com/');
  await this.page.goto('https://www.udacity.com/catalog', { timeout:500000 });
  await this.page.waitForLoadState('load')


  }


  async searchFor(term: string) {
    await this.page.click('button[aria-label="Search"]');
    await this.page.getByRole('searchbox', { name: 'Search input' }).fill(term);
    await this.page.keyboard.press('Enter')
    await this.page.waitForLoadState('networkidle')
    await this.page.waitForTimeout(20000);
  


    
  
  }

  async skillClick() {
    //await this.page.locator(`xpath=//button[@id='accordion-button-:Riqksrlajl5t6:']//span[@class='css-1eziwv'][normalize-space()='Skill']`).isVisible();
   // await this.page.locator(`xpath=//button[@id='accordion-button-:Riqksrlajl5t6:']//span[@class='css-1eziwv'][normalize-space()='Skill']`).click({force:true});

   await this.page.getByRole('button', { name: 'Skill' }).click();



  }

  async searchInSkillDropdown(term: string) {
    // Click the input to focus
//await this.page.locator('input#\\:r7l\\:[role="combobox"]').click();


// Fill the input with a search term

await this.page.locator("//div[@class=' css-18euh9p']//input[@class=' css-10wwmqn']").nth(4).fill(term);

    await this.page.keyboard.press('Enter')
    
  }

  async noResultsMessageIsVisible() {


    await this.page.getByText('No Results Found').isVisible();



    
  }
  async assertThreeRecordsWithCourseNames() {
    await this.page.route('**/api/unified-catalog/search', route => {
      route.continue();
    });
    
    
    await this.page.keyboard.press('F5');
    
 


// Wait for and get the API response
const response = await this.page.waitForResponse(response => response.url().includes('/api/unified-catalog/search'));

// Assert the API response contains values
const data = await response.json();
console.log(data);
expect(data.searchResult.hits.length).toBeGreaterThan(0);

  
    // Verify there are exactly 3 records
    expect(data.searchResult.hits.length).toBe(3);
  
    // Extract and print course names
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const courseNames = data.searchResult.hits.map((hit: any) => hit._highlightResult.title.value);
    console.log('Course Names:', courseNames);
  
     
   expect(courseNames).toEqual(expect.arrayContaining([
   'React and Redux', 
    'Full Stack JavaScript Developer', 
     'React' // Replace with actual expected course names
   ]));
  }
 
 
}
