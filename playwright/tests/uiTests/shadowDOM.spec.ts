import { test, expect } from '@playwright/test';

test('Shadow DOM link', async ({ page }) => {
  await test.step('Navigate to URL', async () => {
    await page.goto('http://uitestingplayground.com/');
    await expect(page).toHaveTitle(/UI Test Automation Playground/);
    await page.getByRole('link', { name: 'Shadow DOM' }).click();
    await expect(page.getByRole('heading', { name: 'Shadow DOM' })).toBeVisible();
    await expect(page).toHaveURL('http://uitestingplayground.com/shadowdom');
  });

  await test.step('Setup clipboard mock', async () => {
    // Mock clipboard API for HTTP context
    await page.evaluate(() => {
      // Create clipboard object if it doesn't exist
      if (!navigator.clipboard) {
        (navigator as any).clipboard = {};
      }

      // Mock writeText to capture what's being copied
      (navigator.clipboard as any).writeText = (text: string) => {
        (window as any).__copiedText = text;
        return Promise.resolve();
      };

      // Mock readText to return what we captured
      (navigator.clipboard as any).readText = () => {
        return Promise.resolve((window as any).__copiedText || '');
      };

      // Also capture execCommand('copy') as fallback
      const originalExecCommand = document.execCommand;
      document.execCommand = (command: string) => {
        if (command === 'copy') {
          const selectedText = window.getSelection()?.toString() || '';
          (window as any).__copiedText = selectedText;
        }
        return originalExecCommand.call(document, command);
      };
    });
  });

  await test.step('Generate and copy', async () => {
    await page.locator('#buttonGenerate').click();
    await page.locator('#buttonCopy').click();
    await page.waitForTimeout(200); // Give time for async operations
  });

  await test.step('Verify copy functionality', async () => {
    // Get the captured clipboard content
    const clipboardText = await page.evaluate(() => (window as any).__copiedText);

    // Get the input value from shadow DOM
    const inputValue = await page.evaluate(() => {
      for (const el of document.querySelectorAll('*')) {
        const shadow = (el as any).shadowRoot;
        if (shadow) {
          const input = shadow.querySelector('#editField') as HTMLInputElement;
          if (input) return input.value;
        }
      }
      return null;
    });

    // Assertions
    expect(clipboardText, 'Clipboard should not be empty').not.toBeNull();
    expect(clipboardText, 'Clipboard should not be empty string').not.toBe('');
    expect(inputValue, 'Input value should exist').not.toBeNull();

    // The key assertion: clipboard should match the input value
    expect(clipboardText).toBe(inputValue);

    // await console.log(`Clipboard: ${clipboardText}`);
    // await console.log(`Input Value: ${inputValue}`);

    // await console.log(`✅ Copy function works! Copied: ${clipboardText}`);
  });

  await page.close();
});