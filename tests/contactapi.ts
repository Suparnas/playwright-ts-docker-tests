import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import { ContactPage } from '../src/pages/contactPage';

test.describe('Contact', () => {
  let contactPage: ContactPage;
  let fakerAPI: APIRequestContext;
  let randomPerson: APIResponse;

  test.beforeAll(async ({ playwright}) => {
        fakerAPI = await playwright.request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com/'
    });

    const response = await fakerAPI.get('users');
    const responsebody = await response.json();
    randomPerson = responsebody[0];
  })

  test('Fill contact form and verify success message', async ({ page }) => {
    contactPage = new ContactPage(page);

    // open contact page
    await contactPage.navigate()

    //  fill out the input fields and submit
    await contactPage.submitForm(
      randomPerson['name'], 
      randomPerson['email'],
      randomPerson['phone'],
      randomPerson['website']
    );

    // verify success message
    await expect(contactPage.successTxt).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
  })
})