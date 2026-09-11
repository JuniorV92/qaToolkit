import { test, expect } from '@playwright/test';

test('AJAX Data link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the AJAX Data link.
    await page.getByRole('link', { name: 'AJAX Data' }).click();

    // Expects page to have a heading with the name of AJAX Data.
    await expect(page.getByRole('heading', { name: 'AJAX Data' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/ajax
    await expect(page).toHaveURL('http://uitestingplayground.com/ajax');
  });

  await test.step('Confirm there is no AJAX data initially', async step => {
    let ajaxData = page.locator('p', { hasText: 'Data loaded with AJAX get request.' });

    // Expects button to be visible
    await expect(ajaxData).not.toBeVisible();
  });

  await test.step('Click the trigger button', async step => {
    let triggerButton = page.getByRole('button', { name: 'Button Triggering AJAX Request' });

    // Click the button
    await triggerButton.click();
  });

  await test.step('Confirm AJAX data is loaded after clicking the trigger button', async step => {
    let ajaxData = page.locator('p', { hasText: 'Data loaded with AJAX get request.' });

    // Expects button to be visible
    await expect(ajaxData).toBeVisible({ timeout: 30000 });
  });

  await page.close();
});