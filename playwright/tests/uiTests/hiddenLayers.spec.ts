import { test, expect } from '@playwright/test';

test('Hidden Layers link', async ({ page, browser }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Dynamic ID link.
    await page.getByRole('link', { name: 'Hidden Layers' }).click();

    // Expects page to have a heading with the name of Dynamic ID.
    await expect(page.getByRole('heading', { name: 'Hidden Layers' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/dynamicid
    await expect(page).toHaveURL('http://uitestingplayground.com/hiddenlayers');
  });

  await test.step('Click green button', async step => {
    let greenButton = page.locator('button[id="greenButton"]');

    // Expects button to be visible
    await expect(greenButton).toBeVisible();

    // Click the button
    await greenButton.click();

    // Assert second click fails due to the overlay layer covering the button
    await page.waitForTimeout(1000);
    await expect(greenButton.click({ timeout: 2000 })).rejects.toThrow();
  });

  await test.step('Click blue button', async step => {
    let blueButton = page.locator('button[id="blueButton"]');

    // Expects button to be visible
    await expect(blueButton).toBeVisible();

    // Click the button
    await blueButton.click();
  });

  await page.close();
});