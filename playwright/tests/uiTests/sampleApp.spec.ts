import { test, expect, Locator } from '@playwright/test';

test('Sample App link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the Sample App link.
    await page.getByRole('link', { name: 'Sample App' }).click();

    // Expects page to have a heading with the name of Sample App.
    await expect(page.getByRole('heading', { name: 'Sample App' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/sampleapp
    await expect(page).toHaveURL('http://uitestingplayground.com/sampleapp');
  });

  let userName = 'John';
  let password = 'pwd';
  const welcomeMessage = page.locator('#loginstatus');
  const userNameInput = page.locator('input[name="UserName"]');
  const passWordInput = page.locator('input[name="Password"]');

  await test.step('Input valid data', async step => {
    // Writing username and password
    await userNameInput.fill(userName);
    await passWordInput.fill(password);

    // Click the login button
    await page.getByRole('button', { name: 'Log In' }).click();
  });

  await test.step('Valid Login Verification', async step => {
    expect(welcomeMessage).toBeVisible();
    expect(welcomeMessage).toHaveText(`Welcome, ${userName}!`);
  });

  await test.step('Log Out', async step => {
    // Click the logout button
    await page.getByRole('button', { name: 'Log Out' }).click();
    await expect(welcomeMessage).toBeVisible();
    await expect(welcomeMessage).toHaveText('User logged out.');
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
  });

  await test.step('Input invalid data', async step => {
    // Writing username and password
    await userNameInput.fill('Invalid');
    await passWordInput.fill('User');

    // Click the login button
    await page.getByRole('button', { name: 'Log In' }).click();
  });

  await test.step('Invalid Login Verification', async step => {
    await expect(welcomeMessage).toBeVisible();
    await expect(welcomeMessage).toHaveText('Invalid username/password');
  });

  await page.close();
});