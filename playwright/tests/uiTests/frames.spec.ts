import { test, expect, Locator } from '@playwright/test';

test('Frames link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Disabled Input link.
    await page.getByRole('link', { name: 'Frames' }).click();

    // Expects page to have a heading with the name of Disabled Input.
    await expect(page.getByRole('heading', { name: 'Frames' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/frames
    await expect(page).toHaveURL('http://uitestingplayground.com/frames');
  });

  // Buttons
  const buttons = [
    'Edit',
    'Submit',
    'Click me',
    'Primary',
  ];

  // Pressed button message
  let message = (label: string) => `Button pressed: ${label}`;

  // Getting iFrames
  const outerFrame = page.frameLocator('#frame-outer');
  const innerFrame = outerFrame.frameLocator('#frame-inner');
  const frames = [outerFrame, innerFrame];

  await test.step('Validating both frames are visible', async step => {
    // Validating titles
    await expect(outerFrame.locator('.frame-label')).toHaveText('Outer Frame (Level 1)');
    await expect(innerFrame.locator('.frame-label')).toHaveText('Inner Frame (Level 2)');
  });

  for (let frame of frames) {
    for (let button of buttons) {
      await test.step(`Validating button ${button} in frame ${frame}`, async step => {
        await expect(frame.getByRole('button', { name: button })).toBeVisible();

        // Click on button and validate message
        await frame.getByRole('button', { name: button }).click();
        await expect(frame.locator('#result')).toHaveText(message(button));
      });
    }
  };

  await page.close();
});