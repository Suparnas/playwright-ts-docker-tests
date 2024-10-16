import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

let homePage: HomePage;

test.describe('Home Page test', () => {
    test('should check for logo text', async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate('https://formspree.io/');

        // get text
        const logoText = await homePage.getLogoText();

        // Assertions to verify the text
        expect(logoText).toBe("The form solution for any developer");
  });
});