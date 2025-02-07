import { Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
  readonly username = this.page.getByTestId("email");
  readonly password = this.page.getByTestId("password");
  readonly login = this.page.getByTestId("login-submit");
  readonly error = this.page.getByTestId("login-error");


  constructor(page: Page) {
    super(page);
  }

  async loginfill(username: string, password: string){
    await this.username.fill(username);
    await this.password.fill(password);
    await this.login.click();
  }

  async verifyLoginSuccess() {
    //await expect(this.page).toHaveURL(/account/);
  }

  async verifyLoginFailure() {
    await expect(this.error).toBeVisible();
    await expect(this.error).toHaveText("Invalid email or password");
  }
}