import { test, expect } from '@playwright/test';

test('Click link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Click link.
    await page.getByRole('link', { name: 'Click', exact: true }).click();

    // Expects page to have a heading with the name of Click.
    await expect(page.getByRole('heading', { name: 'Click' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/click
    await expect(page).toHaveURL('http://uitestingplayground.com/click');
  });

  let button = page.getByRole('button', { name: 'Button That Ignores DOM Click Event' });
  await test.step('Trying regular event click', async step => {
    // Expects button to be visible
    await expect(button).toBeVisible();

    // Click the button
    await button.dispatchEvent('click');

    // Button success doesnt exists
    await expect(page.locator('button[class*="success"]')).not.toBeVisible();
  });

  await test.step('Trying real click', async step => {
    // Click the button
    await button.click({ force: true });

    // Button success exists
    await expect(page.locator('button[class*="success"]')).toBeVisible({ timeout: 10000 });
  });

  await page.close();
});