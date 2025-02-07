import { test, expect } from '@playwright/test';

test.describe("Home page with no auth", () => {

    test.beforeEach(async ({page}) => {
      await page.goto("https://practicesoftwaretesting.com");
    });

    test("visual test", async ({page}) => {
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot("home-page-no-auth.png", {mask: [page.getByTitle("Practice Software Testing - Toolshop")]});
    });

    test("check sign in", async ({page}) => {
      //Ensure the sign-in link is present
      await expect(page.getByTestId('nav-sign-in')).toHaveText("Sign in");
    });

    test("validate page title", async ({page}) => {
      await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
    });

    test("validate product count displayed on page", async ({page}) => {
      const productGrid = page.locator(".col-md-9")
      await expect(productGrid.getByRole("link")).toHaveCount(9);
      expect(await productGrid.getByRole("link").count()).toBe(9);
    });

    test("validate search and result for Thor Hammer", async ({page}) => {
      const productGrid = page.locator(".col-md-9")
      await page.getByTestId("search-query").fill("Thor Hammer");
      await page.getByTestId("search-submit").click();
      await expect(productGrid.getByRole("link")).toHaveCount(1);
      await expect(page.getByAltText("Thor Hammer")).toBeVisible();
      await expect(page.getByTestId("product-name")).toHaveText("Thor Hammer");
    });

});

test.describe("Home page customer 01  auth", () => {
    test.use({storageState: ".auth/customer01.json"});
    test.beforeEach(async ({page}) => {
      await page.goto("https://practicesoftwaretesting.com"); 
    });

    test("visual test", async ({page}) => {
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot("home-page-customer01.png",{mask: [page.getByTitle("Practice Software Testing - Toolshop")]});
    });

    test("Check Customer 01 is signed in", async ({page}) => {
      await expect(page.getByTestId('nav-sign-in')).not.toBeVisible();
      await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
    });

    test("Check Customer item added to shopping cart and buy now and pay letter", async ({page}) => {
      await page.getByText("Bolt Cutters", { exact: true }).click();
      await page.getByTestId("add-to-cart").click();
      await expect(page.getByTestId("cart-quantity")).toHaveText("1");
      await page.getByTestId('nav-cart').click();
      await expect(page.getByTestId('product-title')).toContainText('Bolt Cutters');
      await page.getByTestId('proceed-1').click();
      await page.getByTestId('proceed-2').click();
      await page.getByTestId('address').fill('35 Tree St.');
      await page.getByTestId('city').fill('Virginia');
      await page.getByTestId('state').fill('Ohio');  
      await page.getByTestId('country').fill('USA');   
      await page.getByTestId('postcode').fill('87654');     
      await expect(page.getByTestId('proceed-3')).toBeEnabled();
      await page.getByTestId('proceed-3').click();
      await expect(
        page.locator('.step-indicator').filter({ hasText:'3'})
      ).toHaveCSS('background-color','rgb(51, 153, 51)')      
      await page.getByTestId('payment-method').selectOption('cash-on-delivery');
      await page.getByTestId('finish').click();
      await expect(page.locator('.help-block')).toHaveText('Payment was successful');

      await test.step("visual test", async () => {
      await expect(page).toHaveScreenshot("checkout-page-customer01.png",{mask: [page.getByTitle("Practice Software Testing - Toolshop")]});
    });
  });
});

test.describe("API tests", () => {
  test("GET /products/{id}", async ({ request }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const getProductResponse = await request.get(apiUrl+"/products/search?q=Bolt%Cutters");
    expect(getProductResponse.status()).toBe(200);
    const productBody = await getProductResponse.json();
    const productID = productBody.data[0].id;
    const response = await request.get(apiUrl+"/products/"+productID);
    expect(response.status()).toBe(200);
    const body = await response.json();
    await expect(body.in_stock).toBe(true);
    await expect(body.is_rental).toBe(false);
    await expect(body.price).toEqual(48.41);
    await expect(body.in_stock).toBe(true);
    await expect(body.is_location_offer).toBe(true);
    await expect(body.product_image.title).toBe("Bolt cutters");

  });
});