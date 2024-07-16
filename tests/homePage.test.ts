import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/homepage';

let homePage: HomePage;

test.describe('Home Page test', () => {
    test('should check for logo text', async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate('https://demo.realworld.io/#/');

        // get text
        const logoText = await homePage.getLogoText();

        // Assertions to verify the text
        expect(logoText).toBe("conduit");
});
});