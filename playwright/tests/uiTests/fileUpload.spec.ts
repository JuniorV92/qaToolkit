import { test, expect } from '@playwright/test';
import path from 'path';

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

  // Getting iframe
  const iframe = await page.frameLocator('[src="/static/upload.html"]');

  // Used file
  const fileName = 'ReadME.txt';
  const filePath = path.join('playwright/tests/uiTests/', fileName);

  await test.step('Upload file by drag and drop', async step => {
    if (iframe) {
      await console.log('iFrame detected...');
      const fileInput = await iframe.locator('input#browse');
      await expect(fileInput).toBeEnabled();
      await fileInput.setInputFiles(filePath);
      await expect(iframe.locator('p', { hasText: fileName })).toBeVisible();
      let success = await iframe.locator('div.success-file');
      await expect(success).toBeVisible();
    }
    else {
      await console.log('iFrame not detected...');
    }
  });

  await test.step('Removing file', async step => {
    // Finding remove X button
    const removeButton = await iframe.locator('div.file-actions svg');
    await removeButton.click();

    // Asserting file is removed
    await expect(iframe.locator('p', { hasText: fileName })).not.toBeVisible();
  });

  // Using the `Browse files`button instead of setting the file to the input
  await test.step('Upload file by Browse files button', async step => {
    const browseButton = await iframe.locator('.browse-btn');
    await expect(browseButton).toBeEnabled();
    await browseButton.click();
    const fileInput = await iframe.locator('input#browse');
    await expect(fileInput).toBeEnabled();
    await fileInput.setInputFiles(filePath);
    await expect(iframe.locator('p', { hasText: fileName })).toBeVisible();
    let success = await iframe.locator('div.success-file');
    await expect(success).toBeVisible();

    // Close the file popup by pressing Escape
    await page.keyboard.press('Escape');
  });

  await test.step('Removing file', async step => {
    // Finding remove X button
    const removeButton = await iframe.locator('div.file-actions svg');
    await removeButton.click();

    // Asserting file is removed
    await expect(iframe.locator('p', { hasText: fileName })).not.toBeVisible();
  });

  await page.close();
});