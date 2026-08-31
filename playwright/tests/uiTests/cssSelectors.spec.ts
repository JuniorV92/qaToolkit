import { test, expect, Locator } from '@playwright/test';

test('CSS Selectors link', async ({ page }) => {
  await test.step('Navigate to URL', async step => {
    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
    await expect.soft(page).toHaveTitle(/UI Test Automation Playground/);

    // Click the CSS Selectors link.
    await page.getByRole('link', { name: 'CSS Selectors' }).click();

    // Expects page to have a heading with the name of CSS Selectors.
    await expect.soft(page.getByRole('heading', { name: 'CSS Selectors' })).toBeVisible();

    // Expects the new URL to be http://uitestingplayground.com/cssselectors
    await expect.soft(page).toHaveURL('http://uitestingplayground.com/cssselectors');

    await page.waitForLoadState('domcontentloaded');
  });

  await test.step('Validating different types of selectors', async step => {

    // ID Selector
    const idSelector = '#primary-btn';
    expect.soft(page.locator(idSelector)).toBeVisible();

    // Class Selector
    const classSelector1 = 'button[data-id*="first"]';
    const classSelector2 = 'button[data-id*="second"]';
    const classSelector3 = 'button[data-id*="third"]';
    expect.soft(page.locator(classSelector1)).toBeVisible();
    expect.soft(page.locator(classSelector2)).toBeVisible();
    expect.soft(page.locator(classSelector3)).toBeVisible();

    // Attribute Selectors
    const userName = '[data-id*="username"]';
    const email = '[data-id*="email"]';
    const link = '[data-id*="link"]';
    const active = '[data-id*="attr-active"]';
    const inactive = '[data-id*="inactive"]';

    expect.soft(page.locator(userName)).toBeVisible();
    expect.soft(page.locator(email)).toBeVisible();
    expect.soft(page.locator(link)).toBeVisible();
    expect.soft(page.locator(active)).toBeVisible();
    expect.soft(page.locator(inactive)).toBeVisible();

    // Combinatory Selectors
    const item1 = '[data-id*="item-1"]';
    const item2 = '[data-id*="item-2"]';
    const item3 = '[data-id*="item-3"]';
    const para1 = '[data-id*="para-1"]';
    const para2 = '[data-id*="para-2"]';
    const span = '[data-id*="combo-span"]';

    expect.soft(page.locator(item1)).toBeVisible();
    expect.soft(page.locator(item2)).toBeVisible();
    expect.soft(page.locator(item3)).toBeVisible();
    expect.soft(page.locator(para1)).toBeVisible();
    expect.soft(page.locator(para2)).toBeVisible();
    expect.soft(page.locator(span)).toBeVisible();

    // Nth-child Selectors
    const row1Cell1 = '[data-id*="cell-1-1"]';
    const row1Cell2 = '[data-id*="cell-1-2"]';
    const row2Cell1 = '[data-id*="cell-2-1"]';
    const row2Cell2 = '[data-id*="cell-2-2"]';
    const row3Cell1 = '[data-id*="cell-3-1"]';
    const row3Cell2 = '[data-id*="cell-3-2"]';
    const row4Cell1 = '[data-id*="cell-4-1"]';
    const row4Cell2 = '[data-id*="cell-4-2"]';

    expect.soft(page.locator(row1Cell1)).toBeVisible();
    expect.soft(page.locator(row1Cell2)).toBeVisible();
    expect.soft(page.locator(row2Cell1)).toBeVisible();
    expect.soft(page.locator(row2Cell2)).toBeVisible();
    expect.soft(page.locator(row3Cell1)).toBeVisible();
    expect.soft(page.locator(row3Cell2)).toBeVisible();
    expect.soft(page.locator(row4Cell1)).toBeVisible();
    expect.soft(page.locator(row4Cell2)).toBeVisible();

    // Visibility Tests
    const visibleBtn = '#visible-btn';
    expect.soft(page.locator(visibleBtn)).toBeVisible();

    const hiddenBtn = '#hidden-btn';
    expect.soft(page.locator(hiddenBtn)).not.toBeVisible();

    // Nested Shadow DOM
    const shadowDOM1 = '[data-id="shadow-host-outer"]';
    const shadowDOM2 = '[data-id="shadow-host-inner"]';
    const shadowDOM3 = '[data-id="shadow-host-deep"]';

    const lvl1Btn = '#shadow-btn-l1';
    const lvl1Input = '#shadow-input-l1';
    const lvl2Btn = '#shadow-btn-l2';
    const lvl2Input = '#shadow-input-l2';
    const lvl3Btn = '#shadow-btn-l3';
    const lvl3Input = '#shadow-input-l3';

    await expect.soft(page.locator(shadowDOM1)).toBeVisible();
    await expect.soft(page.locator(shadowDOM2)).toBeVisible();
    await expect.soft(page.locator(shadowDOM3)).toBeVisible();

    await expect.soft(page.locator(shadowDOM1).locator(lvl1Btn)).toBeVisible();
    await expect.soft(page.locator(shadowDOM1).locator(lvl1Input)).toBeVisible();
    await expect.soft(page.locator(shadowDOM1).locator(shadowDOM2).locator(lvl2Btn)).toBeVisible();
    await expect.soft(page.locator(shadowDOM1).locator(shadowDOM2).locator(lvl2Input)).toBeVisible();
    await expect.soft(page.locator(shadowDOM1).locator(shadowDOM2).locator(shadowDOM3).locator(lvl3Btn)).toBeVisible();
    await expect.soft(page.locator(shadowDOM1).locator(shadowDOM2).locator(shadowDOM3).locator(lvl3Input)).toBeVisible();
  });

  await page.close();
});