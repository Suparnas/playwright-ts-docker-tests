import { Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class RegistrationPage extends BasePage {
  readonly firstName = this.page.getByTestId("first-name");
  readonly lastName = this.page.getByTestId("last-name");
  readonly dateOfBirth = this.page.getByTestId("dob");
  readonly address = this.page.getByTestId("address");
  readonly postcode = this.page.getByTestId("postcode");
  readonly city = this.page.getByTestId("city");
  readonly state = this.page.getByTestId("state");
  readonly country = this.page.getByTestId("country");
  readonly phone = this.page.getByTestId("phone");
  readonly email = this.page.getByTestId("email");
  readonly passwordInput = this.page.getByTestId("password");
  readonly registerButton = this.page.getByTestId("register-submit");
  readonly error = this.page.getByTestId("register-error");


  constructor(page: Page) {
    super(page);
  }

  async fillFirstName(fname: string) {
    await this.firstName.fill(fname);
  }

  async fillLastName(lname: string) {
    await this.lastName.fill(lname);
  }

  async fillDateOfBirth(dob: string) {
    await this.dateOfBirth.fill(dob);
  }

  async fillAddress(address: string) {
    await this.address.fill(address);
  }

  async fillPostcode(postcode: string) {
    await this.postcode.fill(postcode);
  }

  async fillCity(city: string) {
    await this.city.fill(city);
  }

  async fillState(state: string) {
    await this.state.fill(state);
  }

  async selectCountry(country: string) {
    await this.country.selectOption({ label: country });
  }

  async fillPhone(phone: string) {
    await this.phone.fill(phone);
  }

  async fillEmail(email: string) {
    await this.email.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  async register(
    fname: string,
    lname: string,
    dob: string,
    address: string,
    postcode: string,
    city: string,
    state: string,
    country: string,
    phone: string,
    email: string,
    password: string
  ) {
    await this.fillFirstName(fname);
    await this.fillLastName(lname);
    await this.fillDateOfBirth(dob);
    await this.fillAddress(address);
    await this.fillPostcode(postcode);
    await this.fillCity(city);
    await this.fillState(state);
    await this.selectCountry(country);
    await this.fillPhone(phone);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickRegisterButton();
  }

  async verifyRegistrationSuccess() {
    await expect(this.page).toHaveURL("/auth/register");
  }

  async verifyRegistrationFailure() {
    await expect(this.error).toHaveText("A customer with this email address already exists.");
  }
}