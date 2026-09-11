import { test, expect, Locator } from '@playwright/test';

test('Geo Location link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Disabled Input link.
    await page.getByRole('link', { name: 'Geo Location' }).click();

    // Expects page to have a heading with the name of Disabled Input.
    await expect(page.getByRole('heading', { name: 'Geo Location' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/geolocation
    await expect(page).toHaveURL('http://uitestingplayground.com/geolocation');
  });

  let locationState = page.locator('#location');
  let button = await page.getByRole('button', { name: 'Request Location' });

  await test.step('Validating location request', async step => {
    // Asserting inital state
    await expect(locationState).toHaveText('Not requested');

    // Listen for the alert dialog BEFORE triggering the click
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('Today is a working day.\nOr less likely a holiday.');
      // console.log("Dialog message: " + dialog.message());
      await dialog.accept();
    });

    // Clicking location request trigger button
    await button.click();

    // Asserting location state
    await expect(locationState).toHaveText('unavailable');
  });

  await page.close();
});