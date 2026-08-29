import { test, expect, Locator } from '@playwright/test';

test('Overlapped Element link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the overlapped element link.
    await page.getByRole('link', { name: 'Overlapped Element' }).click();

    // Expects page to have a heading with the name of overlapped element.
    await expect(page.getByRole('heading', { name: 'Overlapped Element' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/overlapped
    await expect(page).toHaveURL('http://uitestingplayground.com/overlapped');
  });

  const id = 'name';
  const name = 'John';

  await test.step('Fill Values 1', async step => {
    // Input id
    await page.locator(`input#id`).fill(id);

    // Input name
    await page.locator('input#name').fill(name);
  });

  await test.step('Validate Values 1', async step => {
    // Validating id
    expect(await page.locator(`input#id`).inputValue()).toBe(id);

    // Validating name
    expect(await page.locator('input#name').inputValue()).not.toBe(name);
  });

  await test.step('Fill Values 2', async step => {
    // Double-click to ensure focus
    await page.locator('input#name').dblclick();

    // Input name
    await page.locator('input#name').fill(name);
  });

  await test.step('Validate Values 2', async step => {
    // Validating id
    expect(await page.locator(`input#id`).inputValue()).toBe(id);

    // Validating name
    expect(await page.locator('input#name').inputValue()).toBe(name);
  });

  await page.close();
});