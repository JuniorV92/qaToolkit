import { test, expect } from '@playwright/test';

test('Disabled Input link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Disabled Input link.
    await page.getByRole('link', { name: 'Disabled Input' }).click();

    // Expects page to have a heading with the name of Disabled Input.
    await expect(page.getByRole('heading', { name: 'Disabled Input' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/disabledinput
    await expect(page).toHaveURL('http://uitestingplayground.com/disabledinput');
  });

  let input = await page.locator('#inputField');
  let statusMessage = await page.locator('#opstatus');

  await test.step('Validate initial state, enabled', async step => {
    await expect(input).toBeEnabled();
    await expect(input).toBeVisible();

    // Status message initially empty
    await expect(statusMessage).toContainText('---');
  });

  await test.step('Validate disabled state after click', async step => {
    await page.locator('#enableButton').click();

    await expect(input).toBeDisabled();
    await expect(input).toBeVisible();

    // Assert status message is running
    await expect(statusMessage).toContainText('Input Disabled');
  });

  await test.step('Validate enabled state again', async step => {
    // Wait for delay of 5 seconds
    await page.waitForTimeout(5100);

    await expect(input).toBeEnabled();
    await expect(input).toBeVisible();

    // Assert status message is running
    await expect(statusMessage).toContainText('Input Enabled');
  });

  await page.close();
});