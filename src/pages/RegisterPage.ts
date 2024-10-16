import { Locator, Page } from "@playwright/test"; 
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage  {
    
   //locators  
   label: Locator;
   userName: Locator;
   email: Locator;
   password: Locator;
   chbx: Locator;
   //chbx2: Locator;
   register: Locator;

   constructor(page: Page) {
     super(page);
     this.userName = page.locator('input[id="reg_username"]');
     this.label = page.locator('label[for="reg_username"]');
     this.email = page.locator('input[id="reg_email"]');
     this.password = page.locator('input[id="reg_password"]');
     this.register = page.locator('button:has-text("Register")');
   }
 
  // Method to wait for all selectors individually
  async waitForSelectors() {
   //expect(await page.locator('h1 span').textContent()).toEqual('Django Unchained')
   await this.waitForElement(this.userName);
   await this.waitForElement(this.email);
   await this.waitForElement(this.password);
  //  await this.waitForElement(this.chbx);
  //  await this.waitForElement(this.chbx);
   await this.waitForElement(this.register);

 }

 // Method to fill the registration form
 async fillRegisterForm(userNameValue, emailValue, passwordValue) {
   await this.label.scrollIntoViewIfNeeded();
  // await this.waitForSelectors(); // Wait for all fields to be visible
   await this.userName.fill(userNameValue);
   await this.email.fill(emailValue);
   await this.password.fill(passwordValue);
  //  await this.chbx.nth(0).check();
  //  await this.chbx.nth(1).check();
   await this.register.click();
 }
}