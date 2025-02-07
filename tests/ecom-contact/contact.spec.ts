import { test } from "@playwright/test";
import { ContactPage } from "../../src/pages/contact-page";
import { contactData } from "../../utils/test-data.ts";

test.describe("Contact Form Tests", () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.navigate('/contact');
  });

  contactData.forEach(({ description, firstName, lastName, email, subject, message, fileUpload, expectedResult }) => {
    test(description, async ({ page }) => {
      await contactPage.submitContactForm(firstName, lastName, email, subject, message, fileUpload);
      if (expectedResult === 'success') {
        await contactPage.verifySubmissionSuccess();
      } else {
        await contactPage.verifySubmissionFailure();
      }
    });
  });
});