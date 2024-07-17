import { test, expect } from '@playwright/test';

test.describe('test TUIO Create Transfer', () => {

test('Create Transfer', async ({ page }) => {
  await page.goto('https://qa.interview.tuio.dev/?page=1&limit=25&sortName=id&sortDirection=desc');
  await page.getByText('Create Transfer').click();
  await expect(page.locator('.mat-dialog-title')).toHaveText("Add transfer");
  await page.getByLabel('Details').fill('Monthly Subscription 1');
  await page.getByLabel('price').fill('$10.00');
  await page.locator('.mat-radio-container').nth(1).check();
  await page.getByRole('button', { name: 'Add'}).click();
  await expect(page.locator('td.left.fs-list-col.ng-star-inserted').nth(2)).toHaveText('Monthly Subscription 1');
  await expect(page.locator('td.left.fs-list-col.ng-star-inserted').nth(1)).toHaveText(' Jul 17, 2024 ');
  });
});
