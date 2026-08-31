import { test, expect } from '@playwright/test';

test('Animated Button link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Animated Button link.
    await page.getByRole('link', { name: 'Animated Button' }).click();

    // Expects page to have a heading with the name of Animated Button.
    await expect(page.getByRole('heading', { name: 'Animated Button' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/animation
    await expect(page).toHaveURL('http://uitestingplayground.com/animation');
  });

  const message = await page.locator('#opstatus');
  let movingTarget = await page.locator('#movingTarget');

  await test.step('Click Start button', async step => {
    // Assert moving target does not have spin class
    await expect(movingTarget).not.toContainClass('spin');

    // Finding Start button
    const startButton = await page.locator('#animationButton');
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Asserting running message
    await expect(message).toHaveText('Animating the button...');

    // Assert moving target have the spin class
    await expect(movingTarget).toContainClass('spin');
  });

  await test.step('Animation done', async step => {
    // While loop to wait for the animation to finish based on the message changing to 'Animation done'.
    await expect(message).toHaveText('Animation done', { timeout: 8000 });
    await expect(movingTarget).not.toContainClass('spin');
  });

  await test.step('Clicking movint target', async step => {
    await movingTarget.click();
    await expect(message).toHaveText(`Moving Target clicked. It's class name is 'btn btn-primary'`);
  });

  await page.close();
});