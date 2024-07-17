import { Locator, Page } from "@playwright/test"; 
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage  {
    
   //locators  
   firstName: Locator;
   lastName: Locator;
   email: Locator;
   password: Locator;
   chbx: Locator;
   //chbx2: Locator;
   register: Locator;

   constructor(page: Page) {
     super(page);
     this.firstName = page.locator('input[autocomplete="given-name"]');
     this.lastName = page.locator('input[autocomplete="family-name"]');
     this.email = page.locator('input[autocomplete="email"]');
     this.password = page.locator('input[autocomplete="new-password"]');
     this.chbx = page.locator('button.shrink-0.inline-flex.w-4.h-4.rounded.border.cursor-pointer');
     this.register = page.locator('button:has-text("Register")');
   }
 
  // Method to wait for all selectors individually
  async waitForSelectors() {
   await this.waitForElement(this.firstName);
   await this.waitForElement(this.lastName);
   await this.waitForElement(this.email);
   await this.waitForElement(this.password);
   await this.waitForElement(this.chbx);
   await this.waitForElement(this.chbx);
   await this.waitForElement(this.register);

 }

 // Method to fill the registration form
 async fillRegisterForm(firstNameValue, lastNameValue, emailValue, passwordValue) {
  // await this.waitForSelectors(); // Wait for all fields to be visible
   await this.firstName.fill(firstNameValue);
   await this.lastName.fill(lastNameValue);
   await this.email.fill(emailValue);
   await this.password.fill(passwordValue);
   await this.chbx.nth(0).check();
   await this.chbx.nth(1).check();
   await this.register.click();
 }
}