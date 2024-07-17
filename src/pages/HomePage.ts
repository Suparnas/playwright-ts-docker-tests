import { Locator, Page } from "@playwright/test"; 
import { BasePage } from "./BasePage";

export class HomePage extends BasePage  {
    
   //locators  
   logo: Locator;

   constructor(page: Page) {
     super(page);
     this.logo = page.locator('h1.text-5xl.font-black.leading-none');
   }
 
//methods 
async getLogoText() {
   await this.logo.waitFor({ state: 'visible', timeout: 20000 });
   return await this.logo.textContent();
}
}