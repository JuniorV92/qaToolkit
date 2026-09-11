import { test, expect, Locator } from '@playwright/test';

test('Visibility link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Visibility link.
    await page.getByRole('link', { name: 'Visibility' }).click();

    // Expects page to have a heading with the name of Visibility.
    await expect(page.getByRole('heading', { name: 'Visibility' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/visibility
    await expect(page).toHaveURL('http://uitestingplayground.com/visibility');
  });

  await test.step('Previous check up', async step => {
    //Opacity 0
    expect.soft(page.locator('#transparentButton')).toBeEnabled();

    //Removed
    expect.soft(page.locator('.btn-danger')).toBeVisible();

    // Zero Width
    expect.soft(page.locator('.btn-warning')).toContainText('Zero Width');

    //Overlapped
    expect.soft(page.locator('#overlappedButton')).toContainText('Overlapped');

    //Visibility Hidden
    expect.soft(page.locator('#invisibleButton')).toContainText('Visibility Hidden');

    //Display None
    expect.soft(page.locator('#notdisplayedButton')).toContainText('Display None');

    //Offscreen
    expect.soft(page.locator('#offscreenButton')).toContainText('Offscreen');
  });

  // Click the Hide button
  await page.locator('#hideButton').click();

  await test.step('After hide check up', async step => {
    //Opacity 0
    await expect.soft(page.locator('#transparentButton')).toHaveCSS('opacity', '0');

    //Removed
    await expect.soft(page.locator('.btn-danger')).not.toBeVisible();

    // Zero Width
    await expect.soft(page.locator('.btn-warning')).toHaveCSS('width', '0px');

    //Overlapped
    await expect.soft(page.locator('#overlappedButton')).toBeVisible();

    //Visibility Hidden
    await expect.soft(page.locator('#invisibleButton')).toBeHidden();

    //Display None
    await expect.soft(page.locator('#notdisplayedButton')).toBeHidden();

    //Offscreen
    await expect.soft(page.locator('#offscreenButton')).toHaveCSS('position', 'absolute');
  });

  await page.close();
});