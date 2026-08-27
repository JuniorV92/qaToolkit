import { test, expect } from '@playwright/test';

test('Load Delay link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Load Delay link.
    await page.getByRole('link', { name: 'Load Delay' }).click();

    // Expects page to have a heading with the name of Load Delay.
    await expect(page.getByRole('heading', { name: 'Load Delay' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/loaddelay
    await expect(page).toHaveURL('http://uitestingplayground.com/loaddelay');
  });

  await test.step('Click button that will load after a delay', async step => {
    let button = page.getByRole('button', { name: 'Button Appearing After Delay' });

    // Expects button to be visible
    await expect(button).toBeVisible();

    // Click the button
    await button.click();
  });

  await page.close();
});