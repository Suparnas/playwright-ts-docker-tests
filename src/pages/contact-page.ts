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
  readonly successMessage = this.page.getByText("Thanks for your message! We will contact you shortly.");
  readonly errorMessage = this.page.getByText("Email format is invalid");

  constructor(page: Page) {
    super(page);
  }

  async submitContactForm(fname: string, lname: string, email: string, subject: string, message: string, file: string) {
    await this.firstName.fill(fname);
    await this.lastName.fill(lname);
    await this.email.fill(email);
    await this.subject.selectOption(subject);
    await this.message.fill(message);
    await this.attachment.setInputFiles(file);
    await this.sendButton.click();
  }

  async verifySubmissionSuccess() {
    await this.successMessage.isVisible();
    expect(await this.successMessage.isVisible()).toBeTruthy();
  }

  async verifySubmissionFailure() {
    await this.errorMessage.isVisible();
    expect(await this.errorMessage.isVisible()).toBeTruthy();
  }

}