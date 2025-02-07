import { test, expect } from "@playwright/test"  // Import the custom test setup
import { LoginPage } from "../../src/pages/login-page";
import { loginData } from "../../utils/test-data.ts";

test.describe("Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate("/auth/login");
  });

  loginData.forEach(({ description, username, password, expectedResult }) => {
    test(description, async ({ page }) => {
      await loginPage.loginfill(username, password);
      if (expectedResult === "success") {
        await loginPage.verifyLoginSuccess();
      } else {
        await loginPage.verifyLoginFailure();
      }
    });
  });
});