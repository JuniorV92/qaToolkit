import { test, expect, Locator } from '@playwright/test';

test('Scroll To Click link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Scroll To Click link.
    await page.getByRole('link', { name: 'Scroll To Click' }).click();

    // Expects page to have a heading with the name of Scroll To Click.
    await expect(page.getByRole('heading', { name: 'Scroll To Click' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/scrolltoclick
    await expect(page).toHaveURL('http://uitestingplayground.com/scrolltoclick');
  });

  await test.step('Validating Case 1 - Page Scroll', async step => {
    // Finding button
    let case1Btn = await page.locator('#scrollTarget1');

    // Clicking it
    await case1Btn.click();

    // Asserting 
    await expect(case1Btn).toHaveText('Clicked!');
  });

  await test.step('Validating Case 2 - Container Scroll', async step => {
    // Finding button
    let case2Btn = await page.locator('#scrollTarget2');

    // Clicking it
    await case2Btn.click();

    // Asserting 
    await expect(case2Btn).toHaveText('Clicked!');
  });

  await test.step('Validating Case 3 - Nested Scroll (Parent + Child)', async step => {
    // Finding button
    let case3Btn = await page.locator('#scrollTarget3');

    // Clicking it
    await case3Btn.click();

    // Asserting 
    await expect(case3Btn).toHaveText('Clicked!');
  });

  await test.step('Validating Case 4 - Hover to Reveal', async step => {
    // Finding hover element
    await page.locator('#targetRow4').hover();

    // Finding button
    let case4Btn = await page.locator('#scrollTarget4');

    // Clicking it
    await case4Btn.click();

    // Asserting 
    await expect(case4Btn).toHaveText('Clicked!');
  });

  await test.step('Validating final progress', async step => {
    await expect(await page.locator('#progressText')).toContainText('All buttons clicked!');
  });

  await page.close();
});