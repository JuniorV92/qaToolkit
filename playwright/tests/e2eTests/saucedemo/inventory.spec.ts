import { test, expect } from "@playwright/test";
import * as logIn from "../../../utils/saucedemo/loginPage";
import * as inventoryPage from "../../../utils/saucedemo/inventoryPage";
import * as products from "../../../utils/saucedemo/products";

// Testing SauceDemo Inventory Page

test("Verify inventory page UI", async ({ page }) => {
    await logIn.login(page, process.env.STANDAR_USER!, process.env.PASSWORD!);
    await expect(await page, "Incorrect URL for inventory page").toHaveURL(inventoryPage.SAUCEDEMO_INVENTORY_PAGE_URL);
    await inventoryPage.validatePageUI(page);
    const items = await inventoryPage.getAllItems(page);
    await expect(await items.count()).toBeGreaterThanOrEqual(0);
    await expect(await page.locator(inventoryPage.SORT_DROPDOWN)).toBeVisible();
    // Asserting item "Sauce Labs Backpack"
    await inventoryPage.validateItemCardUI(page, "Sauce Labs Backpack");
    await page.close();
});

test.fixme("dummy test for products object", async ({ page }) => {
    let prod1 = products.ALL_PRODUCTS[0];
    expect(prod1.name).toEqual("Sauce Labs Backpack");
    expect(prod1.price).toEqual(29.99);
    expect(prod1.description).toEqual("carry.allTheThings() with the sleek, red Sauce Labs Backpack. Includes a laptop sleeve.");
    expect(prod1.image).toEqual("/sauce-labs-backpack.jpg");
    await page.close();
});

test("Validate each card UI", async ({ page }) => {
    await logIn.login(page, process.env.STANDAR_USER!, process.env.PASSWORD!);
    for (let i = 0; i < products.ALL_PRODUCTS.length; i++) {
        await inventoryPage.validateItemCardUI(page, products.ALL_PRODUCTS[i].name);
    }
    await page.close();
});

test("Filter by...", async ({ page }) => {
    await test.step("Login", async () => {
        await logIn.login(page, process.env.STANDAR_USER!, process.env.PASSWORD!);
        await page.waitForLoadState("networkidle");
    });

    const isAscending = (arr: number[]) => arr.every((val, i) => i === 0 || arr[i - 1] <= val);
    let originalNames: string[] = [];
    originalNames = await inventoryPage.getAllItemsNames(page);

    await test.step("Validating original state of names", async () => {
        expect(originalNames).toEqual([...originalNames].sort());
    });

    await test.step("Sorting by name (Z to A)", async () => {
        await page.selectOption(inventoryPage.SORT_DROPDOWN, "Name (Z to A)");
    });

    await test.step("Validating Z to A sorted state of names", async () => {
        const names = await inventoryPage.getAllItemsNames(page);
        expect(names).toEqual([...originalNames].reverse());
    });

    await test.step("Sorting by price (low to high)", async () => {
        await page.selectOption(inventoryPage.SORT_DROPDOWN, "Price (low to high)");
    });

    await test.step("Validating prices low to high", async () => {
        const prices = await inventoryPage.getAllItemsPrices(page);
        expect(isAscending(prices)).toBe(true);
    });

    await test.step("Sorting by price (high to low)", async () => {
        await page.selectOption(inventoryPage.SORT_DROPDOWN, "Price (high to low)");
    });

    await test.step("Validating prices high to low", async () => {
        const prices = await inventoryPage.getAllItemsPrices(page);
        expect(isAscending(prices.reverse())).toBe(true);
    });

    await test.step("Close page", async () => {
        await page.close();
    });
});