import { test, expect } from '@playwright/test';

test('Text Input link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Text Input link.
    await page.getByRole('link', { name: 'Text Input' }).click();

    // Expects page to have a heading with the name of Text Input.
    await expect(page.getByRole('heading', { name: 'Text Input' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/textinput
    await expect(page).toHaveURL('http://uitestingplayground.com/textinput');
  });

  let originalButton = page.getByRole('button', { name: "Button That Should Change it's Name Based on Input Value" });

  await test.step('Text emulating real keyboard events', async step => {
    let jsTyping = "JS typing";
    // Type text into the input
    await page.getByPlaceholder('MyButton').evaluate((el: HTMLInputElement, text) => {
      el.value = text;
    }, jsTyping);

    // Click the button
    await originalButton.click();

    // Button success exists
    await expect(page.locator('button[class*="success"]', { hasText: jsTyping })).not.toBeVisible();
  });

  await test.step('Text with DOM event', async step => {
    // Expects button to be visible
    await expect(originalButton).toBeVisible();

    let newButtonText = "Fill method";

    // Type text into the input
    await page.getByPlaceholder('MyButton').fill(newButtonText);
    await originalButton.click();

    // Button success doesnt exists
    await expect(page.locator('button[class*="primary"]', { hasText: newButtonText })).toBeVisible();
  });

  await page.close();
});