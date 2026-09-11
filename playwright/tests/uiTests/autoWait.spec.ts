import { test, expect, Locator } from '@playwright/test';

test('Auto Wait link', async ({ page }) => {
  test.setTimeout(120_000);
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Disabled Input link.
    await page.getByRole('link', { name: 'Auto Wait' }).click();

    // Expects page to have a heading with the name of Disabled Input.
    await expect(page.getByRole('heading', { name: 'Auto Wait' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/autowait
    await expect(page).toHaveURL('http://uitestingplayground.com/autowait');
  });

  const checks = [
    (loc: Locator) => expect.soft(loc).toBeVisible(),
    (loc: Locator) => expect.soft(loc).toBeEnabled(),
    // (loc: Locator) => expect.soft(loc).toBeEditable(),
    (loc: Locator) => expect.soft(page.locator('#overlay')).toBeHidden(),
    (loc: Locator) => expect.soft(loc).not.toHaveCSS('width', '0px'),
  ];

  const appliedTime = [3, 5, 10];

  let statusMessage = await page.locator('#opstatus');

  const typeOfTarget = [
    'Button',
    'Input',
    'Textarea',
    'Select',
    'Label',
  ];

  for (let target of typeOfTarget) {

    // Select target type from select list
    await page.locator('#element-type').selectOption({ label: target });

    for (let time of appliedTime) {

      let testStep = `Validate ${target} with ${time} seconds delay`;
      // console.log(testStep);
      await page.locator(`#applyButton${time}`).click();

      await test.step(testStep, async step => {

        for (let i = 0; i < checks.length; i++) {
          await checks[i](await page.locator('#target'));
        }

        await expect(statusMessage).toHaveText(`Target element settings applied for ${time} seconds.`);
        await page.waitForTimeout(time * 800);
        await expect(statusMessage).toHaveText(`Target element state restored.`, { timeout: time * 1000 })

      });
    }
  }

  // await page.close();
});