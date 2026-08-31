import { test, expect, Locator } from '@playwright/test';

test('Clear Input link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Clear Input link.
    await page.getByRole('link', { name: 'Clear Input' }).click();

    // Expects page to have a heading with the name of Clear Input.
    await expect(page.getByRole('heading', { name: 'Clear Input' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/clearinput
    await expect(page).toHaveURL('http://uitestingplayground.com/clearinput');
  });

  await test.step('Validating Input text type', async step => {
    const text = await page.locator('#clearInput');
    await text.clear();
    await expect.soft(text).toHaveValue("");
  });

  await test.step('Validating Textarea type', async step => {
    const textarea = await page.locator("#clearTextarea");
    await textarea.clear();
    await expect.soft(textarea).toHaveValue("");
  });

  await test.step('Validating Input password type', async step => {
    const password = await page.locator("#clearPassword");
    await password.clear();
    await expect.soft(password).toHaveValue("");
  });

  await test.step('Validating Input email type', async step => {
    const email = await page.locator("#clearEmail");
    await email.clear();
    await expect.soft(email).toHaveValue("");
  });

  await test.step('Validating Input number type', async step => {
    const number = await page.locator("#clearNumber");
    await number.clear();
    await expect.soft(number).toHaveValue("");
  });

  await test.step('Validating Input search type', async step => {
    const search = await page.locator("#clearSearch");
    await search.clear();
    await expect.soft(search).toHaveValue("");
  });

  await test.step('Validating Input url type', async step => {
    const url = await page.locator("#clearUrl");
    await url.clear();
    await expect.soft(url).toHaveValue("");
  });

  await test.step('Validating Input tel type', async step => {
    const tel = await page.locator("#clearTel");
    await tel.clear();
    await expect.soft(tel).toHaveValue("");
  });

  await test.step('Validating Content editable div type', async step => {
    const content = await page.locator("#clearContentEditable");
    await content.clear();
    await expect.soft(content).toHaveText("");
  });

  await test.step('Validating All cleared message', async step => {
    await expect(page.locator('#opstatus')).toHaveText("All fields are cleared!");
  });

  await page.close();
});