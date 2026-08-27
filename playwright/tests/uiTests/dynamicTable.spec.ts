import { test, expect, Locator } from '@playwright/test';

test('Dynamic Table link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Dynamic Table link.
    await page.getByRole('link', { name: 'Dynamic Table' }).click();

    // Expects page to have a heading with the name of Dynamic Table.
    await expect(page.getByRole('heading', { name: 'Dynamic Table' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/dynamictable
    await expect(page).toHaveURL('http://uitestingplayground.com/dynamictable');
  });

  let headers: string[] = [];
  let table: Locator;
  await test.step('Reading table', async step => {
    // Table element
    table = await page.locator('div[role="table"]');

    // Columnn headers
    headers = await table.locator('[role="columnheader"]').allTextContents();
  });

  await test.step('Finding Chrome CPU row', async step => {
    // Finding the Chrome index on headers
    const cpuIndex = headers.indexOf('CPU');

    // ✅ Filter locators directly with Playwright
    const chromeRow = table.locator('[role="row"]', { hasText: 'Chrome' });
    const cpuValue = await chromeRow.locator('[role="cell"]').nth(cpuIndex).textContent();

    const yellowLabel = await page.locator('.bg-warning').textContent();
    expect(yellowLabel?.trim()).toEqual(`Chrome CPU: ${cpuValue}`);
  });

  await page.close();
});