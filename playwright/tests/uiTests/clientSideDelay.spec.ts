import { test, expect } from '@playwright/test';

test('Client Side Delay link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Client Side Delay link.
    await page.getByRole('link', { name: 'Client Side Delay' }).click();

    // Expects page to have a heading with the name of Client Side Delay.
    await expect(page.getByRole('heading', { name: 'Client Side Delay' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/clientdelay
    await expect(page).toHaveURL('http://uitestingplayground.com/clientdelay');
  });

  let heavyElement = page.locator('p', { hasText: 'Data calculated on the client side.' });
  await test.step('Confirm there is no AJAX data initially', async step => {
    // Expects button to be visible
    await expect(heavyElement).not.toBeVisible();
  });

  await test.step('Click the trigger button', async step => {
    let triggerButton = page.getByRole('button', { name: 'Button Triggering Client Side Logic' });

    // Click the button
    await triggerButton.click();
  });

  await test.step('Confirm AJAX data is loaded after clicking the trigger button', async step => {
    // Expects button to be visible
    await expect(heavyElement).toBeVisible({ timeout: 16000 });
  });

  await page.close();
});