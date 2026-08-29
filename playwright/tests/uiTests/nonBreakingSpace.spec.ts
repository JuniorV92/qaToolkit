import { test, expect, Locator } from '@playwright/test';

test('Non-Breaking Space link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the non-breaking space link.
    await page.getByRole('link', { name: 'Non-Breaking Space' }).click();

    // Expects page to have a heading with the name of non-breaking space.
    await expect(page.getByRole('heading', { name: 'Non-Breaking Space' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/nbsp
    await expect(page).toHaveURL('http://uitestingplayground.com/nbsp');
  });

  await test.step('Find Non-Breaking Space Button', async step => {
    const textOnButton = 'My Button';

    // Finding button
    let button = page.locator('button:has-text("My Button")').last();

    // Click button
    await button.click();

  });

  await page.close();
});