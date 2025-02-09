import { test} from "@playwright/test";
import { RegistrationPage } from "../../src/pages/registration-page";
import { registerData } from "../../utils/test-data.ts";

test.describe("Registration Tests", () => {
    let registrationPage: RegistrationPage;
      
    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        await registrationPage.navigate('/auth/register');
      });
    
      registerData.forEach(({ description, firstName, lastName, dob, address, postcode, city, state, country, phone, email, password, expectedResult }) => {
        test(description, async ({ page }) => {
          await registrationPage.register(firstName, lastName, dob, address, postcode, city, state, country, phone, email, password);
          if (expectedResult === 'success') {
            await registrationPage.verifyRegistrationSuccess();
          } else {
            await registrationPage.verifyRegistrationFailure();
          }
        });
      });
    });
