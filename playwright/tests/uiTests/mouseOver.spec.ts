import { test, expect, Locator } from '@playwright/test';

test('Mouse Over link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the mouse over link.
    await page.getByRole('link', { name: 'Mouse Over' }).click();

    // Expects page to have a heading with the name of mouse over.
    await expect(page.getByRole('heading', { name: 'Mouse Over' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/mouseover
    await expect(page).toHaveURL('http://uitestingplayground.com/mouseover');
  });

  await test.step('No mouse over', async step => {
    const clickMeLink = await page.locator('a[title="Click me"]');

    // Checking if the link is visible
    await expect(clickMeLink).toBeVisible();

    // Clicking the link without mouse over
    await clickMeLink.click({ force: true });

    // Asserting count
    await expect(await page.locator('#clickCount')).toHaveText('1');
  });

  await page.close();
});