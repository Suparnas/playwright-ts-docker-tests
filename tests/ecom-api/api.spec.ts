import { test, expect } from "@playwright/test";

const apiUrl = "https://api.practicesoftwaretesting.com";

test("GET /products", async ({ request }) => {
    const response = await request.get(`${apiUrl}/products`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);

    // Validate the structure of the response
    expect(body).toHaveProperty('current_page');
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
    body.data.forEach(product => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('is_location_offer');
        expect(product).toHaveProperty('is_rental');
        expect(product).toHaveProperty('in_stock');
        expect(product).toHaveProperty('product_image');
        expect(product).toHaveProperty('category');
        expect(product).toHaveProperty('brand');
    });
});

test("GET /products/:id", async ({ request }) => {
    // First, get the list of products to extract a valid product ID
    const productsResponse = await request.get(`${apiUrl}/products`);
    expect(productsResponse.status()).toBe(200);
    const productsBody = await productsResponse.json();
    const productId = productsBody.data[0].id; // Use the first product ID

    const response = await request.get(`${apiUrl}/products/${productId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);

    // Validate the structure of the response
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('price');
    expect(body).toHaveProperty('is_location_offer');
    expect(body).toHaveProperty('is_rental');
    expect(body).toHaveProperty('in_stock');
    expect(body).toHaveProperty('product_image');
    expect(body).toHaveProperty('category');
    expect(body).toHaveProperty('brand');
});