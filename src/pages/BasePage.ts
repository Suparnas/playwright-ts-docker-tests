import { Locator, Page } from "@playwright/test"; 


export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Method to navigate to a URL
    async navigate(url) {
     await this.page.goto(url);
    }
    
    async waitForElement(locator: Locator, timeout: number = 20000) {
        await locator.waitFor({ state: 'visible', timeout });
      }
  }


 