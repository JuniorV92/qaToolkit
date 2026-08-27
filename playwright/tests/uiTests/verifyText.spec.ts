import { test, expect, Locator } from '@playwright/test';

test('Verify Text link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Dynamic Table link.
    await page.getByRole('link', { name: 'Verify Text' }).click();

    // Expects page to have a heading with the name of Dynamic Table.
    await expect(page.getByRole('heading', { name: 'Verify Text' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/verifytext
    await expect(page).toHaveURL('http://uitestingplayground.com/verifytext');
  });

  await test.step('Finding Text', async step => {
    let text = "Welcome UserName!";

    // Finding element
    await expect(page.locator(`span:text("${text}")`)).toBeVisible();
  });

  await page.close();
});