import { test, expect, Locator } from '@playwright/test';

test('File Upload link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the File Upload link.
    await page.getByRole('link', { name: 'File Upload' }).click();

    // Expects page to have a heading with the name of File Upload.
    await expect(page.getByRole('heading', { name: 'File Upload' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/upload
    await expect(page).toHaveURL('http://uitestingplayground.com/upload');
  });

  await test.step('Upload file by drag and drop', async step => {
    const fileInput = page.locator('input[type="file"]');
    const filePath = 'ReadME.txt';
    await fileInput.setInputFiles(filePath);
    await expect(page.locator('text=' + filePath.split('\\').pop()!)).toBeVisible();
  });

  // await page.close();
});