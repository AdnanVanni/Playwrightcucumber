import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
  searchTerm: string;
  apiResults: any;
  uiResults: any;
  skill:any;

  constructor() {
    this.searchTerm = 'Testing';
    this.apiResults = null;
    this.uiResults = null;
    this.skill='Automation Testing'
  }
}

setWorldConstructor(CustomWorld);
export { CustomWorld };
