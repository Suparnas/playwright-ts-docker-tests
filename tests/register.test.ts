import { test, expect } from '@playwright/test';
import { RegisterPage } from '../src/pages/RegisterPage';
import { faker } from '@faker-js/faker';
import nock from 'nock';

let registrationPage: RegisterPage;

test.describe('DemoQA Registration and Login', () => {
    let username, email, password;

    test.beforeEach(async ({ page }) => {
        // Generate dynamic registration details
        username = faker.internet.userName();
        email = faker.internet.email();
        password = faker.internet.password();
    });
//         nock('https://www.google.com')
//   .post('/recaptcha/api/siteverify', (body) => {
//     // Check if the body contains expected parameters
//     return body.secret === 'your-secret-key' && body.response === 'mocked-captcha-response';
//   })
//   .reply(200, { success: true }); // Mock successful response
//     });

    test('Should register a new user', async ({ page }) => {
        registrationPage = new RegisterPage(page);    
        await registrationPage.navigate('/my-account/');
        // Fill in registration form
        //await registrationPage.waitForSelectors();
        await registrationPage.fillRegisterForm(username, email, password);
               
        // nock('https://captcha-service.example.com')
        // .post('/verify', { response: 'mocked-captcha-response' })
        // .reply(200, { success: true });

        //await page.waitForURL('https://formspree.io/forms');

        // Verify that the URL is as expected
        expect(page.url()).toBe('https://practice.sdetunicorns.com/my-account/'); 
        const hello = page.locator('text="Hello"');
        await expect(hello).toBeVisible();
    });

});

//   // test('[@error-check] should not register a new user with an existing username', async ({ page }) => {
//     //     const registrationPage = new RegistrationPage(page);
//         await registrationPage.navigate('https://demo.realworld.io/#/register');
      
//         // Fill in registration form with an existing username 
//         await registrationPage.fillRegistrationForm(username, email, password);
      
//         // Submit the registration form
//         await registrationPage.submitRegistration();
    
//         // Assertion to verify error message for existing username
//         const errorMessage =  await registrationPage.errortext();
//         //console.log("Retrieved error message:", errorMessage);
//         expect(errorMessage).toContain('email has already been taken'); // Verify error message contains specific text
      
//     //})
//  });
//     test('should login with registered user', async ({ page }) => {
//         const signinPage = new SignInPage(page);
//         await signinPage.navigate('https://demo.realworld.io/#/login');

//         // Fill in login form with the registered user's details
//         await signinPage.fillLoginForm(email, password);
//         await signinPage.submitLogin();

//         // Login test assertions (e.g., check if user is logged in)