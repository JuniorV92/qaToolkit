import { test, expect } from '@playwright/test';

test('Dynamic ID link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Dynamic ID link.
    await page.getByRole('link', { name: 'Dynamic ID' }).click();

    // Expects page to have a heading with the name of Dynamic ID.
    await expect(page.getByRole('heading', { name: 'Dynamic ID' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/dynamicid
    await expect(page).toHaveURL('http://uitestingplayground.com/dynamicid');
  });

  await test.step('Click button with dynamic id', async step => {
    let button = page.getByRole('button', { name: 'Button with Dynamic ID' });

    // Expects button to be visible
    await expect(button).toBeVisible();

    // Click the button
    await button.click();
  });

  await page.close();
});