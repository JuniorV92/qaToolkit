import { test, expect, Locator } from '@playwright/test';

test('Alerts link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Alerts link.
    await page.getByRole('link', { name: 'Alerts' }).click();

    // Expects page to have a heading with the name of Alerts.
    await expect(page.getByRole('heading', { name: 'Alerts' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/alerts
    await expect(page).toHaveURL('http://uitestingplayground.com/alerts');
  });

  await test.step('Intercept Alert pop up', async step => {
    // Listen for the alert dialog BEFORE triggering the click
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('Today is a working day.\nOr less likely a holiday.');
      // console.log("Dialog message: " + dialog.message());
      await dialog.accept();
    });

    // Click the Alert button
    await page.getByRole('button', { name: 'Alert' }).click();
  });

  await test.step('Intercept Confirmation pop up', async step => {
    // Listen for the alert dialog BEFORE triggering the click
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('Today is Friday.\nDo you agree?');
      // console.log("Dialog message: " + dialog.message());
      await dialog.accept();
    });

    // Click the Confirmation button
    await page.getByRole('button', { name: 'Confirm' }).click();
  });

  await test.step('Intercept Confirmation pop up 2', async step => {
    // Listen for the second alert dialog BEFORE triggering the click
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('Yes');
      // console.log("Dialog message: " + dialog.message());
      await dialog.accept();
    });

    await page.waitForTimeout(3000);
  });

  await test.step('Intercept Prompt pop up', async step => {
    // Listen for the alert dialog BEFORE triggering the click
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe(`Choose "cats" or 'dogs'.\nEnter your value:`);
      // console.log("Dialog message: " + dialog.message());
      await dialog.accept('cats');
    });

    // Click the Prompt button
    await page.getByRole('button', { name: 'Prompt' }).click();
  });

  await test.step('Intercept Prompt confirmation pop up', async step => {
    // Listen for the second alert dialog BEFORE triggering the click
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('User value: cats');
      // console.log("Dialog message: " + dialog.message());
      await dialog.accept();
    });

    await page.waitForTimeout(3000);
  });

  await page.close();
});