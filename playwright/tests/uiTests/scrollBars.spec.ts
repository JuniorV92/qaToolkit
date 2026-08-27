import { test, expect } from '@playwright/test';

test('ScrollBars link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the ScrollBars link.
    await page.getByRole('link', { name: 'ScrollBars' }).click();

    // Expects page to have a heading with the name of ScrollBars.
    await expect(page.getByRole('heading', { name: 'ScrollBars' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/scrollbars
    await expect(page).toHaveURL('http://uitestingplayground.com/scrollbars');
  });

  await test.step('Finding hiding button', async step => {
    let hidingButton = page.getByRole('button', { name: 'Hiding Button' });
    await hidingButton.scrollIntoViewIfNeeded();
    await expect(hidingButton).toBeVisible();
    await hidingButton.click();
  });

  await page.close();
});