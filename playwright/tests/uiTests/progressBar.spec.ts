import { test, expect, Locator } from '@playwright/test';

test('Progress Bar link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Progress Bar link.
    await page.getByRole('link', { name: 'Progress Bar' }).click();

    // Expects page to have a heading with the name of Progress Bar.
    await expect(page.getByRole('heading', { name: 'Progress Bar' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/progressbar
    await expect(page).toHaveURL('http://uitestingplayground.com/progressbar');
  });

  await test.step('Press Start and stop at 75%', async step => {
    let startButton = page.locator('#startButton');
    let stopButton = page.locator('#stopButton');
    let progressBar = page.locator('#progressBar');

    await startButton.click();

    const timeout = 30000;
    const startTime = Date.now();

    // Wait while not 75% and click stop button
    while (!(await progressBar.textContent())?.includes('75%')) {
      if (Date.now() - startTime > timeout) {
        throw new Error(`Timed out after ${timeout / 1000} seconds waiting for progress bar to reach 75%`);
      }
    }

    await stopButton.click();

    let result = await page.locator('#result').textContent();
    expect(result).not.toContain("n/a");
    expect(result).toContain("Result: 0, duration:");
  });

  await page.close();
});