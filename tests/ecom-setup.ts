import { test as base } from "@playwright/test";
import { LoginPage } from "../src/pages/login-page";

// Extend Playwright's test object with our setup
export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

// Login before each test (if needed)
test.beforeEach(async ({ page, loginPage }) => {
  await loginPage.navigate("/");
  await loginPage.loginfill("testuser", "password123");
  await loginPage.verifyLoginSuccess();
});
