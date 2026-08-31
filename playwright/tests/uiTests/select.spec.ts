import { test, expect, Locator } from '@playwright/test';

test('Select link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect.soft(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Select link.
    await page.getByRole('link', { name: 'Select', exact: true }).click();

    // Expects page to have a heading with the name of Select.
    await expect.soft(page.getByRole('heading', { name: 'Select' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/select
    await expect.soft(page).toHaveURL('http://uitestingplayground.com/select');

    await page.waitForLoadState('domcontentloaded');
  });

  await test.step('Validating single-select', async step => {
    const singleSelect = await page.locator('#selectLanguage');
    await singleSelect.selectOption({ value: 'java' });

    await expect.soft(singleSelect).toHaveValue('java');
    await expect.soft(page.locator('#statusLanguage')).toContainText('java');
  });

  await test.step('Validating non-breaking spaces', async step => {
    const singleSelect = await page.locator('#selectCity');
    await singleSelect.selectOption('New York');

    await expect.soft(singleSelect).toHaveValue('nyc');
    await expect.soft(page.locator('#statusCity')).toContainText('New York');
  });

  await test.step('Validating select by value', async step => {
    const singleSelect = await page.locator('#selectProduct');
    await singleSelect.selectOption({ value: 'v1.0' });

    await expect.soft(singleSelect).toHaveValue('v1.0');
    await expect.soft(page.locator('#statusProduct')).toContainText('v1.0');
  });

  await test.step('Validating multi-select', async step => {
    const multiSelect = await page.locator('#selectColors');
    await multiSelect.selectOption(['Red', 'Green', 'Blue']);

    await expect.soft(multiSelect).toHaveValue('red');
    await expect.soft(page.locator('#statusColors')).toContainText('Red');
    await expect.soft(page.locator('#statusColors')).toContainText('Green');
    await expect.soft(page.locator('#statusColors')).toContainText('Blue');
  });

  await test.step('Validating multi-select preselected', async step => {
    const multiSelect = await page.locator('#selectFruits');

    await expect.soft(multiSelect).toHaveValue('apple');
    await expect.soft(page.locator('#statusFruits')).toContainText('Apple');
    await expect.soft(page.locator('#statusFruits')).toContainText('Cherry');
    await expect.soft(page.locator('#statusFruits')).toContainText('Grape');
  });

  await page.close();
});