import { expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import exp from "constants";

export class ContactPage extends BasePage {
  readonly firstName = this.page.getByTestId("first-name");
  readonly lastName = this.page.getByTestId("last-name");
  readonly email = this.page.getByTestId("email");
  readonly subject = this.page.getByTestId("subject");
  readonly message = this.page.getByTestId("message");
  readonly attachment = this.page.getByTestId("attachment");
  readonly sendButton = this.page.getByTestId("contact-submit");
  readonly successMessage = this.page.getByRole('alert');
   // { name: ' Thanks for your message! We will contact you shortly. ' });
  readonly errorMessage = this.page.getByText("Email format is invalid");

  constructor(page: Page) {
    super(page);
  }

  async fillContactForm(fname: string, lname: string, email: string, subject: string, message: string, file: string) {
    await this.firstName.fill(fname);
    await this.lastName.fill(lname);
    await this.email.fill(email);
    await this.subject.selectOption(subject);
    await this.message.fill(message);
    await this.attachment.setInputFiles(file);
  }

  async submitContactForm(){
    await this.sendButton.click();}

    async verifySubmissionSuccess() {
      await this.successMessage.waitFor({ state: 'visible' });
      expect(await this.successMessage.textContent()).toContain('Thanks for your message! We will contact you shortly.');
    }
  
    async verifySubmissionFailure() {
      await this.errorMessage.waitFor({ state: 'visible' });
      expect(await this.errorMessage.isVisible()).toBeTruthy();
    }

}