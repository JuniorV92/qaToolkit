import { test, expect } from '@playwright/test';

test('Class Attribute', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Class Attribute link.
    await page.getByRole('link', { name: 'Class Attribute' }).click();

    // Expects page to have a heading with the name of Class Attribute.
    await expect(page.getByRole('heading', { name: 'Class Attribute' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/classattr
    await expect(page).toHaveURL('http://uitestingplayground.com/classattr');
  });

  await test.step('Click button with class attribute', async step => {
    let button = page.locator('button[class*="primary"]');

    // Expects button to be visible
    await expect(button).toBeVisible();

    // Listen for the alert dialog BEFORE triggering the click
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('Primary button pressed');
      console.log("Dialog message: " + dialog.message());
      await dialog.accept();
    });

    // Click the button
    await button.click();
  });

  await page.close();
}); 